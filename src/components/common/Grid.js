import styled, { css } from 'styled-components';

const getGridColumns = (columns = 12) => {
  return css`
    grid-template-columns: repeat(${columns}, 1fr);
  `;
};

const getGridGap = (gap = 'medium') => {
  switch (gap) {
    case 'none':
      return css`
        gap: 0;
      `;
    case 'small':
      return css`
        gap: ${({ theme }) => theme.spacing.md};
      `;
    case 'large':
      return css`
        gap: ${({ theme }) => theme.spacing.xl};
      `;
    default:
      return css`
        gap: ${({ theme }) => theme.spacing.lg};
      `;
  }
};

const Grid = styled.div`
  display: grid;
  width: 100%;

  ${({ columns }) => getGridColumns(columns)}
  ${({ gap }) => getGridGap(gap)}

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(6, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const GridItem = styled.div`
  grid-column: span ${({ span = 1 }) => span};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-column: span ${({ tabletSpan, span = 1 }) => tabletSpan || span};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-column: span ${({ mobileSpan, span = 1 }) => mobileSpan || span};
  }
`;

Grid.Item = GridItem;

export default Grid; 