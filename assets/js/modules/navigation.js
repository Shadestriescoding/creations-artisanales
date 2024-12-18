/**
 * Module de navigation
 * Gère le menu mobile, la recherche et les animations de navigation
 */

import { showNotification } from './notifications.js';

// État de la navigation
const navState = {
    isMobileMenuOpen: false,
    isSearchOpen: false,
    isScrolled: false,
    isHidden: false,
    searchHistory: [],
    maxSearchHistory: 10
};

/**
 * Initialise la navigation
 * @returns {Promise<void>}
 */
export async function initNavigation() {
    try {
        await loadSearchHistory();
        setupMobileMenu();
        setupSearch();
        setupScrollBehavior();
        setupActiveLinks();
        setupAccessibility();
        return Promise.resolve();
    } catch (error) {
        console.error('Erreur lors de l\'initialisation de la navigation:', error);
        return Promise.reject(error);
    }
}

/**
 * Charge l'historique de recherche
 * @returns {Promise<void>}
 */
async function loadSearchHistory() {
    try {
        const history = localStorage.getItem('searchHistory');
        navState.searchHistory = history ? JSON.parse(history) : [];
    } catch (error) {
        console.error('Erreur lors du chargement de l\'historique de recherche:', error);
        navState.searchHistory = [];
    }
}

/**
 * Configure le menu mobile
 */
function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    if (!hamburger || !navLinks) {
        console.warn('Éléments du menu mobile non trouvés');
        return;
    }

    // Gestionnaire pour le bouton hamburger
    hamburger.addEventListener('click', () => {
        try {
            toggleMobileMenu(hamburger, navLinks, body);
        } catch (error) {
            console.error('Erreur lors de la bascule du menu mobile:', error);
            showNotification('Une erreur est survenue avec le menu', 'error');
        }
    });

    // Fermer le menu au clic sur un lien
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navState.isMobileMenuOpen) {
                toggleMobileMenu(hamburger, navLinks, body);
            }
        });
    });

    // Fermer le menu au redimensionnement de la fenêtre
    window.addEventListener('resize', debounce(() => {
        if (window.innerWidth > 768 && navState.isMobileMenuOpen) {
            toggleMobileMenu(hamburger, navLinks, body);
        }
    }, 250));
}

/**
 * Bascule l'état du menu mobile
 */
function toggleMobileMenu(hamburger, navLinks, body) {
    navState.isMobileMenuOpen = !navState.isMobileMenuOpen;
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    body.classList.toggle('menu-open');

    // Accessibilité
    hamburger.setAttribute('aria-expanded', navState.isMobileMenuOpen);
    
    // Animation des liens
    const links = navLinks.querySelectorAll('a');
    links.forEach((link, index) => {
        if (navState.isMobileMenuOpen) {
            link.style.transitionDelay = `${index * 0.1}s`;
            link.setAttribute('tabindex', '0');
        } else {
            link.style.transitionDelay = '0s';
            link.setAttribute('tabindex', '-1');
        }
    });
}

/**
 * Configure la barre de recherche
 */
function setupSearch() {
    const searchToggle = document.querySelector('.search-toggle');
    const searchBar = document.querySelector('.search-bar');
    const searchInput = searchBar?.querySelector('input');
    const searchButton = searchBar?.querySelector('button');

    if (!searchToggle || !searchBar || !searchInput || !searchButton) {
        console.warn('Éléments de recherche non trouvés');
        return;
    }

    // Gestionnaire pour le bouton de recherche
    searchToggle.addEventListener('click', (e) => {
        e.preventDefault();
        toggleSearch(searchBar, searchInput);
    });

    // Fermer la recherche au clic en dehors
    document.addEventListener('click', (e) => {
        if (!searchBar.contains(e.target) && !searchToggle.contains(e.target)) {
            closeSearch(searchBar);
        }
    });

    // Gestion de la recherche
    searchButton.addEventListener('click', () => handleSearch(searchInput.value));
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSearch(searchInput.value);
        }
    });

    // Suggestions de recherche
    setupSearchSuggestions(searchInput);
}

/**
 * Bascule l'état de la recherche
 */
function toggleSearch(searchBar, searchInput) {
    navState.isSearchOpen = !navState.isSearchOpen;
    searchBar.classList.toggle('active');
    
    if (navState.isSearchOpen) {
        searchInput.focus();
        showSearchHistory(searchInput);
    } else {
        closeSearch(searchBar);
    }
}

/**
 * Ferme la recherche
 */
function closeSearch(searchBar) {
    navState.isSearchOpen = false;
    searchBar.classList.remove('active');
    const suggestions = document.querySelector('.search-suggestions');
    if (suggestions) {
        suggestions.remove();
    }
}

/**
 * Configure les suggestions de recherche
 */
function setupSearchSuggestions(searchInput) {
    searchInput.addEventListener('input', debounce(async (e) => {
        const query = e.target.value.trim();
        if (query.length < 2) return;

        try {
            const suggestions = await fetchSearchSuggestions(query);
            displaySearchSuggestions(searchInput, suggestions);
        } catch (error) {
            console.error('Erreur lors de la récupération des suggestions:', error);
        }
    }, 300));
}

/**
 * Récupère les suggestions de recherche
 */
async function fetchSearchSuggestions(query) {
    // Simuler un appel API
    return navState.searchHistory
        .filter(item => item.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 5);
}

/**
 * Affiche les suggestions de recherche
 */
function displaySearchSuggestions(searchInput, suggestions) {
    let suggestionsEl = document.querySelector('.search-suggestions');
    
    if (!suggestionsEl) {
        suggestionsEl = document.createElement('div');
        suggestionsEl.className = 'search-suggestions';
        searchInput.parentNode.appendChild(suggestionsEl);
    }

    if (!suggestions.length) {
        suggestionsEl.remove();
        return;
    }

    suggestionsEl.innerHTML = suggestions
        .map(suggestion => `
            <div class="suggestion-item">
                <i class="fas fa-history"></i>
                <span>${suggestion}</span>
            </div>
        `)
        .join('');

    // Gestionnaires d'événements pour les suggestions
    suggestionsEl.querySelectorAll('.suggestion-item').forEach(item => {
        item.addEventListener('click', () => {
            searchInput.value = item.querySelector('span').textContent;
            handleSearch(searchInput.value);
        });
    });
}

/**
 * Gère la recherche
 */
function handleSearch(query) {
    query = query.trim();
    if (!query) return;

    try {
        // Mettre à jour l'historique
        navState.searchHistory = [
            query,
            ...navState.searchHistory.filter(item => item !== query)
        ].slice(0, navState.maxSearchHistory);
        
        localStorage.setItem('searchHistory', JSON.stringify(navState.searchHistory));

        // Rediriger vers la page de recherche
        window.location.href = `recherche.html?q=${encodeURIComponent(query)}`;
    } catch (error) {
        console.error('Erreur lors de la recherche:', error);
        showNotification('Une erreur est survenue lors de la recherche', 'error');
    }
}

/**
 * Configure le comportement au défilement
 */
function setupScrollBehavior() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    let lastScroll = 0;
    let scrollTimeout;

    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }

        scrollTimeout = window.requestAnimationFrame(() => {
            const currentScroll = window.pageYOffset;

            // Classe scrolled
            if (currentScroll > 50 !== navState.isScrolled) {
                navState.isScrolled = currentScroll > 50;
                navbar.classList.toggle('scrolled', navState.isScrolled);
            }

            // Masquer/afficher la navbar
            if (currentScroll > lastScroll && currentScroll > 100 !== navState.isHidden) {
                navState.isHidden = currentScroll > lastScroll && currentScroll > 100;
                navbar.classList.toggle('nav-hidden', navState.isHidden);
            }

            lastScroll = currentScroll;
        });
    });
}

/**
 * Met à jour les liens actifs dans la navigation
 */
function setupActiveLinks() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        const isActive = link.getAttribute('href') === currentPath.split('/').pop();
        link.classList.toggle('active', isActive);
        if (isActive) {
            link.setAttribute('aria-current', 'page');
        }
    });
}

/**
 * Configure l'accessibilité
 */
function setupAccessibility() {
    // Gestion du focus
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
        skipLink.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(skipLink.getAttribute('href'));
            if (target) {
                target.tabIndex = -1;
                target.focus();
            }
        });
    }

    // Support des raccourcis clavier
    document.addEventListener('keydown', (e) => {
        // Échap ferme le menu mobile et la recherche
        if (e.key === 'Escape') {
            if (navState.isMobileMenuOpen) {
                const hamburger = document.querySelector('.hamburger');
                const navLinks = document.querySelector('.nav-links');
                const body = document.body;
                if (hamburger && navLinks && body) {
                    toggleMobileMenu(hamburger, navLinks, body);
                }
            }
            if (navState.isSearchOpen) {
                const searchBar = document.querySelector('.search-bar');
                if (searchBar) {
                    closeSearch(searchBar);
                }
            }
        }
    });
}

/**
 * Utilitaire pour debounce
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

export default {
    initNavigation,
    getState: () => ({ ...navState })
}; 