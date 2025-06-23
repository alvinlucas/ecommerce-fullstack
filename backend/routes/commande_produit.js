const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/:commandeId", (req, res) => {
    const id = req.params.commandeId;

    const sql = `
    SELECT cp.*, p.nom, p.prix
    FROM commande_produit cp
    JOIN produits p ON cp.produit_id = p.id
    WHERE cp.commande_id = ?
  `;

    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ erreur: "Erreur serveur" });
        res.json(result);
    });
});

router.delete("/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM commande_produit WHERE id = ?", [id], (err) => {
        if (err) return res.status(500).json({ erreur: "Erreur suppression" });
        res.json({ message: "Produit supprimé de la commande" });
    });
});

router.put("/:id", (req, res) => {
    const id = req.params.id;
    const { quantite } = req.body;

    db.query(
        "UPDATE commande_produit SET quantite = ? WHERE id = ?",
        [quantite, id],
        (err) => {
            if (err) return res.status(500).json({ erreur: "Erreur modification" });
            res.json({ message: "Quantité mise à jour" });
        }
    );
});

module.exports = router;
