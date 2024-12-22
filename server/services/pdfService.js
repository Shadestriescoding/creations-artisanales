const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const config = require('../config');

class PDFService {
  constructor() {
    this.templates = {
      invoice: this.generateInvoice.bind(this),
      orderConfirmation: this.generateOrderConfirmation.bind(this)
    };
  }

  async createPDF(template, data) {
    if (!this.templates[template]) {
      throw new Error(`Template ${template} non trouvé`);
    }

    const doc = new PDFDocument({
      size: 'A4',
      margin: 50,
      info: {
        Title: `${template}-${Date.now()}`,
        Author: 'La Cabane d\'Eva'
      }
    });

    const chunks = [];
    doc.on('data', chunk => chunks.push(chunk));
    
    await this.templates[template](doc, data);
    doc.end();

    return Buffer.concat(chunks);
  }

  async generateInvoice(doc, { order }) {
    // En-tête
    this.addHeader(doc, 'FACTURE');
    doc.moveDown();

    // Informations de la facture
    doc.fontSize(10)
      .text(`Facture N° : ${order.orderNumber}`)
      .text(`Date : ${new Date(order.createdAt).toLocaleDateString('fr-FR')}`)
      .moveDown();

    // Informations client
    doc.fontSize(12).text('Informations client', { underline: true })
      .fontSize(10)
      .text(`${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`)
      .text(order.shippingAddress.address)
      .text(`${order.shippingAddress.postalCode} ${order.shippingAddress.city}`)
      .text(order.shippingAddress.country)
      .moveDown();

    // Tableau des articles
    this.addItemsTable(doc, order.items);
    doc.moveDown();

    // Résumé des totaux
    const totalsStartX = 350;
    doc.fontSize(10)
      .text('Sous-total :', totalsStartX)
      .text(`${this.formatPrice(order.subtotal)}`, 450, doc.y - doc.currentLineHeight(), { align: 'right' })
      .text('TVA (20%) :', totalsStartX)
      .text(`${this.formatPrice(order.tax)}`, 450, doc.y - doc.currentLineHeight(), { align: 'right' })
      .text('Frais de livraison :', totalsStartX)
      .text(`${this.formatPrice(order.shipping.cost)}`, 450, doc.y - doc.currentLineHeight(), { align: 'right' })
      .moveDown(0.5)
      .fontSize(12)
      .text('Total :', totalsStartX)
      .text(`${this.formatPrice(order.total)}`, 450, doc.y - doc.currentLineHeight(), { align: 'right' })
      .moveDown();

    // Informations de paiement
    doc.fontSize(10)
      .text('Mode de paiement : ' + this.getPaymentMethodLabel(order.payment.method))
      .text('Statut du paiement : ' + this.getPaymentStatusLabel(order.payment.status))
      .moveDown();

    // Pied de page
    this.addFooter(doc);
  }

  async generateOrderConfirmation(doc, { order }) {
    // En-tête
    this.addHeader(doc, 'CONFIRMATION DE COMMANDE');
    doc.moveDown();

    // Informations de la commande
    doc.fontSize(10)
      .text(`Commande N° : ${order.orderNumber}`)
      .text(`Date : ${new Date(order.createdAt).toLocaleDateString('fr-FR')}`)
      .moveDown();

    // Message de remerciement
    doc.fontSize(12)
      .text('Merci pour votre commande !', { align: 'center' })
      .moveDown()
      .fontSize(10)
      .text('Nous vous remercions pour votre confiance. Votre commande a bien été enregistrée et sera traitée dans les plus brefs délais.')
      .moveDown();

    // Récapitulatif de la commande
    doc.fontSize(12).text('Récapitulatif de votre commande', { underline: true })
      .moveDown();

    // Tableau des articles
    this.addItemsTable(doc, order.items);
    doc.moveDown();

    // Informations de livraison
    doc.fontSize(12).text('Adresse de livraison', { underline: true })
      .fontSize(10)
      .text(`${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`)
      .text(order.shippingAddress.address)
      .text(`${order.shippingAddress.postalCode} ${order.shippingAddress.city}`)
      .text(order.shippingAddress.country)
      .moveDown();

    // Mode de livraison
    doc.text(`Mode de livraison : ${order.shipping.method}`)
      .text(`Délai de livraison estimé : ${this.formatDate(order.shipping.estimatedDelivery)}`)
      .moveDown();

    // Total
    doc.fontSize(12)
      .text(`Total : ${this.formatPrice(order.total)}`, { align: 'right' })
      .moveDown();

    // Instructions
    doc.fontSize(10)
      .text('Vous recevrez un email de confirmation lorsque votre commande sera expédiée.')
      .moveDown();

    // Pied de page
    this.addFooter(doc);
  }

  addHeader(doc, title) {
    // Logo
    const logoPath = path.join(__dirname, '../assets/logo.png');
    if (fs.existsSync(logoPath)) {
      doc.image(logoPath, 50, 45, { width: 100 });
    }

    // Titre
    doc.fontSize(20)
      .text(title, 200, 60, { align: 'right' });

    // Informations de l'entreprise
    doc.fontSize(10)
      .text('La Cabane d\'Eva', 200, 90, { align: 'right' })
      .text('123 rue des Artisans', { align: 'right' })
      .text('75000 Paris', { align: 'right' })
      .text('contact@lacabanedeva.fr', { align: 'right' })
      .text('SIRET: 123 456 789 00000', { align: 'right' });

    // Ligne de séparation
    doc.moveTo(50, 150)
      .lineTo(550, 150)
      .stroke();
  }

  addFooter(doc) {
    const bottomOfPage = doc.page.height - 100;

    doc.fontSize(8)
      .text('La Cabane d\'Eva - SIRET: 123 456 789 00000', 50, bottomOfPage, { align: 'center' })
      .text('123 rue des Artisans, 75000 Paris', { align: 'center' })
      .text('contact@lacabanedeva.fr - www.lacabanedeva.fr', { align: 'center' });
  }

  addItemsTable(doc, items) {
    const tableTop = doc.y + 20;
    const tableHeaders = ['Article', 'Quantité', 'Prix unitaire', 'Total'];
    const columnWidths = [250, 70, 100, 80];
    
    // En-têtes
    let xPosition = 50;
    doc.fontSize(10);
    tableHeaders.forEach((header, i) => {
      doc.text(header, xPosition, tableTop, { width: columnWidths[i], align: i > 0 ? 'right' : 'left' });
      xPosition += columnWidths[i];
    });

    // Ligne de séparation
    doc.moveTo(50, tableTop + 15)
      .lineTo(550, tableTop + 15)
      .stroke();

    // Articles
    let yPosition = tableTop + 30;
    items.forEach(item => {
      xPosition = 50;
      
      // Nom du produit
      doc.text(item.product.name, xPosition, yPosition, { width: columnWidths[0] });
      xPosition += columnWidths[0];

      // Quantité
      doc.text(item.quantity.toString(), xPosition, yPosition, { width: columnWidths[1], align: 'right' });
      xPosition += columnWidths[1];

      // Prix unitaire
      doc.text(this.formatPrice(item.price), xPosition, yPosition, { width: columnWidths[2], align: 'right' });
      xPosition += columnWidths[2];

      // Total
      doc.text(this.formatPrice(item.price * item.quantity), xPosition, yPosition, { width: columnWidths[3], align: 'right' });

      yPosition += 20;
    });

    // Ligne de séparation finale
    doc.moveTo(50, yPosition)
      .lineTo(550, yPosition)
      .stroke();

    doc.y = yPosition + 10;
  }

  formatPrice(amount) {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  }

  formatDate(date) {
    return new Intl.DateTimeFormat('fr-FR', {
      dateStyle: 'long'
    }).format(new Date(date));
  }

  getPaymentMethodLabel(method) {
    const labels = {
      card: 'Carte bancaire',
      paypal: 'PayPal',
      bank_transfer: 'Virement bancaire'
    };
    return labels[method] || method;
  }

  getPaymentStatusLabel(status) {
    const labels = {
      pending: 'En attente',
      completed: 'Payé',
      failed: 'Échoué',
      refunded: 'Remboursé'
    };
    return labels[status] || status;
  }
}

module.exports = new PDFService(); 