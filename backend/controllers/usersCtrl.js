//Importation des pckges et du model users
const User = require("../models/usersModel");
const bcrypt = require("bcrypt");

//La logique du métier
exports.signup = (req, res) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password,
  });
  user
    .save()
    .then(() => res.status(200).json({ message: "utilisateur enrégistré" }))
    .catch(() => res.status(400).json({ message: "user non enregistré" }));
};

exports.login = (req, res) => {
  console.log("JE SUIS ds LOGIN");
};
