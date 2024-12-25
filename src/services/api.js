import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Services pour les produits
export const productService = {
  getAll: async () => {
    const response = await api.get('/products');
    return response.data;
  },

  create: async productData => {
    const formData = new FormData();
    Object.keys(productData).forEach(key => {
      if (key === 'categories') {
        formData.append(key, JSON.stringify(productData[key]));
      } else if (key === 'image' && productData[key]) {
        formData.append(key, productData[key]);
      } else {
        formData.append(key, productData[key]);
      }
    });

    const response = await api.post('/products', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  update: async (id, productData) => {
    const formData = new FormData();
    Object.keys(productData).forEach(key => {
      if (key === 'categories') {
        formData.append(key, JSON.stringify(productData[key]));
      } else if (key === 'image' && productData[key] instanceof File) {
        formData.append(key, productData[key]);
      } else if (key !== 'image') {
        formData.append(key, productData[key]);
      }
    });

    const response = await api.put(`/products/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  delete: async id => {
    await api.delete(`/products/${id}`);
  },
};

// Services pour les catégories
export const categoryService = {
  getAll: async () => {
    const response = await api.get('/categories');
    return response.data;
  },

  create: async categoryData => {
    const response = await api.post('/categories', categoryData);
    return response.data;
  },

  update: async (id, categoryData) => {
    const response = await api.put(`/categories/${id}`, categoryData);
    return response.data;
  },

  delete: async id => {
    await api.delete(`/categories/${id}`);
  },
};
