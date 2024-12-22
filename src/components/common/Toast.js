import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`;

const ToastContainer = styled.div`
  position: fixed;
  top: ${props => props.theme.spacing.xl};
  right: ${props => props.theme.spacing.xl};
  z-index: ${props => props.theme.zIndex.modal + 1};
  animation: ${props => props.isClosing ? slideOut : slideIn} 0.3s ease-in-out;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    top: auto;
    bottom: ${props => props.theme.spacing.xl};
    right: ${props => props.theme.spacing.md};
    left: ${props => props.theme.spacing.md};
  }
`;

const ToastContent = styled.div`
  background-color: ${props => {
    switch (props.type) {
      case 'success':
        return props.theme.colors.success;
      case 'error':
        return props.theme.colors.error;
      case 'warning':
        return props.theme.colors.warning;
      default:
        return props.theme.colors.primary;
    }
  }};
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: ${props => props.theme.shadows.large};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  max-width: 400px;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    max-width: 100%;
  }
`;

const Icon = styled.span`
  font-size: 1.2rem;
`;

const Message = styled.p`
  margin: 0;
  font-size: 0.95rem;
  font-weight: 500;
  flex-grow: 1;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.white};
  cursor: pointer;
  padding: ${props => props.theme.spacing.xs};
  opacity: 0.8;
  transition: ${props => props.theme.transitions.fast};

  &:hover {
    opacity: 1;
  }
`;

const getIcon = (type) => {
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

const Toast = ({ message, type = 'info', duration = 3000, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsClosing(true);
      setTimeout(onClose, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300);
  };

  return (
    <ToastContainer isClosing={isClosing}>
      <ToastContent type={type}>
        <Icon>{getIcon(type)}</Icon>
        <Message>{message}</Message>
        <CloseButton onClick={handleClose} aria-label="Fermer">
          ✕
        </CloseButton>
      </ToastContent>
    </ToastContainer>
  );
};

export default Toast; 