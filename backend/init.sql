DROP DATABASE IF EXISTS ecommerce;
CREATE DATABASE ecommerce;
USE ecommerce;

CREATE TABLE utilisateurs (
                              id INT PRIMARY KEY AUTO_INCREMENT,
                              nom VARCHAR(50),
                              prenom VARCHAR(50),
                              adresse TEXT,
                              email VARCHAR(100),
                              password VARCHAR(255),
                              telephone VARCHAR(20)
);

CREATE TABLE produits (
                          id INT PRIMARY KEY AUTO_INCREMENT,
                          nom VARCHAR(100),
                          description TEXT,
                          prix DECIMAL(10,2),
                          image VARCHAR(255)
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

INSERT INTO utilisateurs (nom, prenom, adresse, email, telephone, password)
VALUES ('Dupont', 'Marie', '10 rue des Lilas, Paris', 'marie.dupont@example.com', '0601020304', '$2b$10$exempledehash');

INSERT INTO produits (nom, description, prix, image) VALUES
                                                         ('T-shirt blanc', 'Coton bio', 19.90, 'https://picsum.photos/id/1011/300/200'),
                                                         ('Jeans bleu', 'Slim fit', 49.99, 'https://picsum.photos/id/1001/300/200'),
                                                         ('Sweat noir', 'Capuche + poche', 34.50, 'https://picsum.photos/id/1005/300/200');

INSERT INTO commandes (utilisateur_id, statut) VALUES (1, 'en_attente');

INSERT INTO commande_produit (commande_id, produit_id, quantite) VALUES
                                                                     (1, 1, 2),
                                                                     (1, 3, 1);
