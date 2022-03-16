/*******************************************************      IMPORTATIONS    ****************************************************** */
//Importation de express
const express = require("express");
const app = express();
const cors = require("cors");

//Importation de la BD
require("./db/dbConfig");

//Importation userRoueter et de sauceRouter
const userRouter = require("./routes/userRouter");
const sauceRouter = require("./routes/sauceRouter");

//Importation de path
const path = require("path");

/******************************************************      FIN IMPORTATATIONS  *****************************************************/
/***************************************************** LES ENDPOINTS $ certains MIDDLEWARES  *************************************/
app.use(express.json()); //me permet d'avoir accés au body de la requette
app.use("/images", express.static(path.join(__dirname, "images"))); //indique à express de gérer la ressource imge de maniere static
app.use(cors()); // palie à tous les problémes d'accés à mon web-api
app.use("/api/auth", userRouter);
app.use("/api/sauces", sauceRouter);
/******************************************************      FIN ENPOINTS        ******************************************************/
//Exportation du fichier app
module.exports = app;