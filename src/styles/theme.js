const theme = {
    colors: {
        primary: '#E5B5B0',        // Rose poudré principal
        primaryLight: '#F2D5D0',   // Rose poudré clair
        primaryDark: '#C99B96',    // Rose poudré foncé
        secondary: '#A4C3B9',      // Vert sauge
        secondaryLight: '#B8D1C9', // Vert sauge clair
        secondaryDark: '#8AA69C',  // Vert sauge foncé
        background: '#F5F0EE',     // Beige très clair pour le fond
        backgroundAlt: '#EBE5E3',  // Beige plus foncé pour les sections alternées
        surface: '#FFFFFF',        // Blanc pour les cartes et conteneurs
        text: '#4A4545',          // Gris foncé pour le texte
        textLight: '#847D7D',     // Gris clair pour le texte secondaire
        border: '#E5E0E0',        // Couleur de bordure
        error: '#E77D7D',         // Rouge doux pour les erreurs
        success: '#7DB982',       // Vert doux pour les succès
        overlay: 'rgba(74, 69, 69, 0.7)'
    },

    typography: {
        titleFont: '\'Playfair Display\', serif',
        bodyFont: '\'Lato\', sans-serif',
        h1: '3.5rem',
        h2: '2.8rem',
        h3: '2.2rem',
        h4: '1.8rem',
        h5: '1.4rem',
        h6: '1.2rem',
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
        soft: '0 4px 12px rgba(229, 181, 176, 0.15)',
        hover: '0 8px 32px rgba(229, 181, 176, 0.25)'
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
        footerHeight: '200px',
        navbarHeight: '60px'
    },

    components: {
        card: {
            background: '#FFFFFF',
            border: '1px solid #E5E0E0',
            borderRadius: '16px',
            padding: '1.5rem',
            shadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
            hoverShadow: '0 8px 24px rgba(229, 181, 176, 0.25)'
        },
        button: {
            height: '48px',
            padding: '0 2rem',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: '600',
            primary: {
                background: '#E5B5B0',
                color: '#FFFFFF',
                hover: '#C99B96'
            },
            secondary: {
                background: '#A4C3B9',
                color: '#FFFFFF',
                hover: '#8AA69C'
            },
            outline: {
                border: '2px solid #E5B5B0',
                color: '#E5B5B0',
                hover: '#F2D5D0'
            }
        },
        input: {
            height: '48px',
            padding: '0 1rem',
            borderRadius: '8px',
            border: '2px solid #E5E0E0',
            focus: {
                borderColor: '#E5B5B0',
                shadow: '0 0 0 3px rgba(229, 181, 176, 0.2)'
            }
        }
    }
};

export default theme;
