//Importation du model sauce
const sauceModel = require("../models/sauceModel");

//Function createSauce
exports.createSauce = (req, res) => {
    const newRecord = new sauceModel({
        ...req.body,
    });
    newRecord
        .save()
        .then(() => {
            res.status(201).json({ message: "Sauce créée" });
        })
        .catch((error) => res.satus(500).json({ error }));
};

//function geatAllSauce
exports.getAllSauce = (req, res) => {
    console.log("je suis dans GET");
};