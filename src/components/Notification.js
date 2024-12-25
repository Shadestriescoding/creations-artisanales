import React, { useEffect, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';

const slideIn = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-100%);
    opacity: 0;
  }
`;

const NotificationContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 1rem;
  border-radius: 8px;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  gap: 0.5rem;

  ${props => {
    switch (props.type) {
      case 'success':
        return css`
          background-color: ${props.theme.colors.secondary};
          color: white;
        `;
      case 'error':
        return css`
          background-color: #ff4444;
          color: white;
        `;
      case 'warning':
        return css`
          background-color: #ffbb33;
          color: black;
        `;
      default:
        return css`
          background-color: ${props.theme.colors.primary};
          color: white;
        `;
    }
  }}

  animation: ${props =>
    props.isLeaving ? slideOut : slideIn} 0.3s ease forwards;
`;

const Icon = styled.span`
  font-size: 1.2rem;
`;

const getIcon = type => {
  switch (type) {
    case 'success':
      return '✓';
    case 'error':
      return '✕';
    case 'warning':
      return '⚠';
    default:
      return 'ℹ';
  }
};

export const Notification = ({ message, type = 'success', onClose }) => {
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLeaving(true);
      setTimeout(onClose, 300); // Attendre la fin de l'animation avant de fermer
    }, 2700); // Démarrer la sortie un peu avant pour une transition fluide

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <NotificationContainer type={type} isLeaving={isLeaving}>
      <Icon>{getIcon(type)}</Icon>
      {message}
    </NotificationContainer>
  );
};
