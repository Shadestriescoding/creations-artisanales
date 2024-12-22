import React, { useState } from 'react';
import styled from 'styled-components';
import { useToast } from '../../contexts/ToastContext';
import OrderDetails from '../components/orders/OrderDetails';

const OrdersContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.typography.titleFont};
`;

const FiltersBar = styled.div`
  background: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.shadows.small};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;
`;

const Select = styled.select`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: ${({ theme }) => theme.typography.body};
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.white};
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const SearchInput = styled.input`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: ${({ theme }) => theme.typography.body};
  width: 250px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const OrdersTable = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  overflow: hidden;

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th, td {
    padding: ${({ theme }) => theme.spacing.md};
    text-align: left;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }

  th {
    background-color: ${({ theme }) => theme.colors.backgroundAlt};
    font-weight: 600;
  }

  tr:hover {
    background-color: ${({ theme }) => theme.colors.backgroundAlt};
  }
`;

const StatusBadge = styled.span`
  padding: ${({ theme }) => theme.spacing.xxs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: ${({ theme }) => theme.typography.small};
  font-weight: 500;
  
  ${({ status, theme }) => {
    switch (status) {
      case 'pending':
        return `
          background-color: ${theme.colors.warning}20;
          color: ${theme.colors.warning};
        `;
      case 'processing':
        return `
          background-color: ${theme.colors.primary}20;
          color: ${theme.colors.primary};
        `;
      case 'shipped':
        return `
          background-color: ${theme.colors.success}20;
          color: ${theme.colors.success};
        `;
      case 'delivered':
        return `
          background-color: ${theme.colors.accent}20;
          color: ${theme.colors.accent};
        `;
      case 'cancelled':
        return `
          background-color: ${theme.colors.error}20;
          color: ${theme.colors.error};
        `;
      default:
        return '';
    }
  }}
`;

const ActionButton = styled.button`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border: none;
  background: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.small};
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

export const Orders = () => {
  const { showToast } = useToast();
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Données mockées pour les commandes avec plus de détails
  const mockOrders = [
    {
      id: "CMD001",
      date: "2024-01-20",
      customer: "Marie Dupont",
      email: "marie.dupont@example.com",
      phone: "06 12 34 56 78",
      total: "89.99",
      status: "pending",
      items: 3,
      subtotal: "84.99",
      shipping: "5.00",
      products: [
        {
          id: 1,
          name: "Bracelet en perles roses",
          price: 29.99,
          quantity: 2,
          image: "https://via.placeholder.com/80"
        },
        {
          id: 2,
          name: "Collier artisanal",
          price: 25.01,
          quantity: 1,
          image: "https://via.placeholder.com/80"
        }
      ]
    },
    {
      id: "CMD002",
      date: "2024-01-19",
      customer: "Jean Martin",
      email: "jean.martin@example.com",
      phone: "06 98 76 54 32",
      total: "145.50",
      status: "processing",
      items: 5,
      subtotal: "140.50",
      shipping: "5.00",
      products: [
        {
          id: 3,
          name: "Mobile origami",
          price: 45.50,
          quantity: 1,
          image: "https://via.placeholder.com/80"
        },
        {
          id: 4,
          name: "Set de décoration",
          price: 25.00,
          quantity: 4,
          image: "https://via.placeholder.com/80"
        }
      ]
    },
    // ... autres commandes ...
  ];

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      // TODO: Appel API pour mettre à jour le statut
      await new Promise(resolve => setTimeout(resolve, 500));
      showToast('Statut de la commande mis à jour', 'success');
    } catch (error) {
      showToast('Erreur lors de la mise à jour du statut', 'error');
    }
  };

  const handleViewDetails = (orderId) => {
    const order = mockOrders.find(o => o.id === orderId);
    setSelectedOrder(order);
  };

  const getStatusLabel = (status) => {
    const labels = {
      pending: 'En attente',
      processing: 'En traitement',
      shipped: 'Expédiée',
      delivered: 'Livrée',
      cancelled: 'Annulée'
    };
    return labels[status] || status;
  };

  const filteredOrders = mockOrders.filter(order => {
    if (filter !== 'all' && order.status !== filter) return false;
    if (search) {
      const searchLower = search.toLowerCase();
      return (
        order.id.toLowerCase().includes(searchLower) ||
        order.customer.toLowerCase().includes(searchLower) ||
        order.email.toLowerCase().includes(searchLower)
      );
    }
    return true;
  });

  return (
    <OrdersContainer>
      <Header>
        <Title>Gestion des commandes</Title>
      </Header>

      <FiltersBar>
        <Select 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">Tous les statuts</option>
          <option value="pending">En attente</option>
          <option value="processing">En traitement</option>
          <option value="shipped">Expédiée</option>
          <option value="delivered">Livrée</option>
          <option value="cancelled">Annulée</option>
        </Select>

        <SearchInput
          type="text"
          placeholder="Rechercher une commande..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </FiltersBar>

      <OrdersTable>
        <table>
          <thead>
            <tr>
              <th>N° Commande</th>
              <th>Date</th>
              <th>Client</th>
              <th>Articles</th>
              <th>Total</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{new Date(order.date).toLocaleDateString('fr-FR')}</td>
                <td>{order.customer}</td>
                <td>{order.items} article(s)</td>
                <td>{order.total}€</td>
                <td>
                  <StatusBadge status={order.status}>
                    {getStatusLabel(order.status)}
                  </StatusBadge>
                </td>
                <td>
                  <ActionButton onClick={() => handleViewDetails(order.id)}>
                    Détails
                  </ActionButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </OrdersTable>

      {selectedOrder && (
        <OrderDetails
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onUpdateStatus={handleStatusChange}
        />
      )}
    </OrdersContainer>
  );
}; 