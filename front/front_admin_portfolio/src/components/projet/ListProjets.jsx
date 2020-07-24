import React, { useState, useEffect } from "react";
import { Table } from "reactstrap";
import Axios from "axios";
import { Container, Row, Col } from "reactstrap";
import styles from "./listProjets.module.css";
import { Link } from "react-router-dom";

import { BsPencil } from "react-icons/bs";
import DeleteProject from "./DeleteProject";
import Tag from "./Tag";

function ListProjets() {
  const [projet, setProjet] = useState([]);

  const getInfosProjet = async () => {
    try {
      const res = await Axios.get("http://localhost:8181/projets");
      setProjet(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getInfosProjet();
  }, []);

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
                    {projet.map((info) => (
                      <tr>
                        <td>{info.titre}</td>
                        <td>{info.date}</td>
                        <Tag tagId={info.TagId} />
                        <td>
                          <Link to={`/modifier/${info.id}`}>
                            <BsPencil />
                          </Link>
                        </td>
                        <td>
                          <DeleteProject
                            id={info.id}
                            getInfosProjet={getInfosProjet}
                          />
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
