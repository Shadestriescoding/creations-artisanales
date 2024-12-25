import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCheck, FiAlertCircle, FiInfo } from 'react-icons/fi';

const ToastContainer = styled(motion.div)`
  position: fixed;
  top: ${props => props.theme.spacing.xl};
  right: ${props => props.theme.spacing.xl};
  z-index: 1100;
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
  pointer-events: none;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    top: ${props => props.theme.spacing.lg};
    right: ${props => props.theme.spacing.lg};
    left: ${props => props.theme.spacing.lg};
  }
`;

const ToastItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  background-color: ${props => {
    switch (props.type) {
      case 'success':
        return props.theme.colors.success;
      case 'error':
        return props.theme.colors.danger;
      case 'info':
        return props.theme.colors.info;
      default:
        return props.theme.colors.background;
    }
  }};
  color: ${props => props.type === 'default' ? props.theme.colors.text : 'white'};
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: ${props => props.theme.shadows.medium};
  pointer-events: auto;
  max-width: 400px;
  width: 100%;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    font-size: 1.2rem;
  }
`;

const Message = styled.div`
  flex: 1;
  font-size: 0.95rem;
  line-height: 1.4;
`;

const CloseButton = styled(motion.button)`
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  padding: ${props => props.theme.spacing.xs};
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.8;
  flex-shrink: 0;

  &:hover {
    opacity: 1;
  }

  svg {
    font-size: 1.1rem;
  }
`;

const getIcon = (type) => {
  switch (type) {
    case 'success':
      return <FiCheck />;
    case 'error':
      return <FiAlertCircle />;
    case 'info':
      return <FiInfo />;
    default:
      return null;
  }
};

const Toast = ({ toasts, removeToast }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const toastVariants = {
    hidden: {
      opacity: 0,
      x: 50,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 25
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      x: 50,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <ToastContainer
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <AnimatePresence>
        {toasts.map(toast => (
          <ToastItem
            key={toast.id}
            type={toast.type}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={toastVariants}
            layout
          >
            <IconContainer>
              {getIcon(toast.type)}
            </IconContainer>
            <Message>{toast.message}</Message>
            <CloseButton
              onClick={() => removeToast(toast.id)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiX />
            </CloseButton>
          </ToastItem>
        ))}
      </AnimatePresence>
    </ToastContainer>
  );
};

export default Toast;
