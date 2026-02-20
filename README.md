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

---

## Objectif

Ce projet met en place :

- une architecture MERN complète
- une base MongoDB sécurisée
- un import de données depuis un fichier CSV
- une application connectée backend / frontend
- un environnement Docker reproductible
