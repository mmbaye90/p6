//Importation du model sauce
const sauceModel = require("../models/sauceModel");

//Function createSauce
exports.createSauce = (req, res) => {
    //Insatciation du schemas sauceModel et j'utilise le spread operator pour copier tous du body de la requete
    const newRecord = new sauceModel({
        ...req.body,
    });
    newRecord
        .save()
        .then(() => {
            res.status(201).json({ message: "Sauce créée" });
        })
        .catch((error) => res.satus(400).json({ error }));
};

//function geatAllSauce
exports.getAllSauce = (req, res) => {
    sauceModel
        .find()
        .then((sauceModel) => {
            res.status(200).json(sauceModel);
        })
        .catch((error) => res.status(400).json({ error }));
};