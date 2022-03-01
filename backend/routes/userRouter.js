//Importation de express pour utiliser le pckge de Router
const express = require("express");
const router = express.Router();

//Importation du dossier contenant les fonctions de la logique métier
const userCtrlrs = require("../controllers/usersCtrl");

//Construction des routes signup et login
router.post("/signup", userCtrlrs.signup);
router.post("/login", userCtrlrs.login);

//Exportation de router
module.exports = router;
