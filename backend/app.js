/*******************************************************      IMPORTATIONS    ****************************************************** */
//Importation de express
const express = require("express");
const app = express();

//Importation de la BD
require("./db/dbConfig");

//Importation userRoueter
const userRouter = require("./routes/userRouter");

/******************************************************      FIN IMPORTATATIONS  *****************************************************/
/***************************************************** LES ENDPOINTS $ certains MIDDLEWARES  *****************************************************/
app.use(express.json());
app.use(cors());
app.use("/api/auth", userRouter);
/******************************************************      FIN ENPOINTS        ******************************************************/
module.exports = app;
