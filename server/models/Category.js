const mongoose = require('mongoose');
const slugify = require('slugify');

const categorySchema = new mongoose.Schema({
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
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    default: null
  },
  ancestors: [{
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true
    }
  }],
  image: {
    url: String,
    alt: String
  },
  icon: {
    type: String,
    default: '📦'
  },
  displayOrder: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  seo: {
    title: String,
    description: String,
    keywords: [String]
  },
  stats: {
    productCount: {
      type: Number,
      default: 0
    },
    totalSales: {
      type: Number,
      default: 0
    }
  },
  customFields: [{
    name: String,
    type: {
      type: String,
      enum: ['text', 'number', 'boolean', 'select'],
      default: 'text'
    },
    options: [String], // Pour le type 'select'
    required: {
      type: Boolean,
      default: false
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Index pour la recherche
categorySchema.index({ name: 'text', description: 'text' });

// Virtuals
categorySchema.virtual('children', {
  ref: 'Category',
  localField: '_id',
  foreignField: 'parent'
});

categorySchema.virtual('products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'category'
});

// Middleware pour générer le slug
categorySchema.pre('save', async function(next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, {
      lower: true,
      strict: true
    });
    
    // Vérifier si le slug existe déjà
    const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
    const categoriesWithSlug = await this.constructor.find({ slug: slugRegEx });
    
    if (categoriesWithSlug.length) {
      this.slug = `${this.slug}-${categoriesWithSlug.length + 1}`;
    }
  }

  // Mettre à jour les ancêtres si le parent change
  if (this.isModified('parent') && this.parent) {
    const parent = await this.constructor.findById(this.parent);
    if (parent) {
      this.ancestors = [
        ...parent.ancestors,
        {
          _id: parent._id,
          name: parent.name,
          slug: parent.slug
        }
      ];
    }
  }

  this.updatedAt = new Date();
  next();
});

// Méthode pour obtenir le chemin complet
categorySchema.methods.getPath = function() {
  return [...this.ancestors.map(a => a.name), this.name].join(' > ');
};

// Méthode pour mettre à jour les statistiques
categorySchema.methods.updateStats = async function() {
  const products = await mongoose.model('Product').find({ category: this._id });
  
  this.stats.productCount = products.length;
  this.stats.totalSales = products.reduce((total, product) => total + product.stats.sales, 0);
  
  await this.save();
};

// Méthode statique pour obtenir l'arborescence complète
categorySchema.statics.getTree = async function() {
  const categories = await this.find({}).sort('displayOrder');
  const tree = [];
  const map = {};

  categories.forEach(category => {
    map[category._id] = {
      ...category.toObject(),
      children: []
    };
  });

  categories.forEach(category => {
    if (category.parent && map[category.parent]) {
      map[category.parent].children.push(map[category._id]);
    } else {
      tree.push(map[category._id]);
    }
  });

  return tree;
};

// Méthode statique pour rechercher des catégories
categorySchema.statics.search = function(query) {
  return this.find(
    { $text: { $search: query } },
    { score: { $meta: 'textScore' } }
  ).sort({ score: { $meta: 'textScore' } });
};

module.exports = mongoose.model('Category', categorySchema); 