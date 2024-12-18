export const theme = {
  colors: {
    primary: '#E8B4B8', // Rose poudré plus doux
    primaryLight: '#F5D6D9', // Version claire du rose
    primaryDark: '#D49599', // Version foncée du rose
    secondary: '#A7C4BC', // Vert sauge plus doux
    secondaryLight: '#C2D8D2', // Version claire du vert
    accent: '#967A6D', // Marron doux
    accentLight: '#B39C92', // Version claire du marron
    background: '#FAF7F7', // Fond légèrement rosé
    backgroundAlt: '#F0E9E9', // Fond alternatif
    text: '#4A4A4A', // Texte principal
    textLight: '#6E6E6E', // Texte secondaire
    white: '#FFFFFF',
    error: '#E57373',
    success: '#81C784',
    warning: '#FFD54F',
  },
  typography: {
    titleFont: "'Cormorant Garamond', serif", // Police plus élégante pour les titres
    bodyFont: "'Lato', sans-serif", // Police moderne pour le texte
    h1: {
      fontSize: '2.5rem',
      fontWeight: '600',
      letterSpacing: '-0.5px',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: '500',
      letterSpacing: '-0.3px',
    },
    h3: {
      fontSize: '1.3rem',
      fontWeight: '500',
      letterSpacing: '-0.2px',
    },
    body: {
      fontSize: '1rem',
      lineHeight: '1.6',
    },
  },
  shadows: {
    small: '0 2px 8px rgba(0,0,0,0.1)',
    medium: '0 4px 12px rgba(0,0,0,0.1)',
    large: '0 8px 24px rgba(0,0,0,0.1)',
    hover: '0 6px 16px rgba(0,0,0,0.1)',
  },
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '12px',
    xl: '16px',
    round: '50%',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },
  transitions: {
    fast: 'all 0.2s ease',
    medium: 'all 0.3s ease',
    slow: 'all 0.4s ease',
  },
  breakpoints: {
    mobile: '320px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1400px',
  }
}; 