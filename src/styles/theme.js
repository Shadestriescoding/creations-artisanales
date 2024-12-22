export const theme = {
  colors: {
    primary: '#e4a7b9', // Rose poudré plus doux
    secondary: '#a7c4bc', // Vert sauge plus doux
    accent: '#d88c9a', // Rose vintage
    background: '#fdf6f8', // Fond très légèrement rosé
    backgroundAlt: '#f8f1f3', // Fond alternatif plus foncé
    backgroundLight: '#fff9fb', // Fond très clair
    text: '#2c2c2c',
    textLight: '#666666',
    textMuted: '#999999',
    white: '#ffffff',
    error: '#e57373',
    success: '#81c784',
    warning: '#ffd54f',
    border: '#e0e0e0',
    shadow: 'rgba(0, 0, 0, 0.1)',
  },
  
  typography: {
    titleFont: "'Playfair Display', serif",
    bodyFont: "'Lato', sans-serif",
    h1: {
      fontSize: '2.8rem',
      lineHeight: 1.2,
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '2.2rem',
      lineHeight: 1.3,
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '1.8rem',
      lineHeight: 1.4,
      fontWeight: 500,
    },
    h4: {
      fontSize: '1.4rem',
      lineHeight: 1.4,
      fontWeight: 500,
    },
    body1: {
      fontSize: '1.1rem',
      lineHeight: 1.6,
      fontWeight: 400,
    },
    body2: {
      fontSize: '0.95rem',
      lineHeight: 1.5,
      fontWeight: 400,
    },
    caption: {
      fontSize: '0.85rem',
      lineHeight: 1.4,
      fontWeight: 400,
    },
    button: {
      fontSize: '1rem',
      lineHeight: 1.5,
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
    },
  },
  
  spacing: {
    xxs: '0.125rem',
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
    xxxl: '4rem',
  },
  
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '12px',
    xl: '16px',
    xxl: '24px',
    round: '50%',
  },
  
  shadows: {
    small: '0 2px 4px rgba(0,0,0,0.1)',
    medium: '0 4px 6px rgba(0,0,0,0.1)',
    large: '0 8px 16px rgba(0,0,0,0.1)',
    hover: '0 8px 20px rgba(0,0,0,0.15)',
    button: '0 2px 4px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.05)',
    card: '0 4px 8px rgba(0,0,0,0.05), 0 8px 16px rgba(0,0,0,0.05)',
  },
  
  transitions: {
    fast: 'all 0.2s ease',
    medium: 'all 0.3s ease',
    slow: 'all 0.5s ease',
    bounce: 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
  
  breakpoints: {
    mobile: '576px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1200px',
    ultraWide: '1440px',
  },
  
  container: {
    padding: '0 1rem',
    maxWidth: '1200px',
    gutter: '2rem',
  },
  
  zIndex: {
    modal: 1000,
    overlay: 900,
    dropdown: 800,
    header: 700,
    footer: 600,
  },
}; 