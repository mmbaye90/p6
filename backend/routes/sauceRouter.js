//Importation express et router
const express = require("express");
const router = express.Router();

//Importation du fichier controllers contenant les fonctions du CRUD
const sauceCtrl = require("../controllers/sauceCtrl");

//Importation du middleware d'authentification
const auth = require("../middlewares/auth");

//Les routes de l'application
router.post("/", auth, sauceCtrl.createSauce);
router.get("/", auth, sauceCtrl.getAllSauce);
router.get("/:id", auth, sauceCtrl.getOneSauce);
router.put("/:id", auth, sauceCtrl.updateSauce);
router.delete("/:id", auth, sauceCtrl.deleteSauce);

//Exportation Router sde la sauce
module.exports = router;