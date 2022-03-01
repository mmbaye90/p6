//Importation des pckges et du model users
const userModel = require("../models/usersModel");
const bcrypt = require("bcrypt");

//La logique du métier
exports.signup = (req, res) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const newRecord = new userModel({
        email: req.body.email,
        password: hash,
      });
      newRecord
        .save()
        .then(() =>
          res.status(200).json({ message: "User enrégistré !!!!!!!!!!!!" })
        )
        .catch(() => res.status(400).json({ message: "User non enregistré" }));
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.login = (req, res) => {
  console.log("JE SUIS ds LOGIN");
};
