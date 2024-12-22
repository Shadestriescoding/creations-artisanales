const mongoose = require('mongoose');
const slugify = require('slugify');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  shortDescription: {
    type: String,
    required: true,
    maxLength: 160
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  compareAtPrice: {
    type: Number,
    min: 0
  },
  images: [{
    url: {
      type: String,
      required: true
    },
    alt: String,
    isDefault: {
      type: Boolean,
      default: false
    }
  }],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  inventory: {
    quantity: {
      type: Number,
      default: 0,
      min: 0
    },
    sku: {
      type: String,
      unique: true,
      sparse: true
    },
    allowBackorder: {
      type: Boolean,
      default: false
    },
    lowStockThreshold: {
      type: Number,
      default: 5
    }
  },
  dimensions: {
    height: Number,
    width: Number,
    length: Number,
    weight: Number
  },
  customizations: [{
    name: String,
    options: [String],
    required: {
      type: Boolean,
      default: false
    }
  }],
  seo: {
    title: String,
    description: String,
    keywords: [String]
  },
  stats: {
    views: {
      type: Number,
      default: 0
    },
    sales: {
      type: Number,
      default: 0
    },
    lastPurchased: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Index pour la recherche full-text
productSchema.index({
  name: 'text',
  description: 'text',
  'tags': 'text'
});

// Middleware pour générer le slug avant la sauvegarde
productSchema.pre('save', async function(next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, {
      lower: true,
      strict: true
    });
    
    // Vérifier si le slug existe déjà
    const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
    const productsWithSlug = await this.constructor.find({ slug: slugRegEx });
    
    if (productsWithSlug.length) {
      this.slug = `${this.slug}-${productsWithSlug.length + 1}`;
    }
  }
  next();
});

// Méthode pour vérifier si le produit est en stock
productSchema.methods.isInStock = function() {
  return this.inventory.allowBackorder || this.inventory.quantity > 0;
};

// Méthode pour vérifier si le produit est en rupture de stock
productSchema.methods.isLowStock = function() {
  return this.inventory.quantity <= this.inventory.lowStockThreshold;
};

// Méthode pour mettre à jour les statistiques de vente
productSchema.methods.updateSalesStats = async function(quantity) {
  this.stats.sales += quantity;
  this.stats.lastPurchased = new Date();
  await this.save();
};

// Méthode statique pour rechercher des produits
productSchema.statics.search = function(query) {
  return this.find(
    { $text: { $search: query } },
    { score: { $meta: 'textScore' } }
  ).sort({ score: { $meta: 'textScore' } });
};

// Méthode statique pour obtenir les produits en rupture de stock
productSchema.statics.getLowStock = function() {
  return this.find({
    'inventory.quantity': { $lte: '$inventory.lowStockThreshold' },
    status: 'published'
  });
};

module.exports = mongoose.model('Product', productSchema); 