require("dotenv").config();
const express = require("express");
const User = require("../models/User");
const router = express.Router();

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

router.post("/signin", async (req, res) => {
  const { mail, password } = req.body;
  try {
    const user = await User.findOne({
      where: {
        mail,
      },
    });
    if (password === user.datavalues.password) {
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(422).json({
      message: "wrong credentials",
    });
  }
});

module.exports = router;
