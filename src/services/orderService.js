import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const orderService = {
  async createOrder(orderData) {
    const response = await axios.post(`${API_URL}/orders`, orderData);
    return response.data;
  },

  async getAllOrders(params = {}) {
    const queryParams = new URLSearchParams(params);
    const response = await axios.get(`${API_URL}/orders?${queryParams}`);
    return response.data;
  },

  async getMyOrders(params = {}) {
    const queryParams = new URLSearchParams(params);
    const response = await axios.get(`${API_URL}/orders/my-orders?${queryParams}`);
    return response.data;
  },

  async getOrderById(id) {
    const response = await axios.get(`${API_URL}/orders/${id}`);
    return response.data;
  },

  async updateOrder(id, orderData) {
    const response = await axios.put(`${API_URL}/orders/${id}`, orderData);
    return response.data;
  },

  async deleteOrder(id) {
    const response = await axios.delete(`${API_URL}/orders/${id}`);
    return response.data;
  },

  async getOrderStats(params = {}) {
    const queryParams = new URLSearchParams(params);
    const response = await axios.get(`${API_URL}/orders/stats?${queryParams}`);
    return response.data;
  },

  async downloadInvoice(id) {
    const response = await axios.get(`${API_URL}/orders/${id}/invoice`, {
      responseType: 'blob'
    });
    
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `facture-${id}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  },

  // Méthodes utilitaires
  getStatusLabel(status) {
    const statusLabels = {
      pending: 'En attente',
      processing: 'En traitement',
      shipped: 'Expédiée',
      delivered: 'Livrée',
      cancelled: 'Annulée',
      refunded: 'Remboursée'
    };
    return statusLabels[status] || status;
  },

  getStatusColor(status) {
    const statusColors = {
      pending: 'warning',
      processing: 'info',
      shipped: 'primary',
      delivered: 'success',
      cancelled: 'error',
      refunded: 'default'
    };
    return statusColors[status] || 'default';
  },

  getPaymentMethodLabel(method) {
    const methodLabels = {
      card: 'Carte bancaire',
      paypal: 'PayPal',
      bank_transfer: 'Virement bancaire'
    };
    return methodLabels[method] || method;
  },

  formatPrice(amount) {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  },

  formatDate(date) {
    return new Intl.DateTimeFormat('fr-FR', {
      dateStyle: 'long',
      timeStyle: 'short'
    }).format(new Date(date));
  }
}; 