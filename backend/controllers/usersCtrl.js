//Importation des pckges et du model users
const userModel = require("../models/usersModel");
const bcrypt = require("bcrypt");
//Importation jwt
const jwt = require("jsonwebtoken");

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
  userModel
    .findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(400).json({ message: "Utilisateur non trouvé !!!!" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res
              .status(400)
              .json({ message: "Mot de passe incorrect !!!!" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => {
          res.status(500).json({ error });
        });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
