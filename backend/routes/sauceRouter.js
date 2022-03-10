//Importation express et router
const express = require("express");
const router = express.Router();

//Importation du fichier controllers contenant les fonctions du CRUD
const sauceCtrl = require("../controllers/sauceCtrl");

//Les routes de l'application
router.post("/", sauceCtrl.createSauce);
router.get("/", sauceCtrl.getAllSauce);
router.get("/:id", sauceCtrl.getOneSauce);
router.put("/:id", sauceCtrl.updateSauce);
router.delete("/:id", sauceCtrl.deleteSauce);

//Exportation Router sde la sauce
module.exports = router;