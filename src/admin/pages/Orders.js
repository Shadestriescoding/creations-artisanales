import React, { useState } from 'react';
import styled from 'styled-components';

const OrdersContainer = styled.div`
  padding: ${props => props.theme.spacing.lg};
`;

const FiltersBar = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.xl};
  flex-wrap: wrap;
`;

const FilterSelect = styled.select`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  border: 1px solid ${props => props.theme.colors.backgroundAlt};
  border-radius: ${props => props.theme.borderRadius.medium};
  background-color: white;
  min-width: 200px;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primary}33;
  }
`;

const SearchInput = styled.input`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  border: 1px solid ${props => props.theme.colors.backgroundAlt};
  border-radius: ${props => props.theme.borderRadius.medium};
  min-width: 300px;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primary}33;
  }
`;

const OrdersTable = styled.div`
  background: white;
  border-radius: ${props => props.theme.borderRadius.large};
  box-shadow: ${props => props.theme.shadows.medium};
  overflow: hidden;
  
  table {
    width: 100%;
    border-collapse: collapse;
    
    th, td {
      padding: ${props => props.theme.spacing.md};
      text-align: left;
      border-bottom: 1px solid ${props => props.theme.colors.backgroundAlt};
    }
    
    th {
      background: ${props => props.theme.colors.backgroundAlt};
      font-weight: 600;
      color: ${props => props.theme.colors.text};
    }
    
    tr:hover {
      background: ${props => props.theme.colors.backgroundAlt}33;
    }
  }
`;

const StatusBadge = styled.span`
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.small};
  font-size: 0.85rem;
  font-weight: 500;
  
  ${props => {
    switch (props.status) {
      case 'pending':
        return `
          background: ${props.theme.colors.warning}22;
          color: ${props.theme.colors.warning};
        `;
      case 'processing':
        return `
          background: ${props.theme.colors.primary}22;
          color: ${props.theme.colors.primary};
        `;
      case 'shipped':
        return `
          background: ${props.theme.colors.success}22;
          color: ${props.theme.colors.success};
        `;
      case 'cancelled':
        return `
          background: ${props.theme.colors.error}22;
          color: ${props.theme.colors.error};
        `;
      default:
        return `
          background: ${props.theme.colors.textLight}22;
          color: ${props.theme.colors.textLight};
        `;
    }
  }}
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.primary};
  cursor: pointer;
  padding: ${props => props.theme.spacing.xs};
  border-radius: ${props => props.theme.borderRadius.small};
  transition: ${props => props.theme.transitions.fast};
  
  &:hover {
    background: ${props => props.theme.colors.backgroundAlt};
  }
  
  &:not(:last-child) {
    margin-right: ${props => props.theme.spacing.xs};
  }
`;

const OrderDetails = styled.div`
  padding: ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.backgroundAlt}33;
  margin-top: -1px;
  border-bottom: 1px solid ${props => props.theme.colors.backgroundAlt};
`;

const ProductList = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing.sm};
  margin-top: ${props => props.theme.spacing.sm};
`;

const ProductItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.sm};
  background: white;
  border-radius: ${props => props.theme.borderRadius.medium};
  
  img {
    width: 50px;
    height: 50px;
    border-radius: ${props => props.theme.borderRadius.small};
    object-fit: cover;
  }
  
  .details {
    flex: 1;
    
    .name {
      font-weight: 500;
    }
    
    .price {
      color: ${props => props.theme.colors.textLight};
      font-size: 0.9rem;
    }
  }
  
  .quantity {
    color: ${props => props.theme.colors.textLight};
    font-weight: 500;
  }
`;

export const Orders = () => {
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('all');

  // Ces données seront remplacées par des vraies données de l'API
  const mockOrders = [
    {
      id: "ORD-001",
      date: "2024-01-18",
      customer: {
        name: "Marie Dupont",
        email: "marie.d@example.com"
      },
      status: "processing",
      total: "75.99",
      products: [
        {
          id: 1,
          name: "Bracelet en perles roses",
          price: 25.99,
          quantity: 2,
          image: "https://via.placeholder.com/50"
        },
        {
          id: 2,
          name: "Collier artisanal doré",
          price: 24.01,
          quantity: 1,
          image: "https://via.placeholder.com/50"
        }
      ]
    },
    {
      id: "ORD-002",
      date: "2024-01-17",
      customer: {
        name: "Sophie Lambert",
        email: "sophie.l@example.com"
      },
      status: "shipped",
      total: "120.00",
      products: [
        {
          id: 3,
          name: "Boucles d'oreilles fleuries",
          price: 120.00,
          quantity: 1,
          image: "https://via.placeholder.com/50"
        }
      ]
    }
  ];

  const getStatusLabel = (status) => {
    const labels = {
      pending: 'En attente',
      processing: 'En traitement',
      shipped: 'Expédié',
      cancelled: 'Annulé'
    };
    return labels[status] || status;
  };

  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <OrdersContainer>
      <FiltersBar>
        <FilterSelect 
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">Tous les statuts</option>
          <option value="pending">En attente</option>
          <option value="processing">En traitement</option>
          <option value="shipped">Expédié</option>
          <option value="cancelled">Annulé</option>
        </FilterSelect>

        <FilterSelect
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
        >
          <option value="all">Toutes les dates</option>
          <option value="today">Aujourd'hui</option>
          <option value="week">Cette semaine</option>
          <option value="month">Ce mois</option>
        </FilterSelect>

        <SearchInput
          type="text"
          placeholder="Rechercher une commande..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </FiltersBar>

      <OrdersTable>
        <table>
          <thead>
            <tr>
              <th>Commande</th>
              <th>Date</th>
              <th>Client</th>
              <th>Total</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockOrders.map(order => (
              <React.Fragment key={order.id}>
                <tr>
                  <td>{order.id}</td>
                  <td>{order.date}</td>
                  <td>
                    <div>{order.customer.name}</div>
                    <div style={{ color: '#666', fontSize: '0.9em' }}>{order.customer.email}</div>
                  </td>
                  <td>{order.total}€</td>
                  <td>
                    <StatusBadge status={order.status}>
                      {getStatusLabel(order.status)}
                    </StatusBadge>
                  </td>
                  <td>
                    <ActionButton onClick={() => toggleOrderDetails(order.id)}>
                      {expandedOrder === order.id ? '🔼' : '🔽'}
                    </ActionButton>
                    <ActionButton>✏️</ActionButton>
                  </td>
                </tr>
                {expandedOrder === order.id && (
                  <tr>
                    <td colSpan="6">
                      <OrderDetails>
                        <h4>Détails de la commande</h4>
                        <ProductList>
                          {order.products.map(product => (
                            <ProductItem key={product.id}>
                              <img src={product.image} alt={product.name} />
                              <div className="details">
                                <div className="name">{product.name}</div>
                                <div className="price">{product.price}€</div>
                              </div>
                              <div className="quantity">x{product.quantity}</div>
                            </ProductItem>
                          ))}
                        </ProductList>
                      </OrderDetails>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </OrdersTable>
    </OrdersContainer>
  );
}; 