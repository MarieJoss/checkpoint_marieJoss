import React from "react";
import { Container, Row, Col } from "reactstrap";
import styles from "./dashboard.module.css";

export default function NavTop() {
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
          <p>nombre de projet repartie en fonction du tag </p>
        </Col>
      </Row>
    </Container>
  );
}
