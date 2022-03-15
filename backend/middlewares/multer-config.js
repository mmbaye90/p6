//Importation du pckg multer
const multer = require("multer");

//configuration biblio de l'extension des fichiers
const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpeg",
    "image/png": "png",
};

//Config du stockage des fichier avec la méthode diskStorage
//il contiendra deux fonctions: 1fction de destination/2-fction configurant le nom du fichier
const storage = multer.diskStorage({
    //fonction de destination
    destination: (req, file, callback) => {
        callback(null, "images"); // indique que les fichiers vont etre sauvegardés dans le dossier images
    },
});