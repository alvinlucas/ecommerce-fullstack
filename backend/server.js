const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

const db = require("./db");

const produitsRoutes = require("./routes/produits");
const utilisateursRoutes = require("./routes/utilisateurs");
const commandesRoutes = require("./routes/commandes");
const commandeProduitRoutes = require("./routes/commande_produit");

app.use(cors());
app.use(express.json());

app.use("/produits", produitsRoutes);
app.use("/utilisateurs", utilisateursRoutes);
app.use("/commandes", commandesRoutes);
app.use("/commande_produit", commandeProduitRoutes);

app.get("/", (req, res) => {
    res.send("API Ecommerce lancé !");
});


app.listen(port, () => {
    console.log(`Serveur backend lancé sur http://localhost:${port}`);
});
