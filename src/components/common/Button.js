import styled, { css } from 'styled-components';

const getButtonStyles = (variant = 'primary') => {
  switch (variant) {
    case 'secondary':
      return css`
        background-color: ${({ theme }) => theme.colors.secondary};
        color: ${({ theme }) => theme.colors.surface};
        &:hover {
          background-color: ${({ theme }) => theme.colors.secondaryDark};
        }
      `;
    case 'outline':
      return css`
        background-color: transparent;
        border: 2px solid ${({ theme }) => theme.colors.primary};
        color: ${({ theme }) => theme.colors.primary};
        &:hover {
          background-color: ${({ theme }) => theme.colors.primaryLight};
          color: ${({ theme }) => theme.colors.surface};
        }
      `;
    default:
      return css`
        background-color: ${({ theme }) => theme.colors.primary};
        color: ${({ theme }) => theme.colors.surface};
        &:hover {
          background-color: ${({ theme }) => theme.colors.primaryDark};
        }
      `;
  }
};

const getSizeStyles = (size = 'medium') => {
  switch (size) {
    case 'small':
      return css`
        height: 36px;
        padding: 0 ${({ theme }) => theme.spacing.md};
        font-size: ${({ theme }) => theme.typography.small};
      `;
    case 'large':
      return css`
        height: 56px;
        padding: 0 ${({ theme }) => theme.spacing.xl};
        font-size: ${({ theme }) => theme.typography.h6};
      `;
    default:
      return css`
        height: 48px;
        padding: 0 ${({ theme }) => theme.spacing.lg};
        font-size: ${({ theme }) => theme.typography.body};
      `;
  }
};

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-weight: 600;
  transition: ${({ theme }) => theme.transitions.medium};
  cursor: pointer;
  border: none;
  outline: none;
  white-space: nowrap;
  box-shadow: ${({ theme }) => theme.shadows.small};

  ${({ variant }) => getButtonStyles(variant)}
  ${({ size }) => getSizeStyles(size)}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
  }

  &:focus-visible {
    box-shadow: ${({ theme }) => theme.shadows.medium},
                0 0 0 3px ${({ theme }) => theme.colors.primaryLight};
  }

  svg {
    margin-right: ${({ theme }) => theme.spacing.xs};
  }
`;

export default Button; 