import styled, { css } from 'styled-components';

const getElevation = (elevation = 'medium') => {
  switch (elevation) {
    case 'none':
      return css`
        box-shadow: none;
      `;
    case 'small':
      return css`
        box-shadow: ${({ theme }) => theme.shadows.small};
      `;
    case 'large':
      return css`
        box-shadow: ${({ theme }) => theme.shadows.large};
      `;
    default:
      return css`
        box-shadow: ${({ theme }) => theme.shadows.medium};
      `;
  }
};

const getPadding = (padding = 'medium') => {
  switch (padding) {
    case 'none':
      return css`
        padding: 0;
      `;
    case 'small':
      return css`
        padding: ${({ theme }) => theme.spacing.md};
      `;
    case 'large':
      return css`
        padding: ${({ theme }) => theme.spacing.xl};
      `;
    default:
      return css`
        padding: ${({ theme }) => theme.spacing.lg};
      `;
  }
};

const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: ${({ theme }) => theme.transitions.medium};
  overflow: hidden;
  width: 100%;

  ${({ elevation }) => getElevation(elevation)}
  ${({ padding }) => getPadding(padding)}

  ${({ hoverable }) =>
    hoverable &&
    css`
      cursor: pointer;
      &:hover {
        transform: translateY(-4px);
        box-shadow: ${({ theme }) => theme.shadows.hover};
      }
    `}

  ${({ bordered }) =>
    !bordered &&
    css`
      border: none;
    `}
`;

const CardHeader = styled.div`
  margin: -${({ theme, $padding }) => 
    $padding === 'large' 
      ? theme.spacing.xl 
      : $padding === 'small' 
      ? theme.spacing.md 
      : theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme, $padding }) => 
    $padding === 'large' 
      ? theme.spacing.xl 
      : $padding === 'small' 
      ? theme.spacing.md 
      : theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
`;

const CardFooter = styled.div`
  margin: -${({ theme, $padding }) => 
    $padding === 'large' 
      ? theme.spacing.xl 
      : $padding === 'small' 
      ? theme.spacing.md 
      : theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme, $padding }) => 
    $padding === 'large' 
      ? theme.spacing.xl 
      : $padding === 'small' 
      ? theme.spacing.md 
      : theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
`;

const CardTitle = styled.h3`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.h5};
  font-weight: 600;
  margin: 0;
`;

const CardContent = styled.div`
  color: ${({ theme }) => theme.colors.text};
`;

Card.Header = CardHeader;
Card.Footer = CardFooter;
Card.Title = CardTitle;
Card.Content = CardContent;

export default Card; 