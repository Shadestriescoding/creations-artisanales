import React, { useState } from 'react';
import styled from 'styled-components';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const StatsContainer = styled.div`
  padding: ${props => props.theme.spacing.lg};
`;

const KPIGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const KPICard = styled.div`
  background: white;
  border-radius: ${props => props.theme.borderRadius.large};
  padding: ${props => props.theme.spacing.lg};
  box-shadow: ${props => props.theme.shadows.medium};
  
  h3 {
    margin: 0;
    color: ${props => props.theme.colors.textLight};
    font-size: 0.9rem;
    margin-bottom: ${props => props.theme.spacing.sm};
  }
  
  .value {
    font-size: 1.8rem;
    font-weight: 600;
    color: ${props => props.theme.colors.text};
    margin-bottom: ${props => props.theme.spacing.xs};
  }
  
  .trend {
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: ${props => props.theme.spacing.xs};
    
    &.positive {
      color: ${props => props.theme.colors.success};
    }
    
    &.negative {
      color: ${props => props.theme.colors.error};
    }
  }
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${props => props.theme.spacing.xl};
  margin-bottom: ${props => props.theme.spacing.xl};
  
  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

const ChartCard = styled.div`
  background: white;
  border-radius: ${props => props.theme.borderRadius.large};
  padding: ${props => props.theme.spacing.lg};
  box-shadow: ${props => props.theme.shadows.medium};
  
  h3 {
    margin: 0;
    margin-bottom: ${props => props.theme.spacing.lg};
    color: ${props => props.theme.colors.text};
  }
`;

const RecommendationsSection = styled.div`
  background: white;
  border-radius: ${props => props.theme.borderRadius.large};
  padding: ${props => props.theme.spacing.lg};
  box-shadow: ${props => props.theme.shadows.medium};
  
  h3 {
    margin: 0;
    margin-bottom: ${props => props.theme.spacing.lg};
    color: ${props => props.theme.colors.text};
  }
`;

const RecommendationCard = styled.div`
  border-left: 4px solid ${props => props.priority === 'high' 
    ? props.theme.colors.error 
    : props.priority === 'medium' 
    ? props.theme.colors.warning
    : props.theme.colors.success};
  padding: ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.backgroundAlt}22;
  border-radius: 0 ${props => props.theme.borderRadius.medium} ${props => props.theme.borderRadius.medium} 0;
  margin-bottom: ${props => props.theme.spacing.md};
  
  h4 {
    margin: 0;
    margin-bottom: ${props => props.theme.spacing.xs};
    color: ${props => props.theme.colors.text};
  }
  
  p {
    margin: 0;
    color: ${props => props.theme.colors.textLight};
  }
  
  .metrics {
    margin-top: ${props => props.theme.spacing.sm};
    font-size: 0.9rem;
    color: ${props => props.theme.colors.textLight};
  }
`;

const TimeframeSelector = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const TimeframeButton = styled.button`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  border: 1px solid ${props => props.active ? props.theme.colors.primary : props.theme.colors.backgroundAlt};
  background: ${props => props.active ? props.theme.colors.primary : 'white'};
  color: ${props => props.active ? 'white' : props.theme.colors.text};
  border-radius: ${props => props.theme.borderRadius.medium};
  cursor: pointer;
  transition: ${props => props.theme.transitions.fast};
  
  &:hover {
    border-color: ${props => props.theme.colors.primary};
  }
`;

export const Stats = () => {
  const [timeframe, setTimeframe] = useState('month');
  
  // Données mockées pour les KPIs
  const kpiData = {
    revenue: {
      value: "12 450€",
      trend: "+15%",
      positive: true
    },
    orders: {
      value: "156",
      trend: "+23%",
      positive: true
    },
    avgOrderValue: {
      value: "79.80€",
      trend: "-5%",
      positive: false
    },
    activeCustomers: {
      value: "89",
      trend: "+12%",
      positive: true
    }
  };
  
  // Données mockées pour les graphiques
  const salesData = [
    { name: 'Jan', value: 8400 },
    { name: 'Fév', value: 9200 },
    { name: 'Mar', value: 7800 },
    { name: 'Avr', value: 11200 },
    { name: 'Mai', value: 10500 },
    { name: 'Juin', value: 12450 }
  ];
  
  const categoryData = [
    { name: 'Colliers', value: 35 },
    { name: 'Bracelets', value: 25 },
    { name: 'Boucles', value: 20 },
    { name: 'Bagues', value: 15 },
    { name: 'Autres', value: 5 }
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];
  
  // Données mockées pour les recommandations
  const recommendations = [
    {
      title: "Opportunité de croissance : Colliers",
      description: "Les colliers représentent 35% des ventes. Considérez l'ajout de nouvelles variantes pour capitaliser sur cette tendance.",
      metrics: "Marge bénéficiaire : +45% | Taux de conversion : 8.5%",
      priority: "high"
    },
    {
      title: "Stock faible : Bracelets en perles",
      description: "Le stock de bracelets en perles est bas. Recommandation de réapprovisionnement pour éviter les ruptures.",
      metrics: "Stock restant : 5 unités | Ventes hebdomadaires moyennes : 3 unités",
      priority: "medium"
    },
    {
      title: "Performance marketing",
      description: "Les publicités sur Instagram surperforment. Augmentez le budget publicitaire sur ce canal.",
      metrics: "ROI : 320% | CPA : 12€",
      priority: "low"
    }
  ];

  return (
    <StatsContainer>
      <TimeframeSelector>
        <TimeframeButton 
          active={timeframe === 'week'} 
          onClick={() => setTimeframe('week')}
        >
          7 jours
        </TimeframeButton>
        <TimeframeButton 
          active={timeframe === 'month'} 
          onClick={() => setTimeframe('month')}
        >
          30 jours
        </TimeframeButton>
        <TimeframeButton 
          active={timeframe === 'quarter'} 
          onClick={() => setTimeframe('quarter')}
        >
          3 mois
        </TimeframeButton>
        <TimeframeButton 
          active={timeframe === 'year'} 
          onClick={() => setTimeframe('year')}
        >
          12 mois
        </TimeframeButton>
      </TimeframeSelector>

      <KPIGrid>
        <KPICard>
          <h3>Chiffre d'affaires</h3>
          <div className="value">{kpiData.revenue.value}</div>
          <div className={`trend ${kpiData.revenue.positive ? 'positive' : 'negative'}`}>
            {kpiData.revenue.positive ? '↑' : '↓'} {kpiData.revenue.trend}
          </div>
        </KPICard>
        
        <KPICard>
          <h3>Commandes</h3>
          <div className="value">{kpiData.orders.value}</div>
          <div className={`trend ${kpiData.orders.positive ? 'positive' : 'negative'}`}>
            {kpiData.orders.positive ? '↑' : '↓'} {kpiData.orders.trend}
          </div>
        </KPICard>
        
        <KPICard>
          <h3>Panier moyen</h3>
          <div className="value">{kpiData.avgOrderValue.value}</div>
          <div className={`trend ${kpiData.avgOrderValue.positive ? 'positive' : 'negative'}`}>
            {kpiData.avgOrderValue.positive ? '↑' : '↓'} {kpiData.avgOrderValue.trend}
          </div>
        </KPICard>
        
        <KPICard>
          <h3>Clients actifs</h3>
          <div className="value">{kpiData.activeCustomers.value}</div>
          <div className={`trend ${kpiData.activeCustomers.positive ? 'positive' : 'negative'}`}>
            {kpiData.activeCustomers.positive ? '↑' : '↓'} {kpiData.activeCustomers.trend}
          </div>
        </KPICard>
      </KPIGrid>

      <ChartsGrid>
        <ChartCard>
          <h3>Évolution des ventes</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#8884d8" 
                name="Ventes (€)"
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard>
          <h3>Répartition par catégorie</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </ChartsGrid>

      <RecommendationsSection>
        <h3>Recommandations</h3>
        {recommendations.map((rec, index) => (
          <RecommendationCard key={index} priority={rec.priority}>
            <h4>{rec.title}</h4>
            <p>{rec.description}</p>
            <div className="metrics">{rec.metrics}</div>
          </RecommendationCard>
        ))}
      </RecommendationsSection>
    </StatsContainer>
  );
}; 