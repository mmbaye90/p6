/*******************************************************      IMPORTATIONS    ****************************************************** */
//Importation de express
const express = require("express");
const app = express();
const cors = require("cors");

//Importation de la BD
require("./db/dbConfig");

//Importation userRoueter
const userRouter = require("./routes/userRouter");

/******************************************************      FIN IMPORTATATIONS  *****************************************************/
/***************************************************** LES ENDPOINTS $ certains MIDDLEWARES  *************************************/
app.use(express.json()); //me permet d'avoir accés au body de la requette
app.use(cors()); // palie à tous les problémes d'accés à mon web-api
app.use("/api/auth", userRouter);
/******************************************************      FIN ENPOINTS        ******************************************************/
//Exportation du fichier app
module.exports = app;
