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
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: ${props => props.theme.typography.bodyFont};
    font-size: ${props => props.theme.typography.body1.fontSize};
    line-height: ${props => props.theme.typography.body1.lineHeight};
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    overflow-x: hidden;
    min-height: 100vh;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${props => props.theme.typography.titleFont};
    margin-bottom: ${props => props.theme.spacing.md};
    color: ${props => props.theme.colors.text};
  }

  h1 {
    font-size: ${props => props.theme.typography.h1.fontSize};
    line-height: ${props => props.theme.typography.h1.lineHeight};
    font-weight: ${props => props.theme.typography.h1.fontWeight};
    letter-spacing: ${props => props.theme.typography.h1.letterSpacing};
  }

  h2 {
    font-size: ${props => props.theme.typography.h2.fontSize};
    line-height: ${props => props.theme.typography.h2.lineHeight};
    font-weight: ${props => props.theme.typography.h2.fontWeight};
    letter-spacing: ${props => props.theme.typography.h2.letterSpacing};
  }

  h3 {
    font-size: ${props => props.theme.typography.h3.fontSize};
    line-height: ${props => props.theme.typography.h3.lineHeight};
    font-weight: ${props => props.theme.typography.h3.fontWeight};
  }

  p {
    margin-bottom: ${props => props.theme.spacing.md};
    color: ${props => props.theme.colors.text};
  }

  a {
    color: ${props => props.theme.colors.primary};
    text-decoration: none;
    transition: ${props => props.theme.transitions.fast};
    cursor: pointer;

    &:hover {
      color: ${props => props.theme.colors.accent};
    }

    &:focus {
      outline: 2px solid ${props => props.theme.colors.primary};
      outline-offset: 2px;
    }
  }

  button {
    font-family: ${props => props.theme.typography.bodyFont};
    font-size: ${props => props.theme.typography.button.fontSize};
    font-weight: ${props => props.theme.typography.button.fontWeight};
    letter-spacing: ${props => props.theme.typography.button.letterSpacing};
    text-transform: ${props => props.theme.typography.button.textTransform};
    cursor: pointer;
    border: none;
    outline: none;
    transition: ${props => props.theme.transitions.medium};
    
    &:focus {
      outline: 2px solid ${props => props.theme.colors.primary};
      outline-offset: 2px;
    }
    
    &:disabled {
      cursor: not-allowed;
      opacity: 0.7;
    }
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  input, textarea, select {
    font-family: ${props => props.theme.typography.bodyFont};
    font-size: ${props => props.theme.typography.body2.fontSize};
    padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
    border: 1px solid ${props => props.theme.colors.border};
    border-radius: ${props => props.theme.borderRadius.medium};
    background-color: ${props => props.theme.colors.white};
    transition: ${props => props.theme.transitions.fast};

    &:focus {
      outline: none;
      border-color: ${props => props.theme.colors.primary};
      box-shadow: 0 0 0 2px ${props => props.theme.colors.primary}20;
    }
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
    background-color: ${props => props.theme.colors.error}10;
    border-radius: ${props => props.theme.borderRadius.medium};
    margin-bottom: ${props => props.theme.spacing.md};
  }

  .success-message {
    color: ${props => props.theme.colors.success};
    text-align: center;
    padding: ${props => props.theme.spacing.md};
    background-color: ${props => props.theme.colors.success}10;
    border-radius: ${props => props.theme.borderRadius.medium};
    margin-bottom: ${props => props.theme.spacing.md};
  }

  .warning-message {
    color: ${props => props.theme.colors.warning};
    text-align: center;
    padding: ${props => props.theme.spacing.md};
    background-color: ${props => props.theme.colors.warning}10;
    border-radius: ${props => props.theme.borderRadius.medium};
    margin-bottom: ${props => props.theme.spacing.md};
  }

  /* Accessibilité */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  /* Responsive */
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    html {
      font-size: 14px;
    }

    .container {
      padding: 0 ${props => props.theme.spacing.md};
    }

    .section {
      padding: ${props => props.theme.spacing.xl} 0;
    }
  }

  /* Animations */
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .fade-in {
    animation: fadeIn 0.3s ease-in-out;
  }

  .slide-up {
    animation: slideUp 0.4s ease-out;
  }
`; 