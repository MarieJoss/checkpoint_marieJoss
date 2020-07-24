import React, { useEffect, useState } from "react";
import Axios from "axios";
import styles from "../projet/ListProjets";

import { Row, Container, Form, Col, Label, Input, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { BsPencil } from "react-icons/bs";

const ModifInfos = () => {
  const [id, setId] = useState([]);
  const [nom, setNom] = useState([]);
  const [prenom, setPrenom] = useState([]);
  const [mail, setMail] = useState([]);

  const getContactInfos = async () => {
    try {
      const res = await Axios.get("http://localhost:8181/users");
      setNom(res.data[0].nom);
      setPrenom(res.data[0].prenom);
      setMail(res.data[0].mail);
      setId(res.data[0].id);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getContactInfos();
  }, []);

  const handleModifyContact = async (e) => {
    e.preventDefault();
    try {
      await Axios.put(`http://localhost:8181/users/${id}`, {
        nom,
        prenom,
        mail,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleNomChange = (e) => {
    setNom(e.target.value);
  };

  const handlePrenomChange = (e) => {
    setPrenom(e.target.value);
  };

  const handleEmailChange = (e) => {
    setMail(e.target.value);
  };

  const resetForm = () => {
    setNom("");
    setPrenom("");
    setMail("");
  };

  return (
    <Container>
      <Row>
        <Col>
          <p className="text-right m-3">
            Bonjour {prenom} {nom} !
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
      <Form onSubmit={handleModifyContact}>
        <Row>
          <Col xs="3">
            <Label for="exampleFile">Ton avatar</Label>
          </Col>
          <Col>
            <Input
              type="file"
              name="file"
              id="exampleFile"
              // value={userInfos.avatar}
              //   onChange={handleAvatar}
            />
          </Col>
        </Row>
        <Row>
          <Col md={3}>
            <Label for="Nom" className="mt-3">
              Nom
            </Label>
          </Col>
          <Col>
            <Input
              type="text"
              name="nom"
              id="nom"
              required
              value={nom}
              onChange={handleNomChange}
            />
          </Col>
        </Row>
        <Row>
          <Col md={3}>
            <Label for="Prenom" className="mt-3">
              Prénom
            </Label>
          </Col>
          <Col>
            <Input
              type="text"
              name="prenom"
              id="prenom"
              required
              value={prenom}
              onChange={handlePrenomChange}
            />
          </Col>
        </Row>
        <Row>
          <Col md={3}>
            <Label for="Email" className="mt-3">
              Email
            </Label>
          </Col>
          <Col>
            <Input
              type="email"
              name="email"
              required
              id="email"
              value={mail}
              onChange={handleEmailChange}
            />
          </Col>
        </Row>
        <Row>
          <Col md={3}>
            <Label for="Password" className="mt-3">
              Mot de Passe*
            </Label>
          </Col>
          <Col>
            <Input
              type="password"
              name="password"
              id="Password"
              required
              //   value={password}
              //   onChange={(event) => setpassword(event.target.value)}
              placeholder="*******"
            />
          </Col>
        </Row>

        <Row className="mt-5">
          <Col className="text-right" md="6">
            <Button
              className={`${styles.buttonValider} pl-4 pr-4`}
              type="submit"
            >
              Valider
            </Button>
          </Col>
          <Col md="6">
            <Button
              className={styles.buttonAnnuler}
              type="button"
              onClick={resetForm}
            >
              Annuler
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default ModifInfos;
