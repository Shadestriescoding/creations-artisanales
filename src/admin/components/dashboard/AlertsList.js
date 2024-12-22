import React from 'react';
import styled from 'styled-components';

const AlertsContainer = styled.div`
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

const AlertList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const Alert = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  background-color: ${({ type, theme }) => {
    switch (type) {
      case 'warning':
        return `${theme.colors.warning}10`;
      case 'success':
        return `${theme.colors.success}10`;
      case 'error':
        return `${theme.colors.error}10`;
      default:
        return `${theme.colors.primary}10`;
    }
  }};
`;

const AlertIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => theme.borderRadius.round};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  background-color: ${({ type, theme }) => {
    switch (type) {
      case 'warning':
        return `${theme.colors.warning}20`;
      case 'success':
        return `${theme.colors.success}20`;
      case 'error':
        return `${theme.colors.error}20`;
      default:
        return `${theme.colors.primary}20`;
    }
  }};
  color: ${({ type, theme }) => {
    switch (type) {
      case 'warning':
        return theme.colors.warning;
      case 'success':
        return theme.colors.success;
      case 'error':
        return theme.colors.error;
      default:
        return theme.colors.primary;
    }
  }};
`;

const AlertContent = styled.div`
  flex: 1;
`;

const AlertMessage = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.body};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const AlertTime = styled.div`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${({ theme }) => theme.typography.small};
`;

const getAlertIcon = (type) => {
  switch (type) {
    case 'warning':
      return '⚠️';
    case 'success':
      return '✅';
    case 'error':
      return '❌';
    default:
      return 'ℹ️';
  }
};

const formatTime = (date) => {
  const now = new Date();
  const alertDate = new Date(date);
  const diffInMinutes = Math.floor((now - alertDate) / (1000 * 60));

  if (diffInMinutes < 1) return 'À l\'instant';
  if (diffInMinutes < 60) return `Il y a ${diffInMinutes} min`;
  if (diffInMinutes < 1440) {
    const hours = Math.floor(diffInMinutes / 60);
    return `Il y a ${hours} h`;
  }
  return alertDate.toLocaleDateString('fr-FR');
};

const AlertsList = ({ alerts }) => {
  return (
    <AlertsContainer>
      <Title>Alertes récentes</Title>
      <AlertList>
        {alerts.map((alert, index) => (
          <Alert key={index} type={alert.type}>
            <AlertIcon type={alert.type}>
              {getAlertIcon(alert.type)}
            </AlertIcon>
            <AlertContent>
              <AlertMessage>{alert.message}</AlertMessage>
              <AlertTime>{formatTime(alert.time)}</AlertTime>
            </AlertContent>
          </Alert>
        ))}
      </AlertList>
    </AlertsContainer>
  );
};

export default AlertsList; 