import React from 'react';
import styled from 'styled-components';
import StatCard from '../components/dashboard/StatCard';
import SalesChart from '../components/dashboard/SalesChart';
import AlertsList from '../components/dashboard/AlertsList';

const DashboardContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.typography.titleFont};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const TwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: ${({ theme }) => theme.spacing.xl};
  margin-top: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    grid-template-columns: 1fr;
  }
`;

export const Dashboard = () => {
  // Données mockées pour les statistiques
  const stats = {
    sales: {
      title: "Ventes du mois",
      value: "2,450€",
      change: "+15%",
      icon: "💰"
    },
    orders: {
      title: "Commandes",
      value: "124",
      change: "+8%",
      icon: "📦"
    },
    avgOrder: {
      title: "Panier moyen",
      value: "45€",
      change: "+5%",
      icon: "🛒"
    },
    customers: {
      title: "Nouveaux clients",
      value: "28",
      change: "+12%",
      icon: "👥"
    }
  };

  // Données mockées pour le graphique
  const chartData = {
    labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
    current: [350, 420, 280, 450, 380, 520, 450],
    previous: [300, 380, 250, 400, 350, 480, 400]
  };

  // Données mockées pour les alertes
  const alerts = [
    {
      type: 'warning',
      message: 'Stock faible pour "Bracelet en perles roses" (2 restants)',
      time: new Date(Date.now() - 30 * 60000) // 30 minutes ago
    },
    {
      type: 'success',
      message: 'Excellentes ventes pour "Collier artisanal doré" cette semaine',
      time: new Date(Date.now() - 2 * 3600000) // 2 hours ago
    },
    {
      type: 'error',
      message: 'Erreur de paiement sur la commande #CMD123',
      time: new Date(Date.now() - 4 * 3600000) // 4 hours ago
    },
    {
      type: 'info',
      message: 'Nouvelle évaluation 5 étoiles reçue',
      time: new Date(Date.now() - 12 * 3600000) // 12 hours ago
    }
  ];

  return (
    <DashboardContainer>
      <Title>Tableau de bord</Title>
      
      <StatsGrid>
        {Object.entries(stats).map(([key, stat]) => (
          <StatCard
            key={key}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            icon={stat.icon}
          />
        ))}
      </StatsGrid>

      <TwoColumnGrid>
        <SalesChart data={chartData} />
        <AlertsList alerts={alerts} />
      </TwoColumnGrid>
    </DashboardContainer>
  );
}; 