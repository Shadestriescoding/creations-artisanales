const Order = require('../models/Order');
const Product = require('../models/Product');
const { validateOrder, validateOrderUpdate } = require('../validators/orderValidator');
const { sendOrderConfirmation, sendOrderStatusUpdate } = require('../services/emailService');
const { createPDF } = require('../services/pdfService');

exports.createOrder = async (req, res) => {
  try {
    const { error } = validateOrder(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Vérifier le stock des produits
    for (const item of req.body.items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(400).json({ message: `Produit non trouvé: ${item.product}` });
      }
      if (product.inventory.quantity < item.quantity && !product.inventory.allowBackorder) {
        return res.status(400).json({ 
          message: `Stock insuffisant pour ${product.name}. Disponible: ${product.inventory.quantity}`
        });
      }
    }

    const order = new Order({
      ...req.body,
      metadata: {
        ...req.body.metadata,
        ipAddress: req.ip,
        userAgent: req.headers['user-agent']
      }
    });

    // Calculer les totaux
    order.calculateTotals();

    // Ajouter l'événement initial à l'historique
    order.addToHistory('pending', 'Commande créée', req.user?._id);

    await order.save();

    // Mettre à jour le stock des produits
    await order.updateProductStock();

    // Envoyer l'email de confirmation
    await sendOrderConfirmation(order);

    res.status(201).json(order);
  } catch (error) {
    console.error('Erreur lors de la création de la commande:', error);
    res.status(500).json({ message: 'Erreur lors de la création de la commande' });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sort = '-createdAt',
      status,
      customer,
      startDate,
      endDate,
      search
    } = req.query;

    const query = {};

    if (status) query.status = status;
    if (customer) query.customer = customer;
    
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    if (search) {
      query.$or = [
        { orderNumber: { $regex: search, $options: 'i' } },
        { 'shippingAddress.firstName': { $regex: search, $options: 'i' } },
        { 'shippingAddress.lastName': { $regex: search, $options: 'i' } }
      ];
    }

    const orders = await Order.find(query)
      .populate('customer', 'firstName lastName email')
      .populate('items.product', 'name images')
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Order.countDocuments(query);

    res.json({
      orders,
      total,
      pages: Math.ceil(total / limit),
      currentPage: Number(page)
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des commandes:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des commandes' });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('customer', 'firstName lastName email')
      .populate('items.product', 'name images price')
      .populate('history.createdBy', 'firstName lastName');

    if (!order) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }

    res.json(order);
  } catch (error) {
    console.error('Erreur lors de la récupération de la commande:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération de la commande' });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const { error } = validateOrderUpdate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }

    // Vérifier les transitions de statut valides
    if (req.body.status) {
      const validTransitions = {
        pending: ['processing', 'cancelled'],
        processing: ['shipped', 'cancelled'],
        shipped: ['delivered', 'returned'],
        delivered: ['returned'],
        cancelled: [],
        returned: ['refunded']
      };

      if (!validTransitions[order.status].includes(req.body.status)) {
        return res.status(400).json({
          message: `Transition de statut invalide: ${order.status} -> ${req.body.status}`
        });
      }

      // Actions spécifiques selon le statut
      switch (req.body.status) {
        case 'shipped':
          if (!req.body.shipping?.trackingNumber) {
            return res.status(400).json({
              message: 'Numéro de suivi requis pour le statut expédié'
            });
          }
          order.shipping.shippedAt = new Date();
          break;

        case 'delivered':
          order.shipping.deliveredAt = new Date();
          break;

        case 'cancelled':
          // Restaurer le stock
          for (const item of order.items) {
            const product = await Product.findById(item.product);
            if (product) {
              product.inventory.quantity += item.quantity;
              await product.save();
            }
          }
          break;

        case 'refunded':
          if (!req.body.refund?.amount) {
            return res.status(400).json({
              message: 'Montant du remboursement requis'
            });
          }
          order.refund = {
            ...req.body.refund,
            processedAt: new Date(),
            processedBy: req.user._id
          };
          break;
      }
    }

    // Mettre à jour la commande
    Object.assign(order, req.body);

    // Ajouter l'événement à l'historique
    if (req.body.status) {
      order.addToHistory(req.body.status, req.body.notes?.admin, req.user._id);
    }

    await order.save();

    // Envoyer une notification par email
    if (req.body.status) {
      await sendOrderStatusUpdate(order);
    }

    res.json(order);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la commande:', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la commande' });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }

    // Vérifier si la commande peut être supprimée
    if (!['cancelled', 'refunded'].includes(order.status)) {
      return res.status(400).json({
        message: 'Seules les commandes annulées ou remboursées peuvent être supprimées'
      });
    }

    await order.remove();
    res.json({ message: 'Commande supprimée avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de la commande:', error);
    res.status(500).json({ message: 'Erreur lors de la suppression de la commande' });
  }
};

exports.generateInvoice = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('customer', 'firstName lastName email')
      .populate('items.product', 'name price');

    if (!order) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }

    const pdfBuffer = await createPDF('invoice', { order });

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="facture-${order.orderNumber}.pdf"`
    });

    res.send(pdfBuffer);
  } catch (error) {
    console.error('Erreur lors de la génération de la facture:', error);
    res.status(500).json({ message: 'Erreur lors de la génération de la facture' });
  }
};

exports.getOrderStats = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const stats = await Order.getStats(
      startDate ? new Date(startDate) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      endDate ? new Date(endDate) : new Date()
    );

    const bestSellers = await Order.getBestSellers(5);

    res.json({
      stats: stats[0] || {
        totalOrders: 0,
        totalRevenue: 0,
        averageOrderValue: 0
      },
      bestSellers
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des statistiques' });
  }
}; 