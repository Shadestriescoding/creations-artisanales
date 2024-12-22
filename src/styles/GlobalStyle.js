import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Lato:wght@300;400;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: ${props => props.theme.typography.bodyFont};
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    line-height: 1.6;
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${props => props.theme.typography.titleFont};
    margin-bottom: ${props => props.theme.spacing.md};
    font-weight: 500;
  }

  a {
    color: ${props => props.theme.colors.primary};
    text-decoration: none;
    transition: ${props => props.theme.transitions.fast};

    &:hover {
      color: ${props => props.theme.colors.accent};
    }
  }

  button {
    cursor: pointer;
    font-family: ${props => props.theme.typography.bodyFont};
    border: none;
    outline: none;
    
    &:disabled {
      cursor: not-allowed;
      opacity: 0.7;
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  .app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  main {
    flex: 1;
    padding: ${props => props.theme.spacing.xl} 0;
  }

  .container {
    width: 100%;
    max-width: ${props => props.theme.container.maxWidth};
    margin: 0 auto;
    padding: 0 ${props => props.theme.container.padding};
  }

  .section {
    padding: ${props => props.theme.spacing.xxl} 0;
  }

  .text-center {
    text-align: center;
  }

  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 200px;
  }

  .error-message {
    color: ${props => props.theme.colors.error};
    text-align: center;
    padding: ${props => props.theme.spacing.md};
  }

  .success-message {
    color: ${props => props.theme.colors.success};
    text-align: center;
    padding: ${props => props.theme.spacing.md};
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    html {
      font-size: 14px;
    }
  }
`; 