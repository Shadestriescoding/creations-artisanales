const express = require('express');
const router = express.Router();
const multer = require('multer');
const { isAuthenticated, isAdmin } = require('../middleware/auth');
const productController = require('../controllers/productController');
const { checkMaintenanceMode } = require('../middleware/maintenance');

// Configuration de multer pour le téléchargement d'images
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Format de fichier non supporté'), false);
    }
  }
});

// Routes publiques
router.get('/', checkMaintenanceMode, productController.getAllProducts);
router.get('/search', checkMaintenanceMode, productController.searchProducts);
router.get('/:slug', checkMaintenanceMode, productController.getProductBySlug);

// Routes protégées (admin seulement)
router.post('/',
  isAuthenticated,
  isAdmin,
  upload.array('images', 10),
  productController.createProduct
);

router.put('/:id',
  isAuthenticated,
  isAdmin,
  upload.array('images', 10),
  productController.updateProduct
);

router.delete('/:id',
  isAuthenticated,
  isAdmin,
  productController.deleteProduct
);

router.patch('/:id/inventory',
  isAuthenticated,
  isAdmin,
  productController.updateInventory
);

router.get('/admin/low-stock',
  isAuthenticated,
  isAdmin,
  productController.getLowStockProducts
);

// Gestion des erreurs de multer
router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        message: 'Le fichier est trop volumineux. Taille maximale: 5MB'
      });
    }
  }
  next(error);
});

module.exports = router; 