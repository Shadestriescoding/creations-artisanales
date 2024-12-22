const sharp = require('sharp');
const path = require('path');
const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');
const config = require('../config');

// Configuration des tailles d'images
const IMAGE_SIZES = {
  thumbnail: { width: 150, height: 150 },
  small: { width: 300, height: 300 },
  medium: { width: 600, height: 600 },
  large: { width: 1200, height: 1200 }
};

// Configuration des formats d'images
const IMAGE_FORMATS = ['webp', 'jpeg'];

class ImageService {
  constructor() {
    this.uploadDir = path.join(__dirname, '..', 'uploads');
    this.ensureUploadDir();
  }

  async ensureUploadDir() {
    try {
      await fs.access(this.uploadDir);
    } catch {
      await fs.mkdir(this.uploadDir, { recursive: true });
    }
  }

  async uploadImage(file) {
    try {
      const filename = `${uuidv4()}`;
      const metadata = await sharp(file.buffer).metadata();

      // Créer les différentes versions de l'image
      const versions = {};
      for (const [size, dimensions] of Object.entries(IMAGE_SIZES)) {
        const sizeDir = path.join(this.uploadDir, size);
        await fs.mkdir(sizeDir, { recursive: true });

        for (const format of IMAGE_FORMATS) {
          const outputFilename = `${filename}.${format}`;
          const outputPath = path.join(sizeDir, outputFilename);
          
          let pipeline = sharp(file.buffer)
            .resize(dimensions.width, dimensions.height, {
              fit: 'contain',
              background: { r: 255, g: 255, b: 255, alpha: 0 }
            });

          if (format === 'webp') {
            pipeline = pipeline.webp({ quality: 80 });
          } else if (format === 'jpeg') {
            pipeline = pipeline.jpeg({ quality: 80 });
          }

          await pipeline.toFile(outputPath);

          if (!versions[size]) versions[size] = {};
          versions[size][format] = `/uploads/${size}/${outputFilename}`;
        }
      }

      return {
        id: filename,
        originalName: file.originalname,
        mimeType: file.mimetype,
        sizes: versions,
        metadata: {
          width: metadata.width,
          height: metadata.height,
          format: metadata.format
        }
      };
    } catch (error) {
      console.error('Erreur lors du traitement de l\'image:', error);
      throw new Error('Erreur lors du traitement de l\'image');
    }
  }

  async deleteImage(imageId) {
    try {
      for (const size of Object.keys(IMAGE_SIZES)) {
        const sizeDir = path.join(this.uploadDir, size);
        for (const format of IMAGE_FORMATS) {
          const filename = `${imageId}.${format}`;
          const filepath = path.join(sizeDir, filename);
          try {
            await fs.unlink(filepath);
          } catch (error) {
            if (error.code !== 'ENOENT') throw error;
          }
        }
      }
      return true;
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'image:', error);
      throw new Error('Erreur lors de la suppression de l\'image');
    }
  }

  async optimizeImage(filepath, options = {}) {
    try {
      const {
        quality = 80,
        format = 'webp',
        width,
        height
      } = options;

      let pipeline = sharp(filepath);

      if (width || height) {
        pipeline = pipeline.resize(width, height, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 }
        });
      }

      if (format === 'webp') {
        pipeline = pipeline.webp({ quality });
      } else if (format === 'jpeg') {
        pipeline = pipeline.jpeg({ quality });
      }

      const outputFilename = path.basename(filepath, path.extname(filepath)) + '.' + format;
      const outputPath = path.join(path.dirname(filepath), outputFilename);

      await pipeline.toFile(outputPath);
      return outputPath;
    } catch (error) {
      console.error('Erreur lors de l\'optimisation de l\'image:', error);
      throw new Error('Erreur lors de l\'optimisation de l\'image');
    }
  }

  getImageUrl(filename, size = 'medium', format = 'webp') {
    if (!IMAGE_SIZES[size]) size = 'medium';
    if (!IMAGE_FORMATS.includes(format)) format = 'webp';
    return `/uploads/${size}/${filename}.${format}`;
  }

  async generateResponsiveImages(file) {
    try {
      const filename = `${uuidv4()}`;
      const versions = {};

      for (const [size, dimensions] of Object.entries(IMAGE_SIZES)) {
        versions[size] = await this.uploadImage(file, {
          ...dimensions,
          filename: `${filename}-${size}`
        });
      }

      return {
        id: filename,
        versions
      };
    } catch (error) {
      console.error('Erreur lors de la génération des images responsives:', error);
      throw new Error('Erreur lors de la génération des images responsives');
    }
  }
}

module.exports = new ImageService(); 