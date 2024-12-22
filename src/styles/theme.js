const theme = {
  colors: {
    primary: '#E5B5B0', // Rose poudré
    primaryLight: '#F2D5D0',
    primaryDark: '#C99B96',
    accent: '#A4C3B9', // Vert sauge
    accentLight: '#C6DDD6',
    accentDark: '#89A69D',
    background: '#FAF7F7', // Blanc cassé
    backgroundAlt: '#F0EBEB',
    text: '#4A4545',
    textLight: '#847D7D',
    white: '#FFFFFF',
    error: '#E77D7D',
    errorLight: '#FFE9E9',
    errorDark: '#C65F5F',
    success: '#7DB982',
    successLight: '#E9F5EA',
    successDark: '#5F9A64',
    border: '#E5E0E0',
    overlay: 'rgba(74, 69, 69, 0.7)'
  },

  typography: {
    titleFont: "'Playfair Display', serif",
    bodyFont: "'Lato', sans-serif",
    h1: '3rem',
    h2: '2.5rem',
    h3: '2rem',
    h4: '1.5rem',
    h5: '1.25rem',
    h6: '1rem',
    body: '1rem',
    small: '0.875rem',
    tiny: '0.75rem'
  },

  spacing: {
    xxs: '0.25rem',
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
    xxxl: '4rem'
  },

  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '16px',
    xl: '24px',
    round: '50%'
  },

  shadows: {
    small: '0 2px 4px rgba(0, 0, 0, 0.05)',
    medium: '0 4px 12px rgba(0, 0, 0, 0.08)',
    large: '0 8px 24px rgba(0, 0, 0, 0.12)',
    soft: '0 4px 12px rgba(229, 181, 176, 0.15)', // Ombre douce avec la couleur primaire
    hover: '0 8px 32px rgba(229, 181, 176, 0.25)' // Ombre au hover avec la couleur primaire
  },

  transitions: {
    fast: 'all 0.2s ease',
    medium: 'all 0.3s ease',
    slow: 'all 0.5s ease',
    bounce: 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
  },

  breakpoints: {
    mobile: '576px',
    tablet: '768px',
    laptop: '992px',
    desktop: '1200px'
  },

  layout: {
    maxWidth: '1200px',
    contentWidth: '800px',
    sidebarWidth: '300px',
    headerHeight: '80px',
    footerHeight: '200px'
  },

  zIndex: {
    modal: 1000,
    overlay: 900,
    dropdown: 800,
    header: 700,
    footer: 600
  }
};

// Ajout des variantes de couleurs pour les états
theme.colors.buttonHover = theme.colors.primaryDark;
theme.colors.buttonActive = theme.colors.primary;
theme.colors.buttonDisabled = theme.colors.textLight;
theme.colors.inputFocus = theme.colors.primaryLight;
theme.colors.inputError = theme.colors.error;
theme.colors.inputSuccess = theme.colors.success;

// Ajout des styles spécifiques pour les éléments de navigation
theme.nav = {
  height: '60px',
  background: theme.colors.white,
  textColor: theme.colors.text,
  activeColor: theme.colors.primary,
  hoverColor: theme.colors.primaryLight,
  mobileBreakpoint: theme.breakpoints.tablet
};

// Ajout des styles pour les cartes produits
theme.card = {
  background: theme.colors.white,
  border: `1px solid ${theme.colors.border}`,
  borderRadius: theme.borderRadius.large,
  shadow: theme.shadows.small,
  hoverShadow: theme.shadows.hover,
  padding: theme.spacing.lg,
  imageRatio: '1/1'
};

// Ajout des styles pour les formulaires
theme.form = {
  inputHeight: '48px',
  inputPadding: theme.spacing.md,
  inputBorder: `2px solid ${theme.colors.border}`,
  inputBorderRadius: theme.borderRadius.medium,
  inputFocusShadow: `0 0 0 3px ${theme.colors.primaryLight}40`,
  labelMargin: theme.spacing.xs,
  helperTextSize: theme.typography.small,
  errorColor: theme.colors.error,
  successColor: theme.colors.success
};

// Ajout des styles pour les boutons
theme.button = {
  height: '48px',
  padding: `${theme.spacing.md} ${theme.spacing.xl}`,
  borderRadius: theme.borderRadius.medium,
  fontSize: theme.typography.body,
  fontWeight: '600',
  transition: theme.transitions.medium,
  shadow: theme.shadows.small,
  hoverShadow: theme.shadows.hover
};

export default theme; 