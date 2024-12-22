const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const config = require('./config');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API fonctionne correctement!' });
});

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Une erreur est survenue!',
    error: config.env === 'development' ? err.message : undefined
  });
});

// Connexion MongoDB avec retry
const connectWithRetry = async () => {
  try {
    await mongoose.connect(config.mongoUri, {
      serverSelectionTimeoutMS: 5000,
      family: 4
    });
    console.log('✅ Connecté à MongoDB');
  } catch (err) {
    console.error('❌ Erreur MongoDB:', err);
    console.log('Nouvelle tentative dans 5 secondes...');
    setTimeout(connectWithRetry, 5000);
  }
};

connectWithRetry();

// Démarrage du serveur
const server = app.listen(config.port, () => {
  console.log(`✅ Serveur démarré sur http://localhost:${config.port}`);
});

// Gestion de l'arrêt gracieux
process.on('SIGTERM', () => {
  console.log('SIGTERM reçu. Arrêt gracieux...');
  server.close(() => {
    mongoose.connection.close(false, () => {
      console.log('MongoDB déconnecté. Arrêt du processus.');
      process.exit(0);
    });
  });
}); 