const Settings = require('../models/Settings');
const { validateSettings } = require('../validators/settingsValidator');

exports.getSettings = async (req, res) => {
  try {
    const settings = await Settings.getActive();
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des paramètres' });
  }
};

exports.updateSettings = async (req, res) => {
  try {
    const { error } = validateSettings(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const settings = await Settings.getActive();
    Object.assign(settings, req.body);
    await settings.save();

    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour des paramètres' });
  }
};

exports.toggleMaintenanceMode = async (req, res) => {
  try {
    const { enabled } = req.body;
    const settings = await Settings.getActive();
    settings.maintenanceMode = enabled;
    await settings.save();

    res.json({ maintenanceMode: settings.maintenanceMode });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la modification du mode maintenance' });
  }
};

exports.getPublicSettings = async (req, res) => {
  try {
    const settings = await Settings.getActive();
    // Ne renvoie que les paramètres publics
    const publicSettings = {
      siteName: settings.siteName,
      maintenanceMode: settings.maintenanceMode,
      socialMedia: settings.socialMedia,
      seo: settings.seo
    };
    res.json(publicSettings);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des paramètres publics' });
  }
}; 