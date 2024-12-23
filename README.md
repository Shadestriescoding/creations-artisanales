# La Cabane d'Eva - Site E-commerce

![CI](https://github.com/Shadestriescoding/creations-artisanales/workflows/CI/badge.svg)
![Deploy](https://github.com/Shadestriescoding/creations-artisanales/workflows/Deploy%20to%20GitHub%20Pages/badge.svg)

## Description
Site e-commerce pour La Cabane d'Eva, une boutique de créations artisanales.

[🌐 Voir le site](https://shadestriescoding.github.io/creations-artisanales/)

## Technologies utilisées
- Frontend : React.js, Styled Components
- Backend : Node.js, Express
- Base de données : MongoDB
- Authentification : JWT
- Gestion des fichiers : Multer
- Génération de PDF : PDFKit

## Fonctionnalités principales

### Site public
- Catalogue de produits avec filtres et recherche
- Panier d'achat
- Processus de commande
- Page de contact
- Responsive design

### Back Office (Administration)
- Tableau de bord avec statistiques
- Gestion des produits (CRUD)
- Gestion des catégories
- Gestion des commandes
  - Suivi des commandes
  - Génération de factures PDF
  - Confirmation de commande
- Gestion des paramètres du site
- Statistiques de vente
- Interface responsive

## Installation

1. Cloner le dépôt :
```bash
git clone https://github.com/votre-username/lacabanedeva.git
cd lacabanedeva
```

2. Installer les dépendances du backend :
```bash
cd server
npm install
```

3. Installer les dépendances du frontend :
```bash
cd client
npm install
```

4. Configurer les variables d'environnement :
- Créer un fichier `.env` dans le dossier `server` :
```
PORT=5000
MONGODB_URI=votre_uri_mongodb
JWT_SECRET=votre_secret_jwt
```
- Créer un fichier `.env` dans le dossier `client` :
```
REACT_APP_API_URL=http://localhost:5000/api
```

5. Démarrer le serveur de développement :
```bash
# Dans le dossier server
npm start

# Dans le dossier client
npm start
```

## Accès au Back Office

1. URL : http://localhost:3000/admin
2. Identifiants par défaut :
   - Email : admin@lacabanedeva.fr
   - Mot de passe : admin123

## Structure du projet

```
lacabanedeva/
├── client/                 # Frontend React
│   ├── public/
│   └── src/
│       ├── admin/         # Composants du back office
│       ├── components/    # Composants réutilisables
│       ├── contexts/      # Contextes React
│       ├── hooks/         # Hooks personnalisés
│       ├── pages/         # Pages principales
│       ├── services/      # Services API
│       └── styles/        # Styles globaux
└── server/                # Backend Node.js
    ├── controllers/       # Contrôleurs
    ├── middleware/        # Middleware personnalisé
    ├── models/           # Modèles Mongoose
    ├── routes/           # Routes API
    ├── services/         # Services
    ├── utils/            # Utilitaires
    └── validators/       # Validateurs

```

## Fonctionnalités détaillées du Back Office

### Tableau de bord
- Vue d'ensemble des ventes
- Statistiques des commandes
- Produits les plus vendus
- Alertes de stock bas
- Graphiques de performance

### Gestion des produits
- Liste des produits avec pagination
- Ajout/modification/suppression de produits
- Gestion des images
- Gestion des stocks
- Catégorisation des produits

### Gestion des commandes
- Liste des commandes avec filtres
- Détails des commandes
- Mise à jour du statut
- Génération de documents (factures, bons de livraison)
- Historique des modifications

### Gestion des catégories
- Arborescence des catégories
- Ajout/modification/suppression
- Association aux produits

### Paramètres
- Informations de la boutique
- Configuration des moyens de paiement
- Options de livraison
- Gestion des emails automatiques

## Sécurité
- Authentification JWT
- Protection CSRF
- Validation des données
- Gestion des permissions
- Logs de sécurité

## Maintenance
- Sauvegarde automatique
- Logs d'erreurs
- Mode maintenance
- Monitoring des performances

## Contribution
Les contributions sont les bienvenues ! Pour contribuer :
1. Forker le projet
2. Créer une branche (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commiter les changements (`git commit -m 'Ajout d'une nouvelle fonctionnalité'`)
4. Pusher vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrir une Pull Request

## Licence
Ce projet est sous licence MIT.