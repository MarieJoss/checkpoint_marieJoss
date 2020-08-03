import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table } from "reactstrap";
import styles from "./dashboard.module.css";

import { Pie } from "react-chartjs-2";
import Axios from "axios";

export default function Dashboard() {
  const [first, setFirst] = useState([]);
  const [second, setSecond] = useState([]);
  const [third, setThird] = useState([]);
  const [projet, setProjet] = useState([]);

  const getInfosProjet = async () => {
    try {
      const res = await Axios.get("http://localhost:8181/projets");
      const firstTag = res.data.filter(
        (item) => item.Tag.label === "React && NodeJS"
      );
      const secondTag = res.data.filter(
        (item) => item.Tag.label === "Wordpress"
      );
      const thirdTag = res.data.filter(
        (item) => item.Tag.label === "Graphisme"
      );

      const length = res.data.length;

      const item5 = res.data[length - 1];
      const item4 = res.data[length - 2];
      const item3 = res.data[length - 3];

      const lastProjets = [item5, item4, item3];

      setProjet(lastProjets);
      setFirst(firstTag);
      setSecond(secondTag);
      setThird(thirdTag);
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
      <Row className="align-items-center ml-5 mb-5">
        <Col>
          <h2>DASHBOARD</h2>
        </Col>
      </Row>
      <Row>
        <Col xs="12" md="5">
          <h2 className="text-center">Repartition par types</h2>
          <Pie
            data={{
              datasets: [
                {
                  data: [first.length, second.length, third.length],
                  // TODO: bind these colors with types state
                  backgroundColor: ["#d2ad89", "#303030", "#466A5B"],
                },
              ],
              labels: ["React && NodeJS", "Wordpress", "Graphisme"],
            }}
          />
        </Col>
        <Col xs="12" md="6">
          <h2 className="text-center">Mes derniers projets</h2>
          <Table striped className="text-center">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Date</th>
                <th>Tag</th>
              </tr>
            </thead>
            <tbody>
              {projet.map((el) => (
                <tr>
                  <td>{el.titre}</td>
                  <td>{el.date}</td>
                  <td>{el.Tag.label}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}
