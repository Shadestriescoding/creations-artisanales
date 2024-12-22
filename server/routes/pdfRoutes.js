const express = require('express');
const router = express.Router();
const pdfController = require('../controllers/pdfController');
const { protect } = require('../middleware/authMiddleware');

// Routes pour la génération de PDF
router.get('/invoice/:orderId', protect, pdfController.generateInvoice);
router.get('/order-confirmation/:orderId', protect, pdfController.generateOrderConfirmation);

module.exports = router; 