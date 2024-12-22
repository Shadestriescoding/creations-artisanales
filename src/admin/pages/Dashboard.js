import React from 'react';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  padding: ${props => props.theme.spacing.xl};
  max-width: ${props => props.theme.breakpoints.wide};
  margin: 0 auto;
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.xxl};
`;

const KPICard = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.large};
  padding: ${props => props.theme.spacing.lg};
  box-shadow: ${props => props.theme.shadows.medium};
  
  h3 {
    color: ${props => props.theme.colors.textLight};
    font-size: 1rem;
    margin-bottom: ${props => props.theme.spacing.sm};
  }
  
  .value {
    font-size: 2rem;
    font-weight: bold;
    color: ${props => props.theme.colors.primary};
    margin-bottom: ${props => props.theme.spacing.xs};
  }
  
  .change {
    font-size: 0.9rem;
    color: ${props => props.positive ? props.theme.colors.success : props.theme.colors.error};
  }
`;

const AlertsSection = styled.div`
  background: ${props => props.theme.colors.backgroundAlt};
  border-radius: ${props => props.theme.borderRadius.large};
  padding: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.xl};
  
  h2 {
    color: ${props => props.theme.colors.text};
    margin-bottom: ${props => props.theme.spacing.md};
  }
`;

const Alert = styled.div`
  background: ${props => props.theme.colors.white};
  border-left: 4px solid ${props => 
    props.type === 'warning' ? props.theme.colors.warning :
    props.type === 'error' ? props.theme.colors.error :
    props.theme.colors.success
  };
  padding: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.medium};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const RecentOrdersSection = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.large};
  padding: ${props => props.theme.spacing.lg};
  
  h2 {
    color: ${props => props.theme.colors.text};
    margin-bottom: ${props => props.theme.spacing.md};
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    
    th, td {
      padding: ${props => props.theme.spacing.sm};
      text-align: left;
      border-bottom: 1px solid ${props => props.theme.colors.backgroundAlt};
    }
    
    th {
      font-weight: 600;
      color: ${props => props.theme.colors.textLight};
    }
  }
`;

export const Dashboard = () => {
  // Ces données seront remplacées par des vraies données de l'API
  const mockData = {
    totalSales: "2,450€",
    salesChange: "+15%",
    orders: "124",
    ordersChange: "+8%",
    avgBasket: "45€",
    avgBasketChange: "+5%",
    alerts: [
      { type: 'warning', message: 'Stock faible pour "Bracelet en perles roses" (2 restants)' },
      { type: 'success', message: 'Excellentes ventes pour "Collier artisanal doré" cette semaine' }
    ],
    recentOrders: [
      { id: 1, date: '2024-01-18', customer: 'Marie D.', total: '75€', status: 'Terminée' },
      { id: 2, date: '2024-01-17', customer: 'Sophie L.', total: '120€', status: 'En cours' }
    ]
  };

  return (
    <DashboardContainer>
      <DashboardGrid>
        <KPICard>
          <h3>Ventes Totales</h3>
          <div className="value">{mockData.totalSales}</div>
          <div className="change" positive={mockData.salesChange.includes('+')}>
            {mockData.salesChange} vs mois dernier
          </div>
        </KPICard>
        
        <KPICard>
          <h3>Commandes</h3>
          <div className="value">{mockData.orders}</div>
          <div className="change" positive={mockData.ordersChange.includes('+')}>
            {mockData.ordersChange} vs mois dernier
          </div>
        </KPICard>
        
        <KPICard>
          <h3>Panier Moyen</h3>
          <div className="value">{mockData.avgBasket}</div>
          <div className="change" positive={mockData.avgBasketChange.includes('+')}>
            {mockData.avgBasketChange} vs mois dernier
          </div>
        </KPICard>
      </DashboardGrid>

      <AlertsSection>
        <h2>Alertes & Recommandations</h2>
        {mockData.alerts.map((alert, index) => (
          <Alert key={index} type={alert.type}>
            {alert.message}
          </Alert>
        ))}
      </AlertsSection>

      <RecentOrdersSection>
        <h2>Commandes Récentes</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Client</th>
              <th>Total</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {mockData.recentOrders.map(order => (
              <tr key={order.id}>
                <td>{order.date}</td>
                <td>{order.customer}</td>
                <td>{order.total}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </RecentOrdersSection>
    </DashboardContainer>
  );
}; 