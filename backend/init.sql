CREATE DATABASE IF NOT EXISTS ecommerce;
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
