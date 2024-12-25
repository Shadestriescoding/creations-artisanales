import React from 'react';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const baseButtonStyles = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.size === 'small'
    ? `${props.theme.spacing.sm} ${props.theme.spacing.md}`
    : props.size === 'large'
    ? `${props.theme.spacing.lg} ${props.theme.spacing.xxl}`
    : `${props.theme.spacing.md} ${props.theme.spacing.xl}`};
  font-size: ${props => props.size === 'small'
    ? '0.875rem'
    : props.size === 'large'
    ? '1.125rem'
    : '1rem'};
  font-weight: 600;
  border-radius: ${props => props.theme.borderRadius.medium};
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  border: 2px solid transparent;
  width: ${props => props.fullWidth ? '100%' : 'auto'};

  ${props => {
    switch (props.variant) {
      case 'outlined':
        return css`
          background-color: transparent;
          border-color: ${props.theme.colors.primary};
          color: ${props.theme.colors.primary};

          &:hover:not(:disabled) {
            background-color: ${props.theme.colors.primary}10;
          }

          &:active:not(:disabled) {
            background-color: ${props.theme.colors.primary}20;
          }
        `;
      case 'text':
        return css`
          background-color: transparent;
          color: ${props.theme.colors.primary};
          padding: ${props.theme.spacing.xs} ${props.theme.spacing.sm};

          &:hover:not(:disabled) {
            background-color: ${props.theme.colors.primary}10;
          }

          &:active:not(:disabled) {
            background-color: ${props.theme.colors.primary}20;
          }
        `;
      case 'secondary':
        return css`
          background-color: ${props.theme.colors.backgroundAlt};
          color: ${props.theme.colors.text};
          border-color: ${props.theme.colors.border};

          &:hover:not(:disabled) {
            border-color: ${props.theme.colors.primary};
            color: ${props.theme.colors.primary};
          }

          &:active:not(:disabled) {
            background-color: ${props.theme.colors.primary}10;
          }
        `;
      default:
        return css`
          background-color: ${props.theme.colors.primary};
          color: white;

          &:hover:not(:disabled) {
            background-color: ${props.theme.colors.primaryDark};
          }

          &:active:not(:disabled) {
            transform: translateY(1px);
          }
        `;
    }
  }}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  svg {
    font-size: ${props => props.size === 'small'
      ? '1rem'
      : props.size === 'large'
      ? '1.5rem'
      : '1.2rem'};
  }
`;

const StyledButton = styled(motion.button)`
  ${baseButtonStyles}
`;

const StyledLink = styled(motion(Link))`
  ${baseButtonStyles}
`;

const LoadingSpinner = styled(motion.div)`
  width: ${props => props.size === 'small' ? '16px' : '20px'};
  height: ${props => props.size === 'small' ? '16px' : '20px'};
  border: 2px solid transparent;
  border-top-color: currentColor;
  border-radius: 50%;
`;

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  to,
  loading = false,
  disabled = false,
  onClick,
  ...props
}) => {
  const buttonProps = {
    variant,
    size,
    fullWidth,
    disabled: disabled || loading,
    whileHover: { scale: disabled || loading ? 1 : 1.02 },
    whileTap: { scale: disabled || loading ? 1 : 0.98 },
    ...props
  };

  const spinnerVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: 'linear'
      }
    }
  };

  const content = loading ? (
    <LoadingSpinner
      size={size}
      animate="animate"
      variants={spinnerVariants}
    />
  ) : children;

  if (to) {
    return (
      <StyledLink to={to} {...buttonProps}>
        {content}
      </StyledLink>
    );
  }

  return (
    <StyledButton onClick={onClick} {...buttonProps}>
      {content}
    </StyledButton>
  );
};

export default Button; 