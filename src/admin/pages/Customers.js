import React, { useState } from 'react';
import styled from 'styled-components';

const CustomersContainer = styled.div`
  padding: ${props => props.theme.spacing.lg};
`;

const FiltersBar = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.xl};
  flex-wrap: wrap;
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

const CustomersTable = styled.div`
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

const CustomerDetails = styled.div`
  padding: ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.backgroundAlt}33;
  margin-top: -1px;
  border-bottom: 1px solid ${props => props.theme.colors.backgroundAlt};
`;

const OrdersList = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing.sm};
  margin-top: ${props => props.theme.spacing.sm};
`;

const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.theme.spacing.sm};
  background: white;
  border-radius: ${props => props.theme.borderRadius.medium};
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

const StatusBadge = styled.span`
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.small};
  font-size: 0.85rem;
  font-weight: 500;
  background: ${props => props.theme.colors.success}22;
  color: ${props => props.theme.colors.success};
`;

export const Customers = () => {
  const [expandedCustomer, setExpandedCustomer] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Ces données seront remplacées par des vraies données de l'API
  const mockCustomers = [
    {
      id: "CST-001",
      name: "Marie Dupont",
      email: "marie.d@example.com",
      phone: "06 12 34 56 78",
      joinDate: "2023-12-15",
      status: "active",
      totalOrders: 5,
      totalSpent: "399.95",
      recentOrders: [
        {
          id: "ORD-001",
          date: "2024-01-18",
          total: "75.99",
          status: "processing"
        },
        {
          id: "ORD-002",
          date: "2024-01-10",
          total: "120.00",
          status: "completed"
        }
      ]
    },
    {
      id: "CST-002",
      name: "Sophie Lambert",
      email: "sophie.l@example.com",
      phone: "06 98 76 54 32",
      joinDate: "2024-01-05",
      status: "active",
      totalOrders: 1,
      totalSpent: "120.00",
      recentOrders: [
        {
          id: "ORD-003",
          date: "2024-01-17",
          total: "120.00",
          status: "shipped"
        }
      ]
    }
  ];

  const toggleCustomerDetails = (customerId) => {
    setExpandedCustomer(expandedCustomer === customerId ? null : customerId);
  };

  return (
    <CustomersContainer>
      <FiltersBar>
        <SearchInput
          type="text"
          placeholder="Rechercher un client..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <FilterSelect
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="all">Tous les clients</option>
          <option value="active">Clients actifs</option>
          <option value="inactive">Clients inactifs</option>
          <option value="vip">Clients VIP</option>
        </FilterSelect>
      </FiltersBar>

      <CustomersTable>
        <table>
          <thead>
            <tr>
              <th>Client ID</th>
              <th>Nom</th>
              <th>Contact</th>
              <th>Date d'inscription</th>
              <th>Total commandes</th>
              <th>Total dépensé</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockCustomers.map(customer => (
              <React.Fragment key={customer.id}>
                <tr>
                  <td>{customer.id}</td>
                  <td>{customer.name}</td>
                  <td>
                    <div>{customer.email}</div>
                    <div style={{ color: '#666', fontSize: '0.9em' }}>{customer.phone}</div>
                  </td>
                  <td>{customer.joinDate}</td>
                  <td>{customer.totalOrders}</td>
                  <td>{customer.totalSpent}€</td>
                  <td>
                    <ActionButton onClick={() => toggleCustomerDetails(customer.id)}>
                      {expandedCustomer === customer.id ? '🔼' : '🔽'}
                    </ActionButton>
                    <ActionButton>✏️</ActionButton>
                  </td>
                </tr>
                {expandedCustomer === customer.id && (
                  <tr>
                    <td colSpan="7">
                      <CustomerDetails>
                        <h4>Commandes récentes</h4>
                        <OrdersList>
                          {customer.recentOrders.map(order => (
                            <OrderItem key={order.id}>
                              <div>
                                <strong>{order.id}</strong>
                                <span style={{ margin: '0 10px' }}>•</span>
                                {order.date}
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span>{order.total}€</span>
                                <StatusBadge>{order.status}</StatusBadge>
                              </div>
                            </OrderItem>
                          ))}
                        </OrdersList>
                      </CustomerDetails>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </CustomersTable>
    </CustomersContainer>
  );
}; 