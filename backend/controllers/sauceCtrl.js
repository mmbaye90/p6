//Importation du model sauce
const sauceModel = require("../models/sauceModel");
//Importationde fs pour la suppression de l'image avec l'objet
const fs = require("fs");

//Function createSauce
//Modification de la fonction pour prendre en compte le fichier image
exports.createSauce = (req, res) => {
    //On parse les données reçues du front sous forme de form-datas en JSON
    const sauceObject = JSON.parse(req.body.sauce);
    //Instciation du schemas sauceModel et j'utilise le spread operator pour copier tous du body de la requete
    const newRecord = new sauceModel({
        ...sauceObject,
        //définition du chemin complet de notre url d'image
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
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
        .findOne({ _id: req.params.id })
        .then((sauce) => {
            res.status(200).json(sauce);
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};
//Function updateSauce
//Modification de la function pour tenir en compte eux situations : 1-modif de l'objet/é-modif de l'imge
exports.updateSauce = (req, res) => {
    //on utilise une opération ternaire pour gérer les deux cas de figure
    const sauceObject = req.file ?
        {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
        } :
        {...req.body };
    sauceModel
        .updateOne({ _id: req.params.id }, {...sauceObject, _id: req.params.id })
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
            //on extrait le nom de l'image
            const filename = sauce.imageUrl.split("/images/")[1];
            //on supprime l'image avec la méthode unlink
            fs.unlink(`images/${filename}`, () => {
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
            });
        })
        .catch((error) => {
            res.status(500).json({ error });
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