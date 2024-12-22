const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  siteName: {
    type: String,
    required: true,
    default: "La Cabane d'Eva"
  },
  email: {
    type: String,
    required: true,
    default: "contact@lacabanedeva.fr"
  },
  phone: {
    type: String,
    default: ""
  },
  address: {
    type: String,
    default: ""
  },
  notificationsEnabled: {
    type: Boolean,
    default: true
  },
  maintenanceMode: {
    type: Boolean,
    default: false
  },
  socialMedia: {
    instagram: {
      type: String,
      default: ""
    },
    facebook: {
      type: String,
      default: ""
    },
    pinterest: {
      type: String,
      default: ""
    }
  },
  seo: {
    metaDescription: {
      type: String,
      default: "La Cabane d'Eva - Créations artisanales et objets faits main"
    },
    keywords: {
      type: String,
      default: "artisanat, fait main, crochet, décoration, créations originales"
    }
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware pour mettre à jour la date de modification
settingsSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Méthode statique pour obtenir les paramètres actifs
settingsSchema.statics.getActive = async function() {
  let settings = await this.findOne();
  if (!settings) {
    settings = await this.create({});
  }
  return settings;
};

module.exports = mongoose.model('Settings', settingsSchema); 