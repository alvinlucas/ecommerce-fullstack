const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;

router.post('/register', async (req, res) => {
    const { nom, prenom, email, password } = req.body;

    if (!nom || !prenom || !email || !password) {
        return res.status(400).json({ error: "Tous les champs sont requis" });
    }

    if (password.length < 6) {
        return res.status(400).json({ error: "Le mot de passe doit faire au moins 6 caractères" });
    }

    db.query('SELECT * FROM utilisateurs WHERE email = ?', [email], async (err, result) => {
        if (err) return res.status(500).json({ error: "Erreur serveur" });
        if (result.length > 0) return res.status(409).json({ error: "Email déjà utilisé" });

        const hashedPassword = await bcrypt.hash(password, 10);
        db.query(
            'INSERT INTO utilisateurs (nom, prenom, email, password) VALUES (?, ?, ?, ?)',
            [nom, prenom, email, hashedPassword],
            (err) => {
                if (err) return res.status(500).json({ error: err.message });
                res.status(201).json({ message: "Compte créé avec succès" });
            }
        );
    });
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    db.query('SELECT * FROM utilisateurs WHERE email = ?', [email], async (err, results) => {
        if (err || results.length === 0) {
            return res.status(400).json({ error: 'Utilisateur non trouvé' });
        }

        const user = results[0];
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(401).json({ error: 'Mot de passe incorrect' });

        const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token, nom: user.nom, prenom: user.prenom, id: user.id });
    });
});

router.get("/:id", (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM utilisateurs WHERE id = ?", [id], (err, result) => {
        if (err) return res.status(500).json({ erreur: "Erreur serveur" });
        if (result.length === 0) return res.status(404).json({ message: "Utilisateur non trouvé" });
        res.json(result[0]);
    });
});

router.get("/nom/:nom", (req, res) => {
    const nom = req.params.nom;
    db.query("SELECT * FROM utilisateurs WHERE nom = ?", [nom], (err, result) => {
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

router.get("/commandes/utilisateur/:id", (req, res) => {
    const userId = req.params.id;
    db.query(`
        SELECT c.id, c.date_commande, p.nom AS produit_nom, cp.quantite
        FROM commandes c
        JOIN commande_produit cp ON c.id = cp.commande_id
        JOIN produits p ON cp.produit_id = p.id
        WHERE c.utilisateur_id = ?
        ORDER BY c.date_commande DESC
    `, [userId], (err, results) => {
        if (err) return res.status(500).json({ error: "Erreur serveur" });

        const grouped = {};
        for (const row of results) {
            if (!grouped[row.id]) {
                grouped[row.id] = {
                    id: row.id,
                    date_commande: row.date_commande,
                    produits: []
                };
            }
            grouped[row.id].produits.push({
                nom: row.produit_nom,
                quantite: row.quantite
            });
        }

        res.json(Object.values(grouped));
    });
});

module.exports = router;
