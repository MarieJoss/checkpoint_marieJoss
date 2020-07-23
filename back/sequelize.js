require("dotenv").config();
const Sequelize = require("sequelize");
const { DB_NAME, DB_PASS, DB_USER } = process.env;

module.exports = new Sequelize({
  host: "localhost",
  username: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  dialect: "mysql",
});
