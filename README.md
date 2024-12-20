# SportSee - Dashboard d'analyse de performance sportive

SportSee est une application de tableau de bord de coaching sportif, permettant de visualiser les données liées à la santé et aux performances sportives des utilisateurs. Ce projet fait partie du **parcours Développeur Front-End d'OpenClassrooms** (Projet 12).

## Table des matières

- [Technologies utilisées](#technologies-utilisées)
- [Prérequis](#prérequis)
- [Structure du projet](#structure-du-projet)
- [Fonctionnalités](#fonctionnalités)
- [Utilisation](#utilisation)
- [Installation](#installation)


---

## Technologies utilisées

- **React** : Librairie JavaScript pour construire l'interface utilisateur.
- **SCSS** : Préprocesseur CSS pour une gestion efficace des styles.
- **Recharts** : Librairie pour les graphiques et visualisations.
- **Fetch API** : Pour les appels API REST.
- **Node.js** : Pour exécuter le backend local.

---

## Prérequis

Avant de commencer, assurez-vous d'avoir installé sur votre machine :

- **[Node.js](https://nodejs.org/)** (version 14 ou supérieure)
- **npm** ou **yarn** (gestionnaire de paquets)

---

## Structure du projet :
```bash
SportSee/
├── src/
│   ├── assets/        # Fichiers d'images et icônes
│   ├── components/    # Composants React réutilisables
│   ├── services/      # Gestion des appels API et des services liés
│   ├── dataMock/      # Données simulées pour le développement
│   ├── pages/         # Pages principales de l'application
│   └── App.js         # Point d'entrée principal de l'application
├── package.json       # Fichier de configuration pour npm et les dépendances
├── README.md          # Documentation du projet

```
---

## Fonctionnalités
- Accueil personnalisé : Affiche un message de bienvenue avec le prénom de l'utilisateur.
- Visualisation des données :
- Activités quotidiennes
- Sessions moyennes
- Performances par catégorie
- Objectif quotidien en pourcentage
- Interface responsive : Adaptée à différents écrans.
- Support multi-utilisateur : Récupère les données en fonction de l'ID utilisateur.

---

## Utilisation
- Démarrez le serveur backend et assurez-vous qu'il fonctionne correctement.
- Lancez l'application frontend.
- Naviguez dans l'interface pour explorer les données d'analyse sportive.

---

## Installation

### 1. Cloner les dépôts

Clonez  le backend à partir des dépôts GitHub :

```bash

# Cloner le backend
git https://github.com/OpenClassrooms-Student-Center/SportSee.git

```
```bash
# Lancer le serveur backend:
npm run start

```
```bash
# Lancer le serveur frontend:
npm run dev

```






