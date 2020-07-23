const express = require("express");
const router = express.Router();

const Tag = require("../models/Tag");

//RECUPERER TOUS LES TAGS
router.get("/", async (req, res) => {
  try {
    const tag = await Tag.findAll();
    res.status(200).json(tag);
  } catch (err) {
    res.status(400).json(err);
  }
});

//RECUPERE UN SEUL TAG
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const tag = await Tag.findByPk(id);
    res.status(200).json(tag);
  } catch (err) {
    res.status(400).json(err);
  }
});

//PUBLIER UN TAG
router.post("/", async (req, res) => {
  const { label } = req.body;
  try {
    const tag = await Tag.create({
      label,
    });
    res.status(201).json(tag);
  } catch (err) {
    res.status(422).json(err);
  }
});

//MODIFIER UN TAG
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { label } = req.body;
  try {
    const tag = await Tag.update(
      {
        label,
      },
      { where: { id } }
    );
    res.status(201).json(tag);
  } catch (err) {
    res.status(422).json(err);
  }
});

//SUPPRIMER UN TAG
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const tag = await Tag.destroy({
      where: { id },
    });
    res.status(204).send("Le tag a bien été effacé");
  } catch (err) {
    res.status(422).json(err);
  }
});

module.exports = router;
