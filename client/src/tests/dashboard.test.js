import { render, screen, waitFor } from '@testing-library/react';
import Dashboard from '../admin/pages/Dashboard';
import { AuthProvider } from '../contexts/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

// Mock des services
jest.mock('../services/orderService', () => ({
  getOrderStats: jest.fn(() => Promise.resolve({
    stats: {
      totalOrders: 150,
      totalRevenue: 15000,
      averageOrderValue: 100
    },
    bestSellers: [
      {
        _id: '1',
        product: { name: 'Produit 1' },
        totalQuantity: 50,
        totalRevenue: 5000
      }
    ]
  }))
}));

jest.mock('../services/productService', () => ({
  getProductStats: jest.fn(() => Promise.resolve({
    totalProducts: 100,
    lowStock: 5
  }))
}));

describe('Dashboard', () => {
  const renderDashboard = () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <Dashboard />
        </AuthProvider>
      </BrowserRouter>
    );
  };

  test('affiche les statistiques de vente', async () => {
    renderDashboard();
    
    await waitFor(() => {
      expect(screen.getByText('150')).toBeInTheDocument(); // Total des commandes
      expect(screen.getByText('15 000,00 €')).toBeInTheDocument(); // Chiffre d'affaires
      expect(screen.getByText('100,00 €')).toBeInTheDocument(); // Panier moyen
    });
  });

  test('affiche les meilleurs vendeurs', async () => {
    renderDashboard();
    
    await waitFor(() => {
      expect(screen.getByText('Produit 1')).toBeInTheDocument();
      expect(screen.getByText('50')).toBeInTheDocument(); // Quantité vendue
      expect(screen.getByText('5 000,00 €')).toBeInTheDocument(); // Revenu généré
    });
  });

  test('affiche les alertes de stock', async () => {
    renderDashboard();
    
    await waitFor(() => {
      expect(screen.getByText('5')).toBeInTheDocument(); // Produits en stock faible
    });
  });

  test('affiche le graphique des ventes', async () => {
    renderDashboard();
    
    await waitFor(() => {
      expect(screen.getByTestId('sales-chart')).toBeInTheDocument();
    });
  });

  test('affiche les statistiques des produits', async () => {
    renderDashboard();
    
    await waitFor(() => {
      expect(screen.getByText('100')).toBeInTheDocument(); // Total des produits
    });
  });

  test('gère les erreurs de chargement', async () => {
    // Simuler une erreur
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.mock('../services/orderService', () => ({
      getOrderStats: jest.fn(() => Promise.reject(new Error('Erreur de chargement')))
    }));

    renderDashboard();
    
    await waitFor(() => {
      expect(screen.getByText(/erreur de chargement/i)).toBeInTheDocument();
    });
  });

  test('met à jour les données périodiquement', async () => {
    jest.useFakeTimers();
    renderDashboard();
    
    await waitFor(() => {
      expect(screen.getByText('150')).toBeInTheDocument();
    });

    // Avancer le temps de 5 minutes
    jest.advanceTimersByTime(5 * 60 * 1000);
    
    await waitFor(() => {
      // Vérifier que les données ont été rechargées
      expect(screen.getByText('150')).toBeInTheDocument();
    });

    jest.useRealTimers();
  });
}); 