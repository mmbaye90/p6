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
//Recomposition de la function sauce pour qu'un utilisateur ne puisse supprimer une sauce qui ne l'appartient pas
exports.deleteSauce = (req, res) => {
    //on va chercher si l'objet sauce existe dans la BD avec findOne
    sauceModel
        .findOne({ _id: req.params.id })
        .then((sauce) => {
            if (!sauce) {
                //funtion inversée pour voir l'exixtance d'une sauce
                res.status(404).json({ message: "Aucune sauce à supprimée" });
            }
            //Vérification si le userId correspond bien à celui contenu dans la requete
            if (sauce.userId !== req.auth.id) {
                res.status(400).json({ message: "Requete non autorisée" });
            }
            //Si le user correspond à celui de la requete et que une sauce est trouvée dans la bd on procéde à a suppression
            sauceModel.deleteOne({ _id: req.params.id }).then(() => {
                res.status(204).json({ message: "sauce supprimée" });
            });
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

//Fonction pour gérer le Like et le dislike(c a d l'évaluation de la sauce par le user)
exports.rateOneSauce = (req, res) => {
    //1-on place tout notre code dans un switch pour gérer les différents cas en ciblant le like contenu dans l'objet de la requete
    switch (req.body.like) {
        case 0: //cas: cancel ou aucun vote
            //cas où on ne vote pas et pour revenir en arriere
            //on vérifie si l'objet de la sauce en question existe
            sauceModel.findOne({ _id: req.params.id }).then((sauce) => {
                //on accéde au tab de userId pour vérifier s'il y'a un userId
                if (sauce.usersLiked.find((user) => user === userId)) {
                    //s'il y'a en a, on passe à la mise à jour de l'objet sauceModel,en retirant le userId du tab et en décrementant le likes
                    sauceModel
                        .updateOne({ _id: req.params.id }, {
                            $inc: { likes: -1 },
                            $pull: { usersLiked: req.body.userId },
                            _id: req.params.id,
                        })
                        .then(() => {
                            res.status(201).json({ message: "parfait !!!" });
                        })
                        .catch((error) => {
                            res.status(400).json({ error });
                        });
                }
                //Meme opération pour le tab userDisliked
                if (sauce.usersDisliked.find((user) => user === userId)) {
                    sauceModel
                        .updateOne({ _id: req.prams.id }, {
                            $inc: { dislikes: -1 },
                            $pull: { usersDisliked: req.body.userId },
                            _id: req.params.id,
                        })
                        .then(() => {
                            res.status(201).json({ message: "ok parfait !!!" });
                        })
                        .catch((error) => {
                            res.status(400).json({ error });
                        });
                }
            });
            break;

        case 1: //Le user aime la sauce ===> likes = 1
            sauceModel
                .updateOne({ _id: req.params.id }, {
                    $inc: { likes: 1 },
                    $push: { usersLiked: req.body.userId },
                    _id: req.params.id,
                })
                .then(() => {
                    res.status(201).json({ message: "J'aime la sauce" });
                })
                .catch((error) => {
                    res.status(400).json({ error });
                });
            break;

        case -1: //le user n'aime pas la sauce ===> likes = -1
            sauceModel
                .updateOne({ _id: req.params.id }, {
                    $inc: { dislikes: 1 },
                    $push: { usersDisliked: req.body.userId },
                    _id: req.params.id,
                })
                .then(() => {
                    res.status(201).json({ message: "Je n'aime pas la sauce" });
                })
                .catch((error) => {
                    res.status(400).json({ error });
                });
            break;

        default:
            console.error("bad request");
    }
};