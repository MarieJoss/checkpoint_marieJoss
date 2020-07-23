import React, { useState, useEffect } from "react";
import Axios from "axios";
import styles from "./listProjets.module.css";
import {
  Container,
  Row,
  Col,
  Form,
  Label,
  Input,
  FormGroup,
  Button,
} from "reactstrap";
import { useParams } from "react-router-dom";

export default function InnerArticle() {
  const { id } = useParams();
  const [titre, setTitre] = useState("");
  const [date, setDate] = useState("");
  const [label, setLabel] = useState([]);
  const [description, setDescription] = useState("");
  // const [couverture, setCouverture] = useState("");
  // const [image, setImage] = useState("");

  const getInfosProjet = async () => {
    try {
      const res = await Axios.get(`http://localhost:8181/projets/${id}`);
      setTitre(res.data.titre);
      setDate(res.data.date);
      setLabel(res.data.label);
      setDescription(res.data.description);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getInfosProjet();
  }, []);

  const handleModifyProjet = async (e) => {
    e.preventDefault();
    try {
      await Axios.put(`http://localhost:8181/projets/${id}`, {
        titre,
        date,
        label,
        description,
      });
    } catch (err) {
      throw new Error(err);
    }
  };

  const handleTitleChange = (e) => {
    setTitre(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const selectTag = (e) => {
    setLabel(e.target.value);
  };

  const resetForm = () => {
    setTitre("");
    setDate("");
    setLabel([]);
    setDescription("");
  };

  return (
    <Container fluid className={`ml-5 ${styles.flexRow}`}>
      <Row>
        <Col>
          <p className="text-right m-3">Bonjour Marie Josselin</p>
        </Col>
      </Row>
      <Row className="align-items-center my-5 ">
        <Col xs="6">
          <h2>AJOUTER UN PROJET</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form onSubmit={handleModifyProjet}>
            {/* <FormGroup row>
              <Col xs="3">
                <Label for="exampleFile">Ta photo de couverture</Label>
              </Col>
              <Col>
                <Input
                  type="file"
                  name="file"
                  id="exampleFile"
                  value="defaultValue"
                  // onChange={handleAvatar}
                />
              </Col>
            </FormGroup> */}
            <FormGroup row>
              <Col sm={2}>
                <Label for="exampleAddress">Titre</Label>
              </Col>
              <Col sm={5}>
                <Input
                  type="text"
                  name="titre"
                  id="exampleAddress"
                  onChange={handleTitleChange}
                  value={titre}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col sm={2}>
                <Label for="exampleAddress">Date </Label>
              </Col>
              <Col sm={5}>
                <Input
                  type="text"
                  name="Date"
                  id="exampleAddress"
                  onChange={handleDateChange}
                  value={date}
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col sm={2}>
                <Label for="exampleSelect">Tag: </Label>
              </Col>
              <Col sm={5}>
                <Input
                  onChange={selectTag}
                  type="select"
                  name="select"
                  id="exampleSelect"
                  defaultValue="defaultValue"
                >
                  <option value="defaultValue" disabled>
                    Selectionnez
                  </option>
                  <option>React && NodeJS</option>
                  <option>Wordpress</option>
                  <option>Graphisme</option>
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col sm={2}>
                <Label for="exampleAddress">Description </Label>
              </Col>
              <Col sm={5}>
                <Input
                  type="textarea"
                  name="Date"
                  id="exampleAddress"
                  onChange={handleDescriptionChange}
                  value={description}
                />
              </Col>
            </FormGroup>

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
        </Col>
      </Row>
    </Container>
  );
}
