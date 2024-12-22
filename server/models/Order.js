const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  customizations: [{
    name: String,
    value: String
  }]
});

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
    unique: true
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [orderItemSchema],
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'],
    default: 'pending'
  },
  shippingAddress: {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    postalCode: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true,
      default: 'France'
    },
    phone: String
  },
  billingAddress: {
    firstName: String,
    lastName: String,
    address: String,
    city: String,
    postalCode: String,
    country: String,
    phone: String
  },
  payment: {
    method: {
      type: String,
      enum: ['card', 'paypal', 'bank_transfer'],
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending'
    },
    transactionId: String,
    paidAt: Date
  },
  shipping: {
    method: {
      type: String,
      required: true
    },
    cost: {
      type: Number,
      required: true,
      default: 0
    },
    trackingNumber: String,
    carrier: String,
    estimatedDelivery: Date,
    shippedAt: Date,
    deliveredAt: Date
  },
  subtotal: {
    type: Number,
    required: true,
    min: 0
  },
  tax: {
    type: Number,
    required: true,
    default: 0
  },
  total: {
    type: Number,
    required: true,
    min: 0
  },
  notes: {
    customer: String,
    admin: String
  },
  history: [{
    status: {
      type: String,
      required: true
    },
    comment: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  refund: {
    amount: Number,
    reason: String,
    status: {
      type: String,
      enum: ['pending', 'completed', 'rejected'],
    },
    processedAt: Date,
    processedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  metadata: {
    source: String,
    userAgent: String,
    ipAddress: String
  }
}, {
  timestamps: true
});

// Index pour la recherche
orderSchema.index({
  orderNumber: 'text',
  'shippingAddress.firstName': 'text',
  'shippingAddress.lastName': 'text',
  'shippingAddress.email': 'text'
});

// Middleware pour générer le numéro de commande
orderSchema.pre('save', async function(next) {
  if (this.isNew) {
    const count = await this.constructor.countDocuments();
    const date = new Date();
    this.orderNumber = `CMD${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(count + 1).padStart(4, '0')}`;
  }
  next();
});

// Méthode pour calculer les totaux
orderSchema.methods.calculateTotals = function() {
  this.subtotal = this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  this.tax = this.subtotal * 0.20; // TVA 20%
  this.total = this.subtotal + this.tax + this.shipping.cost;
};

// Méthode pour ajouter un événement à l'historique
orderSchema.methods.addToHistory = function(status, comment, userId) {
  this.history.push({
    status,
    comment,
    createdBy: userId,
    createdAt: new Date()
  });
};

// Méthode pour mettre à jour le stock des produits
orderSchema.methods.updateProductStock = async function() {
  for (const item of this.items) {
    const product = await mongoose.model('Product').findById(item.product);
    if (product) {
      product.inventory.quantity -= item.quantity;
      await product.save();
    }
  }
};

// Méthode pour vérifier si une commande peut être annulée
orderSchema.methods.canBeCancelled = function() {
  return ['pending', 'processing'].includes(this.status);
};

// Méthode pour vérifier si une commande peut être remboursée
orderSchema.methods.canBeRefunded = function() {
  return ['delivered', 'shipped'].includes(this.status) && 
         this.payment.status === 'completed' &&
         (!this.refund || this.refund.status !== 'completed');
};

// Méthodes statiques pour les statistiques
orderSchema.statics.getStats = async function(startDate, endDate) {
  return this.aggregate([
    {
      $match: {
        createdAt: { $gte: startDate, $lte: endDate },
        status: { $nin: ['cancelled', 'refunded'] }
      }
    },
    {
      $group: {
        _id: null,
        totalOrders: { $sum: 1 },
        totalRevenue: { $sum: '$total' },
        averageOrderValue: { $avg: '$total' }
      }
    }
  ]);
};

// Méthode statique pour obtenir les meilleures ventes
orderSchema.statics.getBestSellers = async function(limit = 5) {
  return this.aggregate([
    {
      $unwind: '$items'
    },
    {
      $group: {
        _id: '$items.product',
        totalQuantity: { $sum: '$items.quantity' },
        totalRevenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } }
      }
    },
    {
      $sort: { totalQuantity: -1 }
    },
    {
      $limit: limit
    },
    {
      $lookup: {
        from: 'products',
        localField: '_id',
        foreignField: '_id',
        as: 'product'
      }
    },
    {
      $unwind: '$product'
    }
  ]);
};

module.exports = mongoose.model('Order', orderSchema); 