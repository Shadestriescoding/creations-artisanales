import React, { useState } from 'react';
import styled from 'styled-components';

const OrdersContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.typography.titleFont};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const OrdersGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const OrderCard = styled.div`
  background: ${({ theme }) => theme.colors.cardBackground};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.md};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const OrderId = styled.h3`
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

const OrderStatus = styled.span`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: 0.9em;
  background: ${({ status, theme }) => {
    switch (status) {
      case 'completed':
        return theme.colors.success + '33';
      case 'pending':
        return theme.colors.warning + '33';
      case 'cancelled':
        return theme.colors.error + '33';
      default:
        return theme.colors.backgroundAlt;
    }
  }};
  color: ${({ status, theme }) => {
    switch (status) {
      case 'completed':
        return theme.colors.success;
      case 'pending':
        return theme.colors.warning;
      case 'cancelled':
        return theme.colors.error;
      default:
        return theme.colors.text;
    }
  }};
`;

const OrderDetails = styled.div`
  margin-top: ${({ theme }) => theme.spacing.sm};
  padding-top: ${({ theme }) => theme.spacing.sm};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const OrderInfo = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  margin: ${({ theme }) => theme.spacing.xs} 0;
  font-size: 0.9em;
`;

const Orders = () => {
  const [orders] = useState([
    {
      id: 'EVA-001',
      customer: 'Alice Martin',
      date: '2024-01-20',
      total: '149.99€',
      status: 'completed',
      items: 3,
      shippingAddress: '123 Rue de Paris, 75001 Paris'
    },
    {
      id: 'EVA-002',
      customer: 'Paul Dubois',
      date: '2024-01-19',
      total: '89.99€',
      status: 'pending',
      items: 2,
      shippingAddress: '456 Avenue des Champs-Élysées, 75008 Paris'
    },
    {
      id: 'EVA-003',
      customer: 'Marie Lambert',
      date: '2024-01-18',
      total: '59.99€',
      status: 'cancelled',
      items: 1,
      shippingAddress: '789 Boulevard Saint-Germain, 75006 Paris'
    }
  ]);

  const getStatusLabel = status => {
    switch (status) {
      case 'completed':
        return 'Terminée';
      case 'pending':
        return 'En attente';
      case 'cancelled':
        return 'Annulée';
      default:
        return status;
    }
  };

  return (
    <OrdersContainer>
      <Title>Gestion des commandes</Title>
      <OrdersGrid>
        {orders.map(order => (
          <OrderCard key={order.id}>
            <OrderHeader>
              <OrderId>{order.id}</OrderId>
              <OrderStatus status={order.status}>
                {getStatusLabel(order.status)}
              </OrderStatus>
            </OrderHeader>
            <OrderDetails>
              <OrderInfo>Client: {order.customer}</OrderInfo>
              <OrderInfo>Date: {order.date}</OrderInfo>
              <OrderInfo>Total: {order.total}</OrderInfo>
              <OrderInfo>Articles: {order.items}</OrderInfo>
              <OrderInfo>Adresse: {order.shippingAddress}</OrderInfo>
            </OrderDetails>
          </OrderCard>
        ))}
      </OrdersGrid>
    </OrdersContainer>
  );
};

export default Orders;
