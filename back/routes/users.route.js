const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Projet = require("../models/Projet");

router.get("/", async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ["password"],
      },
      include: {
        model: Projet,
      },
    });
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json(err);
  }
});

//RECUPERER UN UTILISATEUR
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const users = await User.findAll({
      attributes: {
        exclude: ["password"],
      },
      include: {
        model: Projet,
      },
    });
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json(err);
  }
});

//AJOUTER UN UTILISATEUR
router.post("/", async (req, res) => {
  const { nom, prenom, mail, password, avatar } = req.body;
  try {
    const user = await User.create({
      nom,
      prenom,
      mail,
      password,
      avatar,
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(422).json(err);
  }
});

module.exports = router;
