import React, { useState, useEffect } from "react";
import Axios from "axios";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Redirect } from "react-router-dom";

import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

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

toast.configure();
export default function InnerArticle() {
  const [titre, setTitre] = useState("");
  const [date, setDate] = useState("");
  const [tags, setTags] = useState([]);
  const [tagId, setTagId] = useState("");
  const [description, setDescription] = useState("");
  const [couverture, setCouverture] = useState("");
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [redirect, setredirect] = useState(false);

  const getTag = async () => {
    try {
      const res = await Axios.get("http://localhost:8181/tags");
      setTags(res.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTag();
  }, []);

  const uploadImage = (e) => {
    setCouverture(e.target.files[0]);
  };

  const uploadImageUne = (e) => {
    setImage(e.target.files[0]);
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    handlePostProject();
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
    const object = tags.find((el) => el.label === e.target.value);
    setTagId(object.id);
  };

  const setToastSuccess = () => {
    toast.success("Votre annonce a bien été publiée.", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const setToastError = () => {
    toast.error("Une erreur est survenue, vous pouvez réessayer.", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const setToastInput = () => {
    toast.info("Renseignez tous les champs s'il vous plait", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const resetForm = () => {
    setTitre("");
    setDate("");
    setTags([]);
    setDescription("");
    setredirect(true);
  };

  const handlePostProject = async () => {
    try {
      const ClientIdimgurToken = "222d89520985af9";
      const resCouv = await Axios.post(
        "https://api.imgur.com/3/image",
        couverture,
        {
          headers: {
            Authorization: `Client-ID ${ClientIdimgurToken}`,
          },
        }
      );
      const resImage = await Axios.post(
        "https://api.imgur.com/3/image",
        image,
        {
          headers: {
            Authorization: `Client-ID ${ClientIdimgurToken}`,
          },
        }
      );
      if (titre && tags && description) {
        const postInfo = await Axios.post("http://localhost:8181/projets", {
          titre,
          date,
          TagId: tagId,
          description,
          couverture: resCouv.data.data.link,
          image: resImage.data.data.link,
        });
        setToastSuccess();
        resetForm();
      } else {
        setToastInput();
      }
    } catch (err) {
      setToastError();
    }
  };
  if (redirect) {
    return <Redirect to="/projets" />;
  }

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
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
            <Col md="10">
              <Form onSubmit={handleAddProject}>
                <FormGroup row>
                  <Col xs="3">
                    <Label for="exampleFile">Ta photo de couverture</Label>
                  </Col>
                  <Col>
                    <input
                      type="file"
                      files={couverture}
                      accept="image/*"
                      name="file"
                      id="exampleFile"
                      onChange={uploadImage}
                    />
                  </Col>
                </FormGroup>
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
                      {tags.map((tag) => (
                        <option>{tag.label}</option>
                      ))}
                    </Input>
                  </Col>
                </FormGroup>
                <CKEditor
                  editor={ClassicEditor}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setDescription(data);
                  }}
                />
                {/* <FormGroup row>
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
            </FormGroup> */}
                <FormGroup row>
                  <Col xs="3">
                    <Label for="exampleFile">Image carousel 1</Label>
                  </Col>
                  <Col>
                    <input
                      type="file"
                      files={image}
                      accept="image/*"
                      name="fileUn"
                      id="exampleFileUn"
                      onChange={uploadImageUne}
                    />
                  </Col>
                </FormGroup>
                {/* <FormGroup row>
              <Col xs="3">
                <Label for="exampleFile">Image carousel 2</Label>
              </Col>
              <Col>
                <input
                  type="file"
                  files={imageDeux}
                  accept="image/*"
                  name="file"
                  id="exampleFileDeux"
                  onChange={uploadImageDeux}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col xs="3">
                <Label for="exampleFile">Image carousel 3</Label>
              </Col>
              <Col>
                <input
                  type="file"
                  files={imageTrois}
                  accept="image/*"
                  name="fileTrois"
                  id="exampleFileTrois"
                  onChange={uploadImageTrois}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col xs="3">
                <Label for="exampleFile">Image carousel 4</Label>
              </Col>
              <Col>
                <input
                  type="file"
                  files={imageQuatre}
                  accept="image/*"
                  name="fileQuatre"
                  id="exampleFileQuatre"
                  onChange={uploadImageQuatre}
                />
              </Col>
            </FormGroup> */}

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
      )}
    </>
  );
}
