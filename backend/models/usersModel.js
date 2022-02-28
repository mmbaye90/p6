//Importation de mongoose
const mongoose = require("mongoose");

//importation du pckg uniq-validator
const uniqueValidator = require("mongoose-unique-validator");

//Mise en place de notre schemas

const usersSchemas = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

//Ajout du plugin mon-uniqValidtr

usersSchemas.plugin(uniqueValidator);

//Exportation du model de userSchemas

exports.default = mongoose.model("userModel", usersSchemas);
