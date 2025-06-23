const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", (req, res) => {
    const { utilisateur_id, produits } = req.body;

    db.query(
        "INSERT INTO commandes (utilisateur_id) VALUES (?)",
        [utilisateur_id],
        (err, result) => {
            if (err) return res.status(500).json({ erreur: "Erreur création commande" });

            const commandeId = result.insertId;
            const values = produits.map((p) => [commandeId, p.produit_id, p.quantite]);

            db.query(
                "INSERT INTO commande_produit (commande_id, produit_id, quantite) VALUES ?",
                [values],
                (err) => {
                    if (err) return res.status(500).json({ erreur: "Erreur ajout produits" });
                    res.status(201).json({ commandeId });
                }
            );
        }
    );
});

router.get("/:utilisateurId", (req, res) => {
    const id = req.params.utilisateurId;

    db.query(
        `SELECT c.id AS commande_id, c.date_commande, c.statut,
            p.nom, p.prix, cp.quantite
     FROM commandes c
     JOIN commande_produit cp ON c.id = cp.commande_id
     JOIN produits p ON p.id = cp.produit_id
     WHERE c.utilisateur_id = ?
     ORDER BY c.date_commande DESC`,
        [id],
        (err, result) => {
            if (err) return res.status(500).json({ erreur: "Erreur récupération commandes" });
            res.json(result);
        }
    );
});

module.exports = router;
