const User = require("./models/User");
const Tag = require("./models/Tag");
const Projet = require("./models/Projet");

User.hasMany(Projet);
Projet.belongsTo(User);

Tag.hasMany(Projet);
Projet.belongsTo(Tag);
