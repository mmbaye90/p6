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
        .catch((error) => res.status(400).json({ error }));
};

//function geatAllSauce
exports.getAllSauce = (req, res) => {
    sauceModel
        .find()
        .then((sauce) => {
            res.status(200).json(sauce);
        })
        .catch((error) => res.status(400).json({ error }));
};
//Function getOneSauce
exports.getOneSauce = (req, res) => {
    sauceModel
        .find({ _id: req.params.id })
        .then((oneSauce) => {
            res.status(200).json(oneSauce);
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};
//Function updateSauce
exports.updateSauce = (req, res) => {
    sauceModel
        .updateOne({ _id: req.params.id }, {...req.body, _id: req.params.id })
        .then(() => {
            res.status(201).json({ message: "Sauce Modifiée" });
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};
//Function deleteOne
exports.deleteSauce = (req, res) => {
    sauceModel
        .deleteOne({ _id: req.params.id }, {...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: "Sauce supprimée !" }))
        .catch((error) => res.status(400).json({ error }));
};