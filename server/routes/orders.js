const express = require('express');
const router = express.Router();
const { isAuthenticated, isAdmin } = require('../middleware/auth');
const orderController = require('../controllers/orderController');
const { checkMaintenanceMode } = require('../middleware/maintenance');

// Routes publiques (protégées par authentification)
router.post('/',
  isAuthenticated,
  checkMaintenanceMode,
  orderController.createOrder
);

router.get('/my-orders',
  isAuthenticated,
  checkMaintenanceMode,
  async (req, res, next) => {
    req.query.customer = req.user._id;
    next();
  },
  orderController.getAllOrders
);

// Routes admin
router.get('/',
  isAuthenticated,
  isAdmin,
  orderController.getAllOrders
);

router.get('/stats',
  isAuthenticated,
  isAdmin,
  orderController.getOrderStats
);

router.get('/:id',
  isAuthenticated,
  async (req, res, next) => {
    if (!req.user.isAdmin) {
      const order = await Order.findOne({
        _id: req.params.id,
        customer: req.user._id
      });
      if (!order) {
        return res.status(404).json({ message: 'Commande non trouvée' });
      }
    }
    next();
  },
  orderController.getOrderById
);

router.put('/:id',
  isAuthenticated,
  isAdmin,
  orderController.updateOrder
);

router.delete('/:id',
  isAuthenticated,
  isAdmin,
  orderController.deleteOrder
);

router.get('/:id/invoice',
  isAuthenticated,
  async (req, res, next) => {
    if (!req.user.isAdmin) {
      const order = await Order.findOne({
        _id: req.params.id,
        customer: req.user._id
      });
      if (!order) {
        return res.status(404).json({ message: 'Commande non trouvée' });
      }
    }
    next();
  },
  orderController.generateInvoice
);

// Gestion des erreurs
router.use((error, req, res, next) => {
  console.error('Erreur dans les routes de commandes:', error);
  res.status(500).json({
    message: 'Une erreur est survenue lors du traitement de la commande'
  });
});

module.exports = router; 