# ecommerce-fullstack

Projet e-commerce fullstack développé avec Angular pour le frontend, Node.js (Express) pour le backend et MySQL pour la base de données.

## Structure du projet

```
.
├── backend         → Code du serveur Express (Node.js)
├── frontend        → Application Angular 18
```

## Prérequis

- Node.js >= 18
- Angular CLI (`npm install -g @angular/cli`)
- MySQL (ou équivalent)
- Un environnement compatible pour exécuter des commandes `npm` (Terminal, PowerShell, etc.)

---

## Installation

### 1. Cloner le dépôt

```bash
git clone https://github.com/alvinlucas/ecommerce-fullstack.git
cd ecommerce-fullstack
```

### 2. Initialiser la base de données

Assurez-vous que MySQL est lancé.

Dans votre outil MySQL (MySQL Workbench, phpMyAdmin, ou en ligne de commande), exécutez le script `init.sql` (présent dans le dossier `backend`) pour créer la base et les tables nécessaires.

### 3. Configurer les variables d’environnement

Créez un fichier `.env` dans le dossier `backend` avec le contenu suivant (ajustez selon votre configuration locale) :

```
DB_HOST=localhost
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=ecommerce
PORT=3000

SECRET_KEY=your_super_secret_key
```

> **Important** : Ne partagez jamais vos vraies informations de connexion ou votre `SECRET_KEY` publiquement.

### 4. Installer les dépendances

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd ../frontend
npm install
```

---

## Lancement du projet

### Backend

Depuis le dossier `backend` :

```bash
node server.js
```

Le backend sera accessible sur `http://localhost:3000`.

### Frontend

Depuis le dossier `frontend` :

```bash
ng serve
```

Le frontend sera accessible sur `http://localhost:4200`.

---

## Fonctionnalités principales

- Authentification (connexion / inscription)
- Gestion du compte utilisateur (modification des infos personnelles)
- Catalogue de produits
- Ajout au panier avec gestion dynamique
- Pop-in de détails produits
- Récapitulatif des commandes passées

---

## Auteur

Projet réalisé par Alvin LUCAS – 2025