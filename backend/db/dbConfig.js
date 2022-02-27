//Importation du package mongoose
const mongoose = require("mongoose");
//Importation de dotenv
const dotenv = require("dotenv");
dotenv.config();

//Utilisation de la méthode connect de mong pour connecter la BD
mongoose.connect(
  `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@nodefromscratch.y6tqm.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (!err) console.log("Conexion à MONGODB réussi");
    else console.log(`connexion échouée : ${err}`);
  }
);
