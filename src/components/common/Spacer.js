import styled, { css } from 'styled-components';

const getSize = (size = 'medium') => {
  switch (size) {
    case 'xxs':
      return css`
        height: ${({ theme }) => theme.spacing.xxs};
        width: ${({ theme }) => theme.spacing.xxs};
      `;
    case 'xs':
      return css`
        height: ${({ theme }) => theme.spacing.xs};
        width: ${({ theme }) => theme.spacing.xs};
      `;
    case 'sm':
      return css`
        height: ${({ theme }) => theme.spacing.sm};
        width: ${({ theme }) => theme.spacing.sm};
      `;
    case 'lg':
      return css`
        height: ${({ theme }) => theme.spacing.lg};
        width: ${({ theme }) => theme.spacing.lg};
      `;
    case 'xl':
      return css`
        height: ${({ theme }) => theme.spacing.xl};
        width: ${({ theme }) => theme.spacing.xl};
      `;
    case 'xxl':
      return css`
        height: ${({ theme }) => theme.spacing.xxl};
        width: ${({ theme }) => theme.spacing.xxl};
      `;
    case 'xxxl':
      return css`
        height: ${({ theme }) => theme.spacing.xxxl};
        width: ${({ theme }) => theme.spacing.xxxl};
      `;
    default:
      return css`
        height: ${({ theme }) => theme.spacing.md};
        width: ${({ theme }) => theme.spacing.md};
      `;
  }
};

const Spacer = styled.div`
  ${({ size }) => getSize(size)}
  ${({ axis }) =>
    axis === 'horizontal'
      ? css`
          height: 1px;
        `
      : axis === 'vertical'
      ? css`
          width: 1px;
        `
      : ''}
  ${({ grow }) => grow && css`flex-grow: ${grow};`}
  ${({ shrink }) => shrink && css`flex-shrink: ${shrink};`}
`;

export default Spacer; 