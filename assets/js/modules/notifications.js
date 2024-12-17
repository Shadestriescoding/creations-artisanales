// Fonction pour afficher une notification
export function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icon = document.createElement('i');
    icon.className = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';
    
    const text = document.createElement('span');
    text.textContent = message;
    
    notification.appendChild(icon);
    notification.appendChild(text);
    
    document.body.appendChild(notification);

    // Animation
    requestAnimationFrame(() => {
        notification.classList.add('show');
    });

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Fonction pour créer une notification de succès
export function showSuccess(message) {
    showNotification(message, 'success');
}

// Fonction pour créer une notification d'erreur
export function showError(message) {
    showNotification(message, 'error');
}

// Fonction pour créer une notification d'avertissement
export function showWarning(message) {
    showNotification(message, 'warning');
}

// Fonction pour créer une notification d'information
export function showInfo(message) {
    showNotification(message, 'info');
}

// Fonction pour créer une notification personnalisée
export function showCustomNotification(message, options = {}) {
    const {
        type = 'custom',
        duration = 3000,
        position = 'bottom-right',
        icon = null,
        action = null
    } = options;

    const notification = document.createElement('div');
    notification.className = `notification notification-${type} notification-${position}`;
    
    if (icon) {
        const iconElement = document.createElement('i');
        iconElement.className = icon;
        notification.appendChild(iconElement);
    }
    
    const text = document.createElement('span');
    text.textContent = message;
    notification.appendChild(text);
    
    if (action) {
        const button = document.createElement('button');
        button.textContent = action.text;
        button.addEventListener('click', () => {
            action.callback();
            notification.remove();
        });
        notification.appendChild(button);
    }
    
    document.body.appendChild(notification);

    requestAnimationFrame(() => {
        notification.classList.add('show');
    });

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, duration);

    return notification;
} 