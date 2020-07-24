import React from "react";
import Axios from "axios";
import { IoMdClose } from "react-icons/io";

const DeleteProject = ({ id, getInfosProjet }) => {
  const deleteProjets = async () => {
    try {
      // const item = infosProjet.find((item) => item.id);

      await Axios.delete(`http://localhost:8181/projets/${id}`);
      getInfosProjet();
    } catch (err) {
      console.log(err);
    }
  };
  return <IoMdClose onClick={deleteProjets} fill="#D2AD89" />;
};

export default DeleteProject;
