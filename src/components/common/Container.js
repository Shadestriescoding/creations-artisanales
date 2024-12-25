import styled, { css } from 'styled-components';

const getMaxWidth = (size = 'default') => {
  switch (size) {
    case 'small':
      return css`
        max-width: ${({ theme }) => theme.layout.contentWidth};
      `;
    case 'large':
      return css`
        max-width: 100%;
        padding: 0;
      `;
    default:
      return css`
        max-width: ${({ theme }) => theme.layout.maxWidth};
      `;
  }
};

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};

  ${({ size }) => getMaxWidth(size)}

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0 ${({ theme }) => theme.spacing.md};
  }
`;

export default Container; 