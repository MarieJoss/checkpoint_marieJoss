const Sequelize = require("sequelize");
const sequelizeInstance = require("../sequelize");

const Projet = sequelizeInstance.define("Projet", {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  titre: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  date: {
    type: Sequelize.STRING(200),
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  couverture: {
    type: Sequelize.STRING(200),
    allowNull: true,
  },
  images: {
    type: Sequelize.STRING(200),
    allowNull: true,
  },
});

module.exports = Projet;
