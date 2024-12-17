// Gestion du menu mobile
export function handleMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const searchToggle = document.querySelector('.search-toggle');
    const searchBar = document.querySelector('.search-bar');
    const body = document.body;

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
            body.classList.toggle('menu-open');
            
            // Fermer la barre de recherche si elle est ouverte
            if (searchBar && searchBar.classList.contains('active')) {
                searchBar.classList.remove('active');
            }

            // Changer l'icône du hamburger
            const icon = hamburger.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });

        // Fermer le menu au clic sur un lien
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                body.classList.remove('menu-open');
                
                const icon = hamburger.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            });
        });

        // Fermer le menu au clic en dehors
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                body.classList.remove('menu-open');
                
                const icon = hamburger.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            }
        });

        // Fermer le menu au scroll
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > lastScroll && currentScroll > 50) {
                // Scroll vers le bas
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                body.classList.remove('menu-open');
                
                const icon = hamburger.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            }
            
            lastScroll = currentScroll;
        });
    }

    // Gestion de la barre de recherche
    if (searchToggle && searchBar) {
        searchToggle.addEventListener('click', (e) => {
            e.preventDefault();
            searchBar.classList.toggle('active');
            
            // Fermer le menu mobile si ouvert
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                body.classList.remove('menu-open');
                
                const icon = hamburger.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            }
        });

        // Fermer la recherche au clic en dehors
        document.addEventListener('click', (e) => {
            if (!searchBar.contains(e.target) && !searchToggle.contains(e.target)) {
                searchBar.classList.remove('active');
            }
        });

        // Focus automatique sur le champ de recherche
        searchBar.querySelector('input')?.addEventListener('focus', () => {
            searchBar.classList.add('active');
        });
    }
}

// Ajouter une navigation plus fluide
export const initSmoothNavigation = () => {
    // Améliorer la transition entre les pages
    const links = document.querySelectorAll('nav a');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = e.target.getAttribute('href');
            smoothTransition(target);
        });
    });
}

// Ajouter un indicateur de chargement
export const loadingIndicator = {
    show() {
        // Animation de chargement élégante
    },
    hide() {
        // Transition douce
    }
} 