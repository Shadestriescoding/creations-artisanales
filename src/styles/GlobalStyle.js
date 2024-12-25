import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
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
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.typography.titleFont};
    font-weight: 500;
    line-height: 1.2;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    color: ${({ theme }) => theme.colors.text};
  }

  h1 {
    font-size: ${({ theme }) => theme.typography.h1};
    letter-spacing: -0.02em;
  }

  h2 {
    font-size: ${({ theme }) => theme.typography.h2};
    letter-spacing: -0.01em;
  }

  h3 { font-size: ${({ theme }) => theme.typography.h3}; }
  h4 { font-size: ${({ theme }) => theme.typography.h4}; }
  h5 { font-size: ${({ theme }) => theme.typography.h5}; }
  h6 { font-size: ${({ theme }) => theme.typography.h6}; }

  p {
    margin-bottom: ${({ theme }) => theme.spacing.md};
    font-size: ${({ theme }) => theme.typography.body};
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
    display: block;
  }

  button {
    font-family: ${({ theme }) => theme.typography.bodyFont};
    cursor: pointer;
    border: none;
    background: none;
    font-size: ${({ theme }) => theme.typography.body};
    transition: ${({ theme }) => theme.transitions.medium};

    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }

  input, textarea, select {
    font-family: ${({ theme }) => theme.typography.bodyFont};
    font-size: ${({ theme }) => theme.typography.body};
    width: 100%;
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
    border: ${({ theme }) => theme.form.inputBorder};
    border-radius: ${({ theme }) => theme.form.inputBorderRadius};
    background-color: ${({ theme }) => theme.colors.white};
    transition: ${({ theme }) => theme.transitions.fast};

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary};
      box-shadow: ${({ theme }) => theme.form.inputFocusShadow};
    }

    &::placeholder {
      color: ${({ theme }) => theme.colors.textLight};
    }
  }

  ul, ol {
    margin-bottom: ${({ theme }) => theme.spacing.md};
    padding-left: ${({ theme }) => theme.spacing.xl};
  }

  li {
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }

  .container {
    width: 100%;
    max-width: ${({ theme }) => theme.layout.maxWidth};
    margin: 0 auto;
    padding: 0 ${({ theme }) => theme.spacing.md};

    @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
      padding: 0 ${({ theme }) => theme.spacing.lg};
    }
  }

  .section {
    padding: ${({ theme }) => theme.spacing.xxl} 0;
  }

  .card {
    background: ${({ theme }) => theme.colors.white};
    border-radius: ${({ theme }) => theme.card.borderRadius};
    box-shadow: ${({ theme }) => theme.card.shadow};
    transition: ${({ theme }) => theme.transitions.medium};
    overflow: hidden;

    &:hover {
      box-shadow: ${({ theme }) => theme.card.hoverShadow};
      transform: translateY(-2px);
    }
  }

  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: ${({ theme }) => theme.button.height};
    padding: 0 ${({ theme }) => theme.spacing.xl};
    border-radius: ${({ theme }) => theme.button.borderRadius};
    font-weight: 600;
    text-align: center;
    text-decoration: none;
    transition: ${({ theme }) => theme.transitions.medium};
    cursor: pointer;

    &-primary {
      background-color: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.white};

      &:hover {
        background-color: ${({ theme }) => theme.colors.primaryDark};
      }
    }

    &-secondary {
      background-color: ${({ theme }) => theme.colors.accent};
      color: ${({ theme }) => theme.colors.white};

      &:hover {
        background-color: ${({ theme }) => theme.colors.accentDark};
      }
    }

    &-outline {
      background-color: transparent;
      border: 2px solid ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.primary};

      &:hover {
        background-color: ${({ theme }) => theme.colors.primary};
        color: ${({ theme }) => theme.colors.white};
      }
    }
  }

  .text-center { text-align: center; }
  .text-left { text-align: left; }
  .text-right { text-align: right; }

  .mb-0 { margin-bottom: 0; }
  .mb-1 { margin-bottom: ${({ theme }) => theme.spacing.xs}; }
  .mb-2 { margin-bottom: ${({ theme }) => theme.spacing.sm}; }
  .mb-3 { margin-bottom: ${({ theme }) => theme.spacing.md}; }
  .mb-4 { margin-bottom: ${({ theme }) => theme.spacing.lg}; }
  .mb-5 { margin-bottom: ${({ theme }) => theme.spacing.xl}; }

  .mt-0 { margin-top: 0; }
  .mt-1 { margin-top: ${({ theme }) => theme.spacing.xs}; }
  .mt-2 { margin-top: ${({ theme }) => theme.spacing.sm}; }
  .mt-3 { margin-top: ${({ theme }) => theme.spacing.md}; }
  .mt-4 { margin-top: ${({ theme }) => theme.spacing.lg}; }
  .mt-5 { margin-top: ${({ theme }) => theme.spacing.xl}; }

  .fade-enter {
    opacity: 0;
  }

  .fade-enter-active {
    opacity: 1;
    transition: opacity 300ms ease-in;
  }

  .fade-exit {
    opacity: 1;
  }

  .fade-exit-active {
    opacity: 0;
    transition: opacity 300ms ease-out;
  }

  ::selection {
    background-color: ${({ theme }) => theme.colors.primaryLight};
    color: ${({ theme }) => theme.colors.text};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    html {
      font-size: 14px;
    }

    h1 {
      font-size: calc(${({ theme }) => theme.typography.h1} * 0.8);
    }

    h2 {
      font-size: calc(${({ theme }) => theme.typography.h2} * 0.85);
    }

    h3 {
      font-size: calc(${({ theme }) => theme.typography.h3} * 0.9);
    }

    .section {
      padding: ${({ theme }) => theme.spacing.xl} 0;
    }

    .container {
      padding: 0 ${({ theme }) => theme.spacing.md};
    }
  }

  .nav-link {
    color: ${({ theme }) => theme.colors.text};
    position: relative;
    padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
    
    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 50%;
      width: 0;
      height: 2px;
      background-color: ${({ theme }) => theme.colors.primary};
      transition: ${({ theme }) => theme.transitions.medium};
      transform: translateX(-50%);
    }

    &:hover::after,
    &.active::after {
      width: calc(100% - ${({ theme }) => theme.spacing.md});
    }

    &.active {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

export default GlobalStyle;
