import React, { useState } from 'react';
import styled from 'styled-components';

const StatsContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.typography.titleFont};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

const StatCard = styled.div`
  background: ${({ theme }) => theme.colors.cardBackground};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.md};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

const StatTitle = styled.h3`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const StatValue = styled.p`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.5em;
  font-weight: bold;
  margin: ${({ theme }) => theme.spacing.xs} 0;
`;

const StatChange = styled.span`
  color: ${({ isPositive, theme }) =>
    isPositive ? theme.colors.success : theme.colors.error};
  font-size: 0.9em;
  display: block;
`;

const Stats = () => {
  const [stats] = useState([
    {
      id: 1,
      title: 'Ventes du mois',
      value: '2,499.99€',
      change: '+15.2%'
    },
    {
      id: 2,
      title: 'Commandes',
      value: '45',
      change: '+8.5%'
    },
    {
      id: 3,
      title: 'Nouveaux clients',
      value: '12',
      change: '+3.7%'
    },
    {
      id: 4,
      title: 'Taux de conversion',
      value: '3.2%',
      change: '-0.5%'
    }
  ]);

  return (
    <StatsContainer>
      <Title>Statistiques</Title>
      <StatsGrid>
        {stats.map(stat => (
          <StatCard key={stat.id}>
            <StatTitle>{stat.title}</StatTitle>
            <StatValue>{stat.value}</StatValue>
            <StatChange isPositive={stat.change.startsWith('+')}>
              {stat.change}
            </StatChange>
          </StatCard>
        ))}
      </StatsGrid>
    </StatsContainer>
  );
};

export default Stats;
