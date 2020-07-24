import React, { useState, useEffect } from "react";
import Axios from "axios";

const Tag = ({ tagId }) => {
  const [tag, setTag] = useState("");

  const getTags = async () => {
    try {
      const res = await Axios.get(`http://localhost:8181/tags/${tagId}`);
      setTag(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTags();
  }, []);
  return <td>{tag.label}</td>;
};

export default Tag;
