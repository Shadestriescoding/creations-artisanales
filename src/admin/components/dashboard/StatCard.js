import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Title = styled.h3`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${({ theme }) => theme.typography.small};
  font-weight: 500;
  margin: 0;
`;

const Value = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: 2rem;
  font-weight: 600;
  font-family: ${({ theme }) => theme.typography.titleFont};
`;

const Change = styled.div`
  color: ${({ positive, theme }) => 
    positive ? theme.colors.success : theme.colors.error};
  font-size: ${({ theme }) => theme.typography.small};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};

  &::before {
    content: "${({ positive }) => positive ? '↑' : '↓'}";
  }
`;

const Icon = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.5rem;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const StatCard = ({ title, value, change, icon }) => {
  const isPositive = change && change.startsWith('+');

  return (
    <Card>
      <Icon>{icon}</Icon>
      <Title>{title}</Title>
      <Value>{value}</Value>
      {change && (
        <Change positive={isPositive}>
          {change}
        </Change>
      )}
    </Card>
  );
};

export default StatCard; 