export const theme = {
  colors: {
    primary: '#e4a7b9', // Rose poudré plus doux
    secondary: '#a7c4bc', // Vert sauge plus doux
    accent: '#d88c9a', // Rose vintage
    background: '#fdf6f8', // Fond très légèrement rosé
    backgroundAlt: '#f8f1f3',
    text: '#2c2c2c',
    textLight: '#666666',
    white: '#ffffff',
    error: '#e57373',
    success: '#81c784',
  },
  
  typography: {
    titleFont: "'Playfair Display', serif", // Police élégante pour les titres
    bodyFont: "'Lato', sans-serif", // Police moderne pour le texte
    h1: {
      fontSize: '2.8rem',
      lineHeight: 1.2,
      fontWeight: 700,
    },
    h2: {
      fontSize: '2.2rem',
      lineHeight: 1.3,
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.6rem',
      lineHeight: 1.4,
      fontWeight: 500,
    },
    body: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
  },
  
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },
  
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '12px',
    round: '50%',
  },
  
  shadows: {
    small: '0 2px 4px rgba(0,0,0,0.1)',
    medium: '0 4px 6px rgba(0,0,0,0.1)',
    large: '0 8px 16px rgba(0,0,0,0.1)',
    hover: '0 8px 20px rgba(0,0,0,0.15)',
  },
  
  transitions: {
    fast: 'all 0.2s ease',
    medium: 'all 0.3s ease',
    slow: 'all 0.5s ease',
  },
  
  breakpoints: {
    mobile: '576px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1200px',
  },
  
  container: {
    padding: '0 1rem',
    maxWidth: '1200px',
  },
}; 