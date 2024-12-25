const fs = require('fs').promises;
const path = require('path');
const imageService = require('../server/services/imageService');

const sourceDir = path.join(__dirname, '../assets/images/categories');
const targetDir = path.join(__dirname, '../server/uploads');

const processImages = async () => {
  try {
    // Créer le dossier cible s'il n'existe pas
    await fs.mkdir(targetDir, { recursive: true });

    // Lire tous les fichiers du dossier source
    const files = await fs.readdir(sourceDir);

    for (const file of files) {
      const sourcePath = path.join(sourceDir, file);
      const fileBuffer = await fs.readFile(sourcePath);

      // Créer un objet similaire à un fichier multer
      const mockFile = {
        buffer: fileBuffer,
        originalname: file,
        mimetype: 'image/jpeg'
      };

      // Utiliser le service d'images existant pour traiter l'image
      const processedImage = await imageService.uploadImage(mockFile);
      console.log(`Image traitée avec succès: ${file}`);
      console.log('Versions générées:', processedImage);
    }

    console.log('Toutes les images ont été traitées avec succès');
  } catch (error) {
    console.error('Erreur lors du traitement des images:', error);
  }
};

processImages(); 