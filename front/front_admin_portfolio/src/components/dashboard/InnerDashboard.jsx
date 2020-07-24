import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import styles from "./dashboard.module.css";

import { Pie } from "react-chartjs-2";
import Axios from "axios";

export default function NavTop() {
  const [projets, setProjet] = useState([]);
  const [first, setFirst] = useState([]);
  const [second, setSecond] = useState([]);
  const [third, setThird] = useState([]);
  const [tag, setTag] = useState([]);

  const getInfosProjet = async () => {
    try {
      const res = await Axios.get("http://localhost:8181/projets");
      setProjet(res.data);
      setFirst(res.data);
      setSecond(res.data);
      setThird(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getTags = async () => {
    try {
      const res = await Axios.get("http://localhost:8181/tags");
      setTag(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getInfosProjet();
    getTags();
  }, []);

  // console.log(projets);
  // console.log(tag);
  // const projetFilter = projets.filter(
  //   (item) => item.TagId === tag[0] && tag[0].id
  // );
  // console.log(projetFilter);

  // const projetFilterUn = projets.filter(
  //   (item) => item.TagId === tag[1] && tag[1].id
  // );
  // console.log(projetFilterUn);

  // const projetFilterDeux = projets.filter(
  //   (item) => item.TagId === tag[2] && tag[2].id
  // );
  // console.log(projetFilterDeux);

  return (
    <Container fluid className={styles.flexRow}>
      <Row>
        <Col>
          <p className="text-right m-3">Bonjour Marie Josselin</p>
        </Col>
      </Row>
      <Row className="align-items-center ml-5">
        <Col xs="3">
          <h2>DASHBOARD</h2>
          <Pie
            data={{
              datasets: [
                {
                  data: [first.length, second.length, third.length],
                  // TODO: bind these colors with types state
                  backgroundColor: ["#d2ad89", "#303030", "#466A5B"],
                },
              ],
              labels: [
                tag[0] && tag[0].label,
                tag[1] && tag[1].label,
                tag[2] && tag[2].label,
              ],
            }}
          />
        </Col>
      </Row>
    </Container>
  );
}
