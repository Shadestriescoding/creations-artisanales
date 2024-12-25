import React, { useState } from 'react';
import styled from 'styled-components';

const CustomersContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.typography.titleFont};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const CustomersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

const CustomerCard = styled.div`
  background: ${({ theme }) => theme.colors.cardBackground};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.md};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

const CustomerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const CustomerName = styled.h3`
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

const CustomerStatus = styled.span`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: 0.9em;
  background: ${({ status, theme }) => {
    switch (status) {
      case 'active':
        return theme.colors.success + '33';
      case 'inactive':
        return theme.colors.error + '33';
      default:
        return theme.colors.backgroundAlt;
    }
  }};
  color: ${({ status, theme }) => {
    switch (status) {
      case 'active':
        return theme.colors.success;
      case 'inactive':
        return theme.colors.error;
      default:
        return theme.colors.text;
    }
  }};
`;

const CustomerDetails = styled.div`
  margin-top: ${({ theme }) => theme.spacing.sm};
  padding-top: ${({ theme }) => theme.spacing.sm};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const CustomerInfo = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  margin: ${({ theme }) => theme.spacing.xs} 0;
  font-size: 0.9em;
`;

const Customers = () => {
  const [customers] = useState([
    {
      id: 1,
      name: 'Alice Martin',
      email: 'alice.martin@example.com',
      phone: '06 12 34 56 78',
      status: 'active',
      orders: 5,
      totalSpent: '249.99€'
    },
    {
      id: 2,
      name: 'Paul Dubois',
      email: 'paul.dubois@example.com',
      phone: '06 98 76 54 32',
      status: 'active',
      orders: 3,
      totalSpent: '149.99€'
    },
    {
      id: 3,
      name: 'Marie Lambert',
      email: 'marie.lambert@example.com',
      phone: '06 11 22 33 44',
      status: 'inactive',
      orders: 1,
      totalSpent: '59.99€'
    }
  ]);

  const getStatusLabel = status => {
    switch (status) {
      case 'active':
        return 'Actif';
      case 'inactive':
        return 'Inactif';
      default:
        return status;
    }
  };

  return (
    <CustomersContainer>
      <Title>Gestion des clients</Title>
      <CustomersGrid>
        {customers.map(customer => (
          <CustomerCard key={customer.id}>
            <CustomerHeader>
              <CustomerName>{customer.name}</CustomerName>
              <CustomerStatus status={customer.status}>
                {getStatusLabel(customer.status)}
              </CustomerStatus>
            </CustomerHeader>
            <CustomerDetails>
              <CustomerInfo>Email: {customer.email}</CustomerInfo>
              <CustomerInfo>Téléphone: {customer.phone}</CustomerInfo>
              <CustomerInfo>Commandes: {customer.orders}</CustomerInfo>
              <CustomerInfo>Total dépensé: {customer.totalSpent}</CustomerInfo>
            </CustomerDetails>
          </CustomerCard>
        ))}
      </CustomersGrid>
    </CustomersContainer>
  );
};

export default Customers;
