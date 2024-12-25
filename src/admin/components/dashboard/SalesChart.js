import React from 'react';
import styled from 'styled-components';

const ChartContainer = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const Title = styled.h3`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.typography.titleFont};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: ${({ theme }) => theme.spacing.md};
  height: 300px;
`;

const YAxis = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-right: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${({ theme }) => theme.typography.small};
`;

const XAxis = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${({ theme }) => theme.typography.small};
`;

const ChartArea = styled.div`
  position: relative;
  border-left: 1px solid ${({ theme }) => theme.colors.border};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const BarGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
  position: absolute;
  bottom: 0;
  width: 100%;
  justify-content: space-around;
`;

const Bar = styled.div`
  width: 24px;
  height: ${({ height }) => height}%;
  background-color: ${({ theme, type }) =>
    type === 'current' ? theme.colors.primary : `${theme.colors.primary}40`};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  transition: ${({ theme }) => theme.transitions.medium};
  position: relative;

  &:hover {
    background-color: ${({ theme, type }) =>
      type === 'current'
        ? theme.colors.primaryDark
        : `${theme.colors.primary}60`};
  }

  &::after {
    content: '${({ value }) => value}€';
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    font-size: ${({ theme }) => theme.typography.tiny};
    color: ${({ theme }) => theme.colors.text};
    opacity: 0;
    transition: ${({ theme }) => theme.transitions.fast};
  }

  &:hover::after {
    opacity: 1;
  }
`;

const Legend = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.lg};
  justify-content: center;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.small};

  &::before {
    content: '';
    width: 12px;
    height: 12px;
    border-radius: 2px;
    background-color: ${({ theme, type }) =>
      type === 'current' ? theme.colors.primary : `${theme.colors.primary}40`};
  }
`;

const SalesChart = ({ data }) => {
  const maxValue = Math.max(...data.current, ...data.previous) * 1.2;
  const yAxisValues = Array.from({ length: 5 }, (_, i) =>
    Math.round((maxValue * (4 - i)) / 4)
  );

  return (
    <ChartContainer>
      <Title>Évolution des ventes</Title>
      <ChartGrid>
        <YAxis>
          {yAxisValues.map(value => (
            <div key={value}>{value}€</div>
          ))}
        </YAxis>
        <div>
          <ChartArea>
            <BarGroup>
              {data.current.map((value, index) => (
                <div key={index} style={{ display: 'flex', gap: '4px' }}>
                  <Bar
                    type="previous"
                    height={(data.previous[index] / maxValue) * 100}
                    value={data.previous[index]}
                  />
                  <Bar
                    type="current"
                    height={(value / maxValue) * 100}
                    value={value}
                  />
                </div>
              ))}
            </BarGroup>
          </ChartArea>
          <XAxis>
            {data.labels.map(label => (
              <div key={label}>{label}</div>
            ))}
          </XAxis>
        </div>
      </ChartGrid>
      <Legend>
        <LegendItem type="current">Mois en cours</LegendItem>
        <LegendItem type="previous">Mois précédent</LegendItem>
      </Legend>
    </ChartContainer>
  );
};

export default SalesChart;
