//Importation express et router
const express = require("express");
const router = express.Router();

//Importation du fichier controllers contenant les fonctions du CRUD et de la fonction rateOneSauce
const sauceCtrl = require("../controllers/sauceCtrl");

//Importation du middleware d'authentification
const auth = require("../middlewares/auth");

//Importation de multer
const multer = require("../middlewares/multer-config");

//Les routes de l'application
router.post("/", auth, multer, sauceCtrl.createSauce);
router.get("/", auth, sauceCtrl.getAllSauce);
router.get("/:id", auth, sauceCtrl.getOneSauce);
router.put("/:id", auth, multer, sauceCtrl.updateSauce);
router.delete("/:id", auth, sauceCtrl.deleteSauce);
router.post("/:id/like", auth, sauceCtrl.getOneSauce);

//Exportation Router sde la sauce
module.exports = router;