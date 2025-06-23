const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
    db.query("SELECT * FROM produits", (err, result) => {
        if (err) {
            console.error("Erreur récupération produits:", err);
            return res.status(500).json({ erreur: "Erreur serveur" });
        }
        res.json(result);
    });
});

router.post("/", (req, res) => {
    const { nom, description, prix } = req.body;
    db.query(
        "INSERT INTO produits (nom, description, prix) VALUES (?, ?, ?)",
        [nom, description, prix],
        (err, result) => {
            if (err) {
                console.error("Erreur insertion produit:", err);
                return res.status(500).json({ erreur: "Erreur serveur" });
            }
            res.status(201).json({ id: result.insertId, nom, description, prix });
        }
    );
});

router.get("/:id", (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM produits WHERE id = ?", [id], (err, result) => {
        if (err) return res.status(500).json({ erreur: "Erreur serveur" });
        if (result.length === 0) return res.status(404).json({ message: "Produit non trouvé" });
        res.json(result[0]);
    });
});

router.put("/:id", (req, res) => {
    const id = req.params.id;
    const { nom, description, prix } = req.body;
    db.query(
        "UPDATE produits SET nom = ?, description = ?, prix = ? WHERE id = ?",
        [nom, description, prix, id],
        (err) => {
            if (err) return res.status(500).json({ erreur: "Erreur serveur" });
            res.json({ message: "Produit mis à jour" });
        }
    );
});

router.delete("/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM produits WHERE id = ?", [id], (err) => {
        if (err) return res.status(500).json({ erreur: "Erreur serveur" });
        res.json({ message: "Produit supprimé" });
    });
});


module.exports = router;
