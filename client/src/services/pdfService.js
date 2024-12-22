import api from './api';

class PDFService {
  async downloadInvoice(orderId) {
    try {
      const response = await api.get(`/pdf/invoice/${orderId}`, {
        responseType: 'blob'
      });
      
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `facture-${orderId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      return true;
    } catch (error) {
      console.error('Erreur lors du téléchargement de la facture:', error);
      throw error;
    }
  }

  async downloadOrderConfirmation(orderId) {
    try {
      const response = await api.get(`/pdf/order-confirmation/${orderId}`, {
        responseType: 'blob'
      });
      
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `confirmation-${orderId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      return true;
    } catch (error) {
      console.error('Erreur lors du téléchargement de la confirmation:', error);
      throw error;
    }
  }
}

export default new PDFService(); 