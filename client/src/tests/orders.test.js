import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Orders from '../admin/pages/Orders';
import OrderDetails from '../admin/components/orders/OrderDetails';
import { AuthProvider } from '../contexts/AuthContext';
import { ToastProvider } from '../contexts/ToastContext';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

// Mock des services
const mockOrders = [
  {
    _id: '1',
    orderNumber: 'CMD202301001',
    customer: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com'
    },
    status: 'pending',
    total: 199.99,
    createdAt: '2023-01-01T12:00:00Z',
    items: [
      {
        product: {
          name: 'Produit Test',
          price: 99.99
        },
        quantity: 2
      }
    ]
  }
];

jest.mock('../services/orderService', () => ({
  getAllOrders: jest.fn(() => Promise.resolve({
    orders: mockOrders,
    total: 1,
    pages: 1,
    currentPage: 1
  })),
  updateOrder: jest.fn(() => Promise.resolve(mockOrders[0])),
  downloadInvoice: jest.fn(() => Promise.resolve()),
  getOrderById: jest.fn(() => Promise.resolve(mockOrders[0]))
}));

describe('Orders Management', () => {
  const renderOrders = () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <ToastProvider>
            <Orders />
          </ToastProvider>
        </AuthProvider>
      </BrowserRouter>
    );
  };

  const renderOrderDetails = () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <ToastProvider>
            <OrderDetails order={mockOrders[0]} />
          </ToastProvider>
        </AuthProvider>
      </BrowserRouter>
    );
  };

  test('affiche la liste des commandes', async () => {
    renderOrders();
    
    await waitFor(() => {
      expect(screen.getByText('CMD202301001')).toBeInTheDocument();
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('199,99 €')).toBeInTheDocument();
    });
  });

  test('permet de filtrer les commandes', async () => {
    renderOrders();
    
    const searchInput = screen.getByPlaceholderText(/rechercher/i);
    fireEvent.change(searchInput, { target: { value: 'CMD202301001' } });
    
    await waitFor(() => {
      expect(screen.getByText('CMD202301001')).toBeInTheDocument();
    });
  });

  test('permet de changer le statut d\'une commande', async () => {
    renderOrderDetails();
    
    const statusSelect = screen.getByLabelText(/statut/i);
    fireEvent.change(statusSelect, { target: { value: 'processing' } });
    
    await waitFor(() => {
      expect(screen.getByText(/mise à jour effectuée/i)).toBeInTheDocument();
    });
  });

  test('permet de télécharger une facture', async () => {
    renderOrderDetails();
    
    const downloadButton = screen.getByText(/télécharger la facture/i);
    fireEvent.click(downloadButton);
    
    await waitFor(() => {
      expect(screen.getByText(/téléchargement réussi/i)).toBeInTheDocument();
    });
  });

  test('affiche les détails d\'une commande', async () => {
    renderOrderDetails();
    
    await waitFor(() => {
      expect(screen.getByText('Produit Test')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument(); // Quantité
      expect(screen.getByText('99,99 €')).toBeInTheDocument(); // Prix unitaire
    });
  });

  test('gère les erreurs de chargement', async () => {
    // Simuler une erreur
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.mock('../services/orderService', () => ({
      getAllOrders: jest.fn(() => Promise.reject(new Error('Erreur de chargement')))
    }));

    renderOrders();
    
    await waitFor(() => {
      expect(screen.getByText(/erreur de chargement/i)).toBeInTheDocument();
    });
  });

  test('permet la pagination', async () => {
    renderOrders();
    
    const nextPageButton = screen.getByLabelText(/page suivante/i);
    fireEvent.click(nextPageButton);
    
    await waitFor(() => {
      expect(screen.getByText('Page 2')).toBeInTheDocument();
    });
  });

  test('permet le tri des commandes', async () => {
    renderOrders();
    
    const sortButton = screen.getByText(/trier par date/i);
    fireEvent.click(sortButton);
    
    await waitFor(() => {
      // Vérifier que les commandes sont triées
      const dates = screen.getAllByTestId('order-date')
        .map(el => new Date(el.textContent));
      expect(dates).toBeSorted();
    });
  });
}); 