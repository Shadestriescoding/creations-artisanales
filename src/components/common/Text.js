import styled, { css } from 'styled-components';

const getVariantStyles = (variant = 'body') => {
  switch (variant) {
    case 'h1':
      return css`
        font-family: ${({ theme }) => theme.typography.titleFont};
        font-size: ${({ theme }) => theme.typography.h1};
        font-weight: 700;
        line-height: 1.2;
      `;
    case 'h2':
      return css`
        font-family: ${({ theme }) => theme.typography.titleFont};
        font-size: ${({ theme }) => theme.typography.h2};
        font-weight: 700;
        line-height: 1.2;
      `;
    case 'h3':
      return css`
        font-family: ${({ theme }) => theme.typography.titleFont};
        font-size: ${({ theme }) => theme.typography.h3};
        font-weight: 600;
        line-height: 1.3;
      `;
    case 'h4':
      return css`
        font-family: ${({ theme }) => theme.typography.titleFont};
        font-size: ${({ theme }) => theme.typography.h4};
        font-weight: 600;
        line-height: 1.3;
      `;
    case 'h5':
      return css`
        font-family: ${({ theme }) => theme.typography.titleFont};
        font-size: ${({ theme }) => theme.typography.h5};
        font-weight: 600;
        line-height: 1.4;
      `;
    case 'h6':
      return css`
        font-family: ${({ theme }) => theme.typography.titleFont};
        font-size: ${({ theme }) => theme.typography.h6};
        font-weight: 600;
        line-height: 1.4;
      `;
    case 'subtitle':
      return css`
        font-size: ${({ theme }) => theme.typography.h6};
        font-weight: 500;
        line-height: 1.5;
        color: ${({ theme }) => theme.colors.textLight};
      `;
    case 'small':
      return css`
        font-size: ${({ theme }) => theme.typography.small};
        line-height: 1.5;
      `;
    case 'tiny':
      return css`
        font-size: ${({ theme }) => theme.typography.tiny};
        line-height: 1.5;
      `;
    default:
      return css`
        font-size: ${({ theme }) => theme.typography.body};
        line-height: 1.6;
      `;
  }
};

const getColorStyles = (color) => {
  if (!color) return '';
  
  return css`
    color: ${({ theme }) => theme.colors[color] || color};
  `;
};

const Text = styled.p`
  margin: 0;
  ${({ variant }) => getVariantStyles(variant)}
  ${({ color }) => getColorStyles(color)}
  ${({ align }) => align && css`text-align: ${align};`}
  ${({ weight }) => weight && css`font-weight: ${weight};`}
  ${({ transform }) => transform && css`text-transform: ${transform};`}
  ${({ decoration }) => decoration && css`text-decoration: ${decoration};`}
  ${({ italic }) => italic && css`font-style: italic;`}
  ${({ truncate }) =>
    truncate &&
    css`
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    `}
  ${({ clamp }) =>
    clamp &&
    css`
      display: -webkit-box;
      -webkit-line-clamp: ${clamp};
      -webkit-box-orient: vertical;
      overflow: hidden;
    `}
`;

export default Text; 