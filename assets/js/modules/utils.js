// Fonction debounce pour limiter les appels de fonction
export function debounce(func, wait) {
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

// Fonction pour afficher un état de chargement
export function showLoadingState(element) {
    element.disabled = true;
    element.dataset.originalText = element.textContent;
    element.innerHTML = `
        <span class="spinner"></span>
        <span>Chargement...</span>
    `;
}

// Fonction pour masquer l'état de chargement
export function hideLoadingState(element) {
    element.disabled = false;
    element.textContent = element.dataset.originalText;
}

// Fonction pour formater les prix
export function formatPrice(price) {
    return `${price.toFixed(2)} €`;
}

// Fonction pour valider un email
export function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Fonction pour valider un numéro de téléphone
export function validatePhone(phone) {
    return /^[0-9+\s-]{10,}$/.test(phone);
}

// Fonction pour générer un ID unique
export function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Fonction pour obtenir les paramètres d'URL
export function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const result = {};
    for (const [key, value] of params) {
        result[key] = value;
    }
    return result;
}

// Fonction pour détecter le mode sombre du système
export function prefersDarkMode() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

// Fonction pour détecter si l'appareil est mobile
export function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Fonction pour détecter si l'appareil est en mode portrait
export function isPortraitMode() {
    return window.matchMedia("(orientation: portrait)").matches;
}

// Fonction pour détecter la largeur de l'écran
export function getScreenSize() {
    if (window.innerWidth < 768) return 'mobile';
    if (window.innerWidth < 1024) return 'tablet';
    return 'desktop';
}

// Fonction pour copier du texte dans le presse-papier
export function copyToClipboard(text) {
    return navigator.clipboard.writeText(text);
}

// Fonction pour obtenir la position de défilement
export function getScrollPosition() {
    return {
        x: window.pageXOffset,
        y: window.pageYOffset
    };
}

// Fonction pour détecter si un élément est visible dans la fenêtre
export function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Fonction pour obtenir la distance entre deux éléments
export function getDistanceBetweenElements(element1, element2) {
    const rect1 = element1.getBoundingClientRect();
    const rect2 = element2.getBoundingClientRect();
    return {
        x: rect2.left - rect1.left,
        y: rect2.top - rect1.top
    };
}

// Fonction pour détecter le support des fonctionnalités du navigateur
export function browserSupports(feature) {
    const features = {
        webp: () => {
            const elem = document.createElement('canvas');
            return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
        },
        webgl: () => {
            try {
                return !!window.WebGLRenderingContext && 
                    !!document.createElement('canvas').getContext('experimental-webgl');
            } catch(e) {
                return false;
            }
        },
        touch: () => {
            return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        },
        geolocation: () => {
            return 'geolocation' in navigator;
        }
    };
    return features[feature] ? features[feature]() : false;
} 