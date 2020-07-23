const Sequelize = require("sequelize");
const sequelizeInstance = require("../sequelize");

const bcrypt = require("bcrypt");

const User = sequelizeInstance.define(
  "User",
  {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    nom: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    prenom: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    mail: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING(200),
      allowNull: true,
    },
    avatar: {
      type: Sequelize.STRING(200),
      allowNull: true,
    },
  },
  {
    hooks: {
      beforeCreate: (user) => {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
      },
    },
  }
);

User.prototype.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = User;
