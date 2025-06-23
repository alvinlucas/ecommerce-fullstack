DROP DATABASE IF EXISTS ecommerce;
CREATE DATABASE ecommerce;
USE ecommerce;

CREATE TABLE utilisateurs (
                              id INT PRIMARY KEY AUTO_INCREMENT,
                              nom VARCHAR(50),
                              prenom VARCHAR(50),
                              adresse TEXT,
                              email VARCHAR(100),
                              telephone VARCHAR(20)
);

CREATE TABLE produits (
                          id INT PRIMARY KEY AUTO_INCREMENT,
                          nom VARCHAR(100),
                          description TEXT,
                          prix DECIMAL(10,2)
);

CREATE TABLE commandes (
                           id INT PRIMARY KEY AUTO_INCREMENT,
                           utilisateur_id INT,
                           date_commande DATETIME DEFAULT CURRENT_TIMESTAMP,
                           statut ENUM('en_attente', 'validee', 'annulee') DEFAULT 'en_attente',
                           FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id)
);

CREATE TABLE commande_produit (
                                  id INT PRIMARY KEY AUTO_INCREMENT,
                                  commande_id INT,
                                  produit_id INT,
                                  quantite INT,
                                  FOREIGN KEY (commande_id) REFERENCES commandes(id),
                                  FOREIGN KEY (produit_id) REFERENCES produits(id)
);

INSERT INTO utilisateurs (nom, prenom, adresse, email, telephone)
VALUES ('Dupont', 'Marie', '10 rue des Lilas, Paris', 'marie.dupont@example.com', '0601020304');

INSERT INTO produits (nom, description, prix) VALUES
                                                  ('T-shirt blanc', 'Coton bio', 19.90),
                                                  ('Jeans bleu', 'Slim fit', 49.99),
                                                  ('Sweat noir', 'Capuche + poche', 34.50);

INSERT INTO commandes (utilisateur_id, statut) VALUES (1, 'en_attente');

INSERT INTO commande_produit (commande_id, produit_id, quantite) VALUES
                                                                     (1, 1, 2),
                                                                     (1, 3, 1);
