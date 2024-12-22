const Settings = require('../models/Settings');

exports.checkMaintenanceMode = async (req, res, next) => {
  try {
    const settings = await Settings.getActive();
    
    if (settings.maintenanceMode) {
      return res.status(503).json({
        message: 'Site en maintenance',
        maintenanceMode: true
      });
    }
    
    next();
  } catch (error) {
    console.error('Erreur lors de la vérification du mode maintenance:', error);
    next();
  }
}; 