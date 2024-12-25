import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Lato:wght@300;400;700&display=swap');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: ${props => props.theme.typography.bodyFont};
    color: ${props => props.theme.colors.text};
    line-height: ${props => props.theme.typography.body.lineHeight};
    background-color: ${props => props.theme.colors.background};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${props => props.theme.typography.titleFont};
    margin-bottom: ${props => props.theme.spacing.md};
    color: ${props => props.theme.colors.text};
    font-weight: 500;
  }

  h1 {
    font-size: ${props => props.theme.typography.h1.fontSize};
    letter-spacing: ${props => props.theme.typography.h1.letterSpacing};
    font-weight: ${props => props.theme.typography.h1.fontWeight};
  }

  h2 {
    font-size: ${props => props.theme.typography.h2.fontSize};
    letter-spacing: ${props => props.theme.typography.h2.letterSpacing};
  }

  h3 {
    font-size: ${props => props.theme.typography.h3.fontSize};
    letter-spacing: ${props => props.theme.typography.h3.letterSpacing};
  }

  p {
    margin-bottom: ${props => props.theme.spacing.md};
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  button {
    font-family: ${props => props.theme.typography.bodyFont};
    cursor: pointer;
    border: none;
    outline: none;
    background: none;
    font-size: inherit;
  }

  a {
    color: inherit;
    text-decoration: none;
    transition: ${props => props.theme.transitions.fast};
  }

  ::selection {
    background-color: ${props => props.theme.colors.primary};
    color: white;
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.backgroundAlt};
  }

  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.primary};
    border-radius: ${props => props.theme.borderRadius.medium};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.colors.primaryDark};
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    html {
      font-size: 14px;
    }
  }
`;
