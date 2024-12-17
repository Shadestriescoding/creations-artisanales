// Constantes pour les types de notifications
const NOTIFICATION_TYPES = {
    SUCCESS: 'success',
    ERROR: 'error',
    INFO: 'info'
};

// Styles des notifications selon la charte graphique
const NOTIFICATION_STYLES = {
    [NOTIFICATION_TYPES.SUCCESS]: {
        backgroundColor: '#C2D3C1', // Vert sauge clair
        color: '#8E7A5F',          // Marron doux
        icon: '✓'
    },
    [NOTIFICATION_TYPES.ERROR]: {
        backgroundColor: '#F2D1D1', // Rose poudré
        color: '#8E7A5F',          // Marron doux
        icon: '✕'
    },
    [NOTIFICATION_TYPES.INFO]: {
        backgroundColor: '#F7F7F7', // Gris clair
        color: '#8E7A5F',          // Marron doux
        icon: 'ℹ'
    }
};

// Durée d'affichage par défaut
const DEFAULT_DURATION = 3000;

/**
 * Affiche une notification stylisée
 * @param {string} message - Le message à afficher
 * @param {string} type - Le type de notification (success, error, info)
 * @param {number} duration - La durée d'affichage en millisecondes
 */
export function showNotification(message, type = NOTIFICATION_TYPES.INFO, duration = DEFAULT_DURATION) {
    // Création du conteneur de notifications s'il n'existe pas
    let container = document.querySelector('.notifications-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'notifications-container';
        document.body.appendChild(container);

        // Ajout des styles pour le conteneur
        const style = document.createElement('style');
        style.textContent = `
            .notifications-container {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 1000;
                display: flex;
                flex-direction: column;
                gap: 10px;
                font-family: 'Lato', sans-serif;
            }

            .notification {
                padding: 12px 24px;
                border-radius: 8px;
                display: flex;
                align-items: center;
                gap: 12px;
                box-shadow: 0 2px 4px rgba(142, 122, 95, 0.1);
                animation: slideIn 0.3s ease-out forwards;
                max-width: 300px;
                font-weight: 500;
            }

            .notification-icon {
                font-size: 1.2em;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                background-color: rgba(142, 122, 95, 0.1);
            }

            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }

            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Création de la notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    
    // Application des styles selon le type
    const style = NOTIFICATION_STYLES[type] || NOTIFICATION_STYLES[NOTIFICATION_TYPES.INFO];
    notification.style.backgroundColor = style.backgroundColor;
    notification.style.color = style.color;

    // Création de l'icône
    const icon = document.createElement('span');
    icon.className = 'notification-icon';
    icon.textContent = style.icon;

    // Création du message
    const messageElement = document.createElement('span');
    messageElement.textContent = message;

    // Assemblage de la notification
    notification.appendChild(icon);
    notification.appendChild(messageElement);
    container.appendChild(notification);

    // Animation de sortie et suppression
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out forwards';
        setTimeout(() => {
            container.removeChild(notification);
            // Suppression du conteneur s'il est vide
            if (container.children.length === 0) {
                document.body.removeChild(container);
            }
        }, 300);
    }, duration);
}

export default {
    showNotification,
    NOTIFICATION_TYPES
}; 