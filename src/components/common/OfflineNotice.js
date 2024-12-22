import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiWifi, FiWifiOff } from 'react-icons/fi';

const NoticeContainer = styled(motion.div)`
  position: fixed;
  bottom: ${props => props.theme.spacing.xl};
  left: 50%;
  transform: translateX(-50%);
  background-color: ${props => props.online ? props.theme.colors.success : props.theme.colors.error};
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.large};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  box-shadow: ${props => props.theme.shadows.large};
  z-index: 1000;
  min-width: 200px;
  justify-content: center;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    bottom: ${props => props.theme.spacing.lg};
    width: calc(100% - ${props => props.theme.spacing.xl} * 2);
    margin: 0 ${props => props.theme.spacing.xl};
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
`;

const Message = styled.p`
  margin: 0;
  font-weight: 500;
`;

const RetryButton = styled.button`
  background: transparent;
  border: 1px solid ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.small};
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  margin-left: ${props => props.theme.spacing.md};

  &:hover {
    background: ${props => props.theme.colors.white};
    color: ${props => props.online ? props.theme.colors.success : props.theme.colors.error};
  }
`;

const OfflineNotice = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showNotice, setShowNotice] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowNotice(true);
      setTimeout(() => setShowNotice(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowNotice(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleRetry = () => {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: 'RETRY_FAILED_REQUESTS'
      });
    }
    
    // Tenter de recharger les ressources en échec
    if (isOnline) {
      window.location.reload();
    }
  };

  return (
    <AnimatePresence>
      {showNotice && (
        <NoticeContainer
          online={isOnline}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
        >
          <IconWrapper>
            {isOnline ? <FiWifi size={20} /> : <FiWifiOff size={20} />}
          </IconWrapper>
          <Message>
            {isOnline ? 'Connexion rétablie' : 'Mode hors-ligne'}
          </Message>
          {!isOnline && (
            <RetryButton onClick={handleRetry} online={isOnline}>
              Réessayer
            </RetryButton>
          )}
        </NoticeContainer>
      )}
    </AnimatePresence>
  );
};

export default OfflineNotice; 