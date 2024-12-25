import styled, { css } from 'styled-components';

const getGap = (gap = 'medium') => {
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

const Flex = styled.div`
  display: flex;
  ${({ direction }) => direction && css`flex-direction: ${direction};`}
  ${({ wrap }) => wrap && css`flex-wrap: ${wrap};`}
  ${({ justify }) => justify && css`justify-content: ${justify};`}
  ${({ align }) => align && css`align-items: ${align};`}
  ${({ gap }) => getGap(gap)}
  ${({ grow }) => grow && css`flex-grow: ${grow};`}
  ${({ shrink }) => shrink && css`flex-shrink: ${shrink};`}
  ${({ basis }) => basis && css`flex-basis: ${basis};`}
  ${({ flex }) => flex && css`flex: ${flex};`}
  ${({ width }) => width && css`width: ${width};`}
  ${({ height }) => height && css`height: ${height};`}
  ${({ padding }) => padding && css`padding: ${padding};`}
  ${({ margin }) => margin && css`margin: ${margin};`}
`;

const FlexItem = styled.div`
  ${({ grow }) => grow && css`flex-grow: ${grow};`}
  ${({ shrink }) => shrink && css`flex-shrink: ${shrink};`}
  ${({ basis }) => basis && css`flex-basis: ${basis};`}
  ${({ flex }) => flex && css`flex: ${flex};`}
  ${({ align }) => align && css`align-self: ${align};`}
  ${({ order }) => order && css`order: ${order};`}
  ${({ width }) => width && css`width: ${width};`}
  ${({ height }) => height && css`height: ${height};`}
  ${({ padding }) => padding && css`padding: ${padding};`}
  ${({ margin }) => margin && css`margin: ${margin};`}
`;

Flex.Item = FlexItem;

export default Flex; 