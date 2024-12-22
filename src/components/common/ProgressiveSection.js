import React, { useEffect, useRef, memo } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const SectionContainer = styled(motion.section)`
  opacity: 0;
  transform: translateY(20px);
  will-change: opacity, transform;
  
  &.loaded {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  }
`;

const LoadingPlaceholder = styled.div`
  width: 100%;
  height: ${props => props.height || '300px'};
  background: ${props => props.theme.colors.backgroundAlt};
  border-radius: ${props => props.theme.borderRadius.large};
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent 0%,
      ${props => props.theme.colors.background}20 50%,
      transparent 100%
    );
    animation: shimmer 1.5s infinite;
  }

  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
`;

const ErrorContainer = styled.div`
  padding: ${props => props.theme.spacing.xl};
  text-align: center;
  color: ${props => props.theme.colors.error};
  background: ${props => props.theme.colors.errorLight};
  border-radius: ${props => props.theme.borderRadius.medium};
  margin: ${props => props.theme.spacing.lg} 0;
`;

const RetryButton = styled.button`
  margin-top: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  background: ${props => props.theme.colors.error};
  color: ${props => props.theme.colors.white};
  border: none;
  border-radius: ${props => props.theme.borderRadius.small};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.errorDark};
    transform: translateY(-2px);
  }
`;

const ProgressiveSection = ({
  id,
  children,
  height,
  onVisibilityChange,
  observeSection,
  isLoaded,
  shouldRender,
  hasError,
  onRetry,
  className,
  ...props
}) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (sectionRef.current && observeSection) {
      const cleanup = observeSection(sectionRef.current, id);
      return () => {
        if (cleanup) cleanup();
      };
    }
  }, [id, observeSection]);

  useEffect(() => {
    if (onVisibilityChange && shouldRender) {
      onVisibilityChange(id, true);
    }
    return () => {
      if (onVisibilityChange) {
        onVisibilityChange(id, false);
      }
    };
  }, [id, shouldRender, onVisibilityChange]);

  if (hasError) {
    return (
      <ErrorContainer>
        <p>Une erreur est survenue lors du chargement de cette section.</p>
        {onRetry && (
          <RetryButton onClick={() => onRetry(id)}>
            Réessayer
          </RetryButton>
        )}
      </ErrorContainer>
    );
  }

  if (!shouldRender) {
    return <LoadingPlaceholder height={height} />;
  }

  return (
    <SectionContainer
      ref={sectionRef}
      className={`${className} ${isLoaded ? 'loaded' : ''}`}
      {...props}
    >
      {children}
    </SectionContainer>
  );
};

ProgressiveSection.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  height: PropTypes.string,
  onVisibilityChange: PropTypes.func,
  observeSection: PropTypes.func,
  isLoaded: PropTypes.bool,
  shouldRender: PropTypes.bool,
  hasError: PropTypes.bool,
  onRetry: PropTypes.func,
  className: PropTypes.string
};

ProgressiveSection.defaultProps = {
  height: '300px',
  isLoaded: false,
  shouldRender: false,
  hasError: false
};

export default memo(ProgressiveSection); 