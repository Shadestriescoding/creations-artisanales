const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Créer le dossier data/db s'il n'existe pas
const dbPath = path.join(__dirname, '..', 'data', 'db');
if (!fs.existsSync(dbPath)) {
  fs.mkdirSync(dbPath, { recursive: true });
  console.log('Dossier data/db créé avec succès');
}

// Vérifier si MongoDB est installé
exec('mongod --version', (error) => {
  if (error) {
    console.log('MongoDB n\'est pas installé. Installation en cours...');
    
    // Télécharger MongoDB pour Windows
    const downloadUrl = 'https://fastdl.mongodb.org/windows/mongodb-windows-x86_64-6.0.13-signed.msi';
    const installerPath = path.join(__dirname, 'mongodb-installer.msi');
    
    exec(`curl -o "${installerPath}" "${downloadUrl}"`, (err) => {
      if (err) {
        console.error('Erreur lors du téléchargement de MongoDB:', err);
        return;
      }
      
      // Installer MongoDB
      exec(`msiexec /i "${installerPath}" /quiet /qn`, (installErr) => {
        if (installErr) {
          console.error('Erreur lors de l\'installation de MongoDB:', installErr);
          return;
        }
        
        console.log('MongoDB installé avec succès');
        
        // Supprimer l'installateur
        fs.unlinkSync(installerPath);
        
        // Démarrer MongoDB
        startMongoDB();
      });
    });
  } else {
    console.log('MongoDB est déjà installé');
    startMongoDB();
  }
});

function startMongoDB() {
  // Démarrer le service MongoDB
  exec('net start MongoDB', (error) => {
    if (error) {
      console.log('Démarrage manuel de MongoDB...');
      exec(`mongod --dbpath "${dbPath}"`, (err) => {
        if (err) {
          console.error('Erreur lors du démarrage de MongoDB:', err);
          return;
        }
        console.log('MongoDB démarré avec succès');
      });
    } else {
      console.log('Service MongoDB démarré avec succès');
    }
  });
} 