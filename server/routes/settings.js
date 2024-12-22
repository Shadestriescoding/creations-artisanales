const express = require('express');
const router = express.Router();
const { isAuthenticated, isAdmin } = require('../middleware/auth');
const settingsController = require('../controllers/settingsController');

// Routes publiques
router.get('/public', settingsController.getPublicSettings);

// Routes protégées (admin seulement)
router.get('/', isAuthenticated, isAdmin, settingsController.getSettings);
router.put('/', isAuthenticated, isAdmin, settingsController.updateSettings);
router.post('/maintenance', isAuthenticated, isAdmin, settingsController.toggleMaintenanceMode);

module.exports = router; 