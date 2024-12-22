import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const settingsService = {
  async getSettings() {
    const response = await axios.get(`${API_URL}/settings`);
    return response.data;
  },

  async updateSettings(settings) {
    const response = await axios.put(`${API_URL}/settings`, settings);
    return response.data;
  },

  async toggleMaintenanceMode(enabled) {
    const response = await axios.post(`${API_URL}/settings/maintenance`, { enabled });
    return response.data;
  }
}; 