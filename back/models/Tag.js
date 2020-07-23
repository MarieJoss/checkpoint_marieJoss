const Sequelize = require("sequelize");
const sequelizeInstance = require("../sequelize");

const Tag = sequelizeInstance.define("Tag", {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  label: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
});

module.exports = Tag;
