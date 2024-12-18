/**
 * Affiche une notification à l'utilisateur
 * @param {string} message - Le message à afficher
 * @param {string} type - Le type de notification (success, error, warning, info)
 */
export function showNotification(message, type = 'info') {
    const container = document.getElementById('notification-container');
    if (!container) return;

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 
                       type === 'error' ? 'fa-exclamation-circle' : 
                       type === 'warning' ? 'fa-exclamation-triangle' : 
                       'fa-info-circle'}"></i>
        <div class="notification-content">
            <p>${message}</p>
        </div>
    `;
    
    container.appendChild(notification);
    
    // Force le reflow pour déclencher l'animation
    notification.offsetHeight;
    
    // Ajoute la classe pour l'animation d'entrée
    notification.classList.add('show');
    
    // Auto-suppression après 5 secondes
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

/**
 * Supprime toutes les notifications
 */
export function clearNotifications() {
    const container = document.getElementById('notification-container');
    if (container) {
        container.innerHTML = '';
    }
} 