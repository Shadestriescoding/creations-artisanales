const pdfService = require('../services/pdfService');
const Order = require('../models/Order');
const ApiError = require('../utils/ApiError');

class PDFController {
  async generateInvoice(req, res, next) {
    try {
      const { orderId } = req.params;
      
      const order = await Order.findById(orderId)
        .populate('items.product')
        .populate('user', 'email');

      if (!order) {
        throw new ApiError(404, 'Commande non trouvée');
      }

      // Vérifier que l'utilisateur a le droit d'accéder à cette facture
      if (!req.user.isAdmin && order.user.toString() !== req.user._id.toString()) {
        throw new ApiError(403, 'Accès non autorisé');
      }

      const pdfBuffer = await pdfService.createPDF('invoice', { order });

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=facture-${order.orderNumber}.pdf`);
      
      res.send(pdfBuffer);
    } catch (error) {
      next(error);
    }
  }

  async generateOrderConfirmation(req, res, next) {
    try {
      const { orderId } = req.params;
      
      const order = await Order.findById(orderId)
        .populate('items.product')
        .populate('user', 'email');

      if (!order) {
        throw new ApiError(404, 'Commande non trouvée');
      }

      // Vérifier que l'utilisateur a le droit d'accéder à cette confirmation
      if (!req.user.isAdmin && order.user.toString() !== req.user._id.toString()) {
        throw new ApiError(403, 'Accès non autorisé');
      }

      const pdfBuffer = await pdfService.createPDF('orderConfirmation', { order });

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=confirmation-${order.orderNumber}.pdf`);
      
      res.send(pdfBuffer);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PDFController(); 