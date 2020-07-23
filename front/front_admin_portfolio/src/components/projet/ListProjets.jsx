import React, { useState, useEffect } from "react";
import { Table } from "reactstrap";
import Axios from "axios";
import { Container, Row, Col } from "reactstrap";
import styles from "./listProjets.module.css";
import { Link } from "react-router-dom";

import { IoMdClose } from "react-icons/io";

import { BsPencil } from "react-icons/bs";

function ListProjets() {
  const [infosProjet, setInfosProjet] = useState([]);

  const getInfosProjet = async () => {
    try {
      const res = await Axios.get("http://localhost:8181/projets");
      setInfosProjet(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getInfosProjet();
  }, []);

  const deleteProjets = async () => {
    try {
      const item = infosProjet.find((item) => item.id);

      await Axios.delete(`http://localhost:8181/projets/${item.id}`);
      getInfosProjet();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container fluid className={styles.flexRow}>
      <Row>
        <Col>
          <p className="text-right m-3">Bonjour Marie Josselin</p>
        </Col>
      </Row>
      <Row className="align-items-center ml-5">
        <Col xs="3">
          <h2>MES PROJETS</h2>
          <Link to="/article">
            <h3>Ajouter un projet</h3>
          </Link>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <Container>
            <Row className="mt-5">
              <Col>
                <Table striped className="text-center">
                  <thead>
                    <tr>
                      <th>Nom</th>
                      <th>Date</th>
                      <th>Tag</th>
                      <th>Modifier</th>
                      <th>Supprimer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {infosProjet.map((info) => (
                      <tr>
                        <td>{info.titre}</td>
                        <td>{info.date}</td>
                        <td>{info.Tag}</td>
                        <td>
                          <Link to={`/modifier/${info.id}`}>
                            <BsPencil />
                          </Link>
                        </td>
                        <td>
                          <IoMdClose onClick={deleteProjets} fill="#D2AD89" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}
export default ListProjets;
