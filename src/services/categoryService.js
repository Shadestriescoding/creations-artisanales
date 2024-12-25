import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const categoryService = {
  async getAllCategories(params = {}) {
    const queryParams = new URLSearchParams(params);
    const response = await axios.get(`${API_URL}/categories?${queryParams}`);
    return response.data;
  },

  async getCategoryBySlug(slug) {
    const response = await axios.get(`${API_URL}/categories/${slug}`);
    return response.data;
  },

  async createCategory(formData) {
    const response = await axios.post(`${API_URL}/categories`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async updateCategory(id, formData) {
    const response = await axios.put(`${API_URL}/categories/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async deleteCategory(id) {
    const response = await axios.delete(`${API_URL}/categories/${id}`);
    return response.data;
  },

  async updateOrder(orders) {
    const response = await axios.post(`${API_URL}/categories/order`, {
      orders,
    });
    return response.data;
  },

  async searchCategories(query) {
    const response = await axios.get(
      `${API_URL}/categories/search?q=${encodeURIComponent(query)}`
    );
    return response.data;
  },
};
