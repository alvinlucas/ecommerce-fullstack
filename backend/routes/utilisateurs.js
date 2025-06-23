const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/:id", (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM utilisateurs WHERE id = ?", [id], (err, result) => {
        if (err) return res.status(500).json({ erreur: "Erreur serveur" });
        if (result.length === 0) return res.status(404).json({ message: "Utilisateur non trouvé" });
        res.json(result[0]);
    });
});

router.put("/:id", (req, res) => {
    const id = req.params.id;
    const { nom, prenom, adresse, email, telephone } = req.body;
    db.query(
        "UPDATE utilisateurs SET nom = ?, prenom = ?, adresse = ?, email = ?, telephone = ? WHERE id = ?",
        [nom, prenom, adresse, email, telephone, id],
        (err) => {
            if (err) return res.status(500).json({ erreur: "Erreur serveur" });
            res.json({ message: "Utilisateur mis à jour" });
        }
    );
});

module.exports = router;
