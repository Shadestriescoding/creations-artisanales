const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const imageminSvgo = require('imagemin-svgo');
const imageminGifsicle = require('imagemin-gifsicle');
const { promises: fs } = require('fs');
const path = require('path');

const IMAGES_DIR = './assets/images';
const OUTPUT_DIR = './dist/images';

async function optimizeImages() {
    try {
        // Créer le dossier de sortie s'il n'existe pas
        await fs.mkdir(OUTPUT_DIR, { recursive: true });

        // Optimiser les images
        const files = await imagemin([`${IMAGES_DIR}/**/*.{jpg,png,svg,gif}`], {
            destination: OUTPUT_DIR,
            plugins: [
                imageminMozjpeg({
                    quality: 80,
                    progressive: true
                }),
                imageminPngquant({
                    quality: [0.6, 0.8],
                    strip: true
                }),
                imageminSvgo({
                    plugins: [
                        { name: 'removeViewBox', active: false },
                        { name: 'cleanupIDs', active: false }
                    ]
                }),
                imageminGifsicle({
                    optimizationLevel: 3,
                    interlaced: true
                })
            ]
        });

        // Générer les versions WebP
        await imagemin([`${IMAGES_DIR}/**/*.{jpg,png}`], {
            destination: OUTPUT_DIR,
            plugins: [
                require('imagemin-webp')({ quality: 75 })
            ]
        });

        console.log('Images optimisées avec succès !');
        console.log(`Nombre d'images traitées : ${files.length}`);
    } catch (error) {
        console.error('Erreur lors de l\'optimisation des images:', error);
        process.exit(1);
    }
}

// Exécuter l'optimisation
optimizeImages(); 