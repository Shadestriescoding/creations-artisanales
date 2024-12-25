import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Lato:wght@300;400;700&display=swap');

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: ${({ theme }) => theme.typography.bodyFont};
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.typography.titleFont};
    font-weight: 600;
    line-height: 1.3;
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  h1 { font-size: ${({ theme }) => theme.typography.h1}; }
  h2 { font-size: ${({ theme }) => theme.typography.h2}; }
  h3 { font-size: ${({ theme }) => theme.typography.h3}; }
  h4 { font-size: ${({ theme }) => theme.typography.h4}; }
  h5 { font-size: ${({ theme }) => theme.typography.h5}; }
  h6 { font-size: ${({ theme }) => theme.typography.h6}; }

  p {
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    transition: ${({ theme }) => theme.transitions.fast};

    &:hover {
      color: ${({ theme }) => theme.colors.primaryDark};
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
    background: none;
    font-family: inherit;
  }

  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
  }

  ul, ol {
    list-style: none;
  }

  ::selection {
    background-color: ${({ theme }) => theme.colors.primary}40;
    color: ${({ theme }) => theme.colors.text};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    html {
      font-size: 14px;
    }

    h1 { font-size: calc(${({ theme }) => theme.typography.h1} * 0.8); }
    h2 { font-size: calc(${({ theme }) => theme.typography.h2} * 0.8); }
    h3 { font-size: calc(${({ theme }) => theme.typography.h3} * 0.8); }
  }
`;

export default GlobalStyles;
