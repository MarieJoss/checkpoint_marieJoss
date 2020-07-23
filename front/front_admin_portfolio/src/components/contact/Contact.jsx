import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { BsPencil } from "react-icons/bs";

import styles from "./contact.module.css";

export default function Contact() {
  const [userInfos, setUserInfos] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  const getUserInfos = async () => {
    try {
      setisLoading(true);
      const res = await Axios.get("http://localhost:8181/users");
      setUserInfos(res.data[0]);
      setisLoading(false);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserInfos();
  }, []);

  if (isLoading) {
    return <p>Is loading</p>;
  }

  return (
    <Container fluid className={styles.flexRow}>
      <Row>
        <Col>
          <p className="text-right m-3">
            Bonjour {userInfos.prenom} {userInfos.nom} !
          </p>
        </Col>
      </Row>
      <Row className="align-items-center ml-5">
        <Col xs="3">
          <h2>CONTACT</h2>
          <Link to="/settings">
            <BsPencil size="20" fill="#d2ad89" />
            <h3 className={`${styles.contactModif} pt-3`}>Modifier</h3>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col>
          <Container
            className={`mt-5 justify-content-center ${styles.bkgContactInfo}`}
          >
            <Row>
              <Col xs="12" md="3" className="text-center m-5">
                <img width="100%" src={userInfos.avatar} alt="avatar" />
              </Col>

              <Col className="align-self-center" xs="12" md="5">
                <Row>
                  <Col>
                    <p>
                      <b>Nom:</b>
                      {userInfos.nom}
                    </p>
                  </Col>
                  <Col md="12">
                    <p>
                      <b>Prénom: </b>
                      {userInfos.prenom}
                    </p>
                  </Col>

                  <Col md="12">
                    <p>
                      <b>Email:</b> {userInfos.mail}
                    </p>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}
