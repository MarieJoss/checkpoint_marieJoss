const express = require("express");
const router = express.Router();

const Projet = require("../models/Projet");
const Tag = require("../models/Tag");

//RECUPERER TOUS LES PROJETS
router.get("/", async (req, res) => {
  try {
    const projet = await Projet.findAll({
      include: [
        {
          model: Tag,
        },
      ],
    });
    res.status(200).json(projet);
  } catch (err) {
    res.status(400).json(err);
  }
});

//RECUPERER UN PROJET SELON SON ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const projet = await Projet.findAll({
      where: { id },
      include: [
        {
          model: Tag,
        },
      ],
    });
    res.status(200).json(projet);
  } catch (err) {
    res.status(400).json(err);
  }
});

//POSTER UN PROJET
router.post("/", async (req, res) => {
  const {
    titre,
    date,
    description,
    couverture,
    images,
    TagId,
    UserId,
  } = req.body;
  try {
    const projet = await Projet.create({
      titre,
      date,
      description,
      couverture,
      images,
      TagId,
      UserId,
    });
    res.status(201).json(projet);
  } catch (err) {
    res.status(422).json(err);
  }
});

//MODIFIER UN PROJET
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    titre,
    date,
    description,
    couverture,
    images,
    TagId,
    UserId,
  } = req.body;
  try {
    const projet = await Projet.update(
      {
        titre,
        date,
        description,
        couverture,
        images,
        TagId,
        UserId,
      },
      { where: { id } }
    );
    res.status(201).json(projet);
  } catch (err) {
    res.status(422).json(err);
  }
});

//SUPPRIMER UN PROJET
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Projet.destroy({
      where: { id },
    });
    res.status(204).send("Le projet a bien été effacé");
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
