require("dotenv").config();
const express = require("express");
const cors = require("cors");
require("./association");

const sequelize = require("./sequelize");

const PORT = process.env.PORT || 8181;

const auths = require("./routes/Auth.route");
const users = require("./routes/users.route");
const projets = require("./routes/projets.route");
const tags = require("./routes/tags.route");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auths", auths);
app.use("/users", users);
app.use("/projets", projets);
app.use("/tags", tags);

app.get("/", (req, res) => {
  res.status(200).send("Bienvenue sur ton interface admin, Marie");
});
sequelize
  .sync({ force: true })
  .then(() => {
    return sequelize.authenticate();
  })

  .then(() => {
    app.listen(PORT, (err) => {
      if (err) {
        console.log(err.message);
      }
      console.log(`Jusque là ca marche: http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Problème pour connecter la base de donnée", err.message);
  });

module.exports = app;
