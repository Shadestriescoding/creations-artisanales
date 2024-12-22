#!/bin/bash

# Vérifier si Docker est installé
if ! command -v docker &> /dev/null; then
    echo "Docker n'est pas installé. Installation..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
fi

# Vérifier si Docker Compose est installé
if ! command -v docker-compose &> /dev/null; then
    echo "Docker Compose n'est pas installé. Installation..."
    sudo curl -L "https://github.com/docker/compose/releases/download/v2.17.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
fi

# Arrêter les conteneurs existants
echo "Arrêt des conteneurs existants..."
docker-compose down

# Construire les images
echo "Construction des images Docker..."
docker-compose build

# Démarrer les services
echo "Démarrage des services..."
docker-compose up -d

# Attendre que les services soient prêts
echo "Attente du démarrage des services..."
sleep 10

# Vérifier l'état des services
echo "Vérification de l'état des services..."
docker-compose ps

echo "Le déploiement est terminé !"
echo "Client : http://localhost:3000"
echo "API : http://localhost:5000"
echo "MongoDB : mongodb://localhost:27017" 