# Projet Stack MERN – Boutique de films en ligne

## Membres du groupe

- Barakissa Yasmine KONE
- Anass HOUDZI
- Monica RADIFERA RASAMOELIJAONA
- Hocine AKLI

## Présentation

Ce projet consiste à développer une application web de boutique de films en ligne en utilisant la stack MERN.
L’application repose sur une API Node.js / Express connectée à une base de données MongoDB, ainsi qu’un frontend React permettant d’exploiter les données.

L’environnement est entièrement conteneurisé avec Docker.

---

## Stack technique

- MongoDB
- Express
- React
- Node.js
- Docker

---

## Lancement du projet

### Récupération du code

Si le projet est déjà cloné :

```bash
git pull
```

Sinon :

```bash
git clone <url-du-repository>
cd projetStackMERN
```

---

### Démarrage de l’environnement

Depuis la racine du projet :

```bash
docker-compose up -d
```

Cette commande démarre les services nécessaires, notamment MongoDB.

---

## Initialisation de la base de données

Connexion à MongoDB :

```bash
mongosh --port 27017
```

Puis :

```js
use admin
db.auth("mongo_user", passwordPrompt())
use shop
```

Quitter mongosh, puis importer les données CSV dans la collection `movies` :

```bash
mongoimport \
  --type csv \
  --headerline \
  --db shop \
  --collection movies \
  --file /import/datasource/movies_with_price_comma.csv \
  --username mongo_user \
  --password example1234 \
  --authenticationDatabase admin
```

---

## Vérification

Relancer mongosh :

```bash
mongosh --port 27017
```

Puis :

```js
use admin
db.auth("mongo_user", passwordPrompt())
use shop
show collections
```

Exemple de requête :

```js
db.movies.find({ duration: "90 min" });
```
## Routes de l’API

L’API expose trois principales ressources : **Users**, **Orders** et **Movies**.
Voici le détail des endpoints actuellement disponibles.

---

### Users

Base URL : `/users`

* **POST /users**
  Créer un nouvel utilisateur

* **GET /users**
  Récupérer la liste de tous les utilisateurs

* **GET /users/:id**
  Récupérer un utilisateur par son identifiant

* **PUT /users/:id**
  Mettre à jour les informations d’un utilisateur

---

### Orders

Base URL : `/orders`

* **POST /orders**
  Créer une nouvelle commande

* **GET /orders**
  Récupérer l’ensemble des commandes

* **GET /orders/:id**
  Récupérer une commande spécifique par son identifiant

* **DELETE /orders/:id**
  Supprimer une commande

---

### Movies

Base URL : `/api/movies`

* **GET /api/movies**
  Récupérer tous les films

* **GET /api/movies/:id**
  Récupérer un film par son identifiant

* **GET /api/movies/show/:show_id**
  Récupérer un film via son show_id

* **GET /api/movies/search**
  Rechercher un film selon des critères

* **POST /api/movies**
  Ajouter un nouveau film

* **PUT /api/movies/:id**
  Mettre à jour un film

* **DELETE /api/movies/:id**
  Supprimer un film

* **GET /api/movies/routes**
  Route de test pour vérifier la configuration des routes Movies

---

Ces routes constituent la structure principale de l’API REST du projet.

---

## Frontend

Le frontend de l’application est développé avec React et se trouve dans le dossier `client`.

### Lancement

Se placer dans le dossier du frontend :

```bash
cd front-react
```

Installer les dépendances :

```bash
npm install
```

Démarrer le serveur de développement :

```bash
npm start
```

L’application est accessible à l’adresse :

```
http://localhost:3000
```

---

## État actuel

Pour l’instant, le frontend n’est pas encore connecté au backend.

Les données affichées sont statiques ou simulées.
La connexion avec l’API Node.js et la base MongoDB sera intégrée dans une prochaine étape du projet.


## Objectif

Ce projet met en place :

- une architecture MERN complète
- une base MongoDB sécurisée
- un import de données depuis un fichier CSV
- une application connectée backend / frontend
- un environnement Docker reproductible
