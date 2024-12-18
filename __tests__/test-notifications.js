import { showNotification, clearNotifications } from '../assets/js/modules/notifications.js';

describe('Notifications', () => {
    beforeEach(() => {
        // Mise en place du DOM pour les tests
        document.body.innerHTML = `
            <div id="notification-container"></div>
        `;
        jest.useFakeTimers();
    });

    afterEach(() => {
        // Nettoyage après chaque test
        document.body.innerHTML = '';
        jest.clearAllTimers();
        jest.useRealTimers();
    });

    test('showNotification crée et affiche une notification', () => {
        const message = 'Test notification';
        showNotification(message);
        
        const notification = document.querySelector('.notification');
        expect(notification).not.toBeNull();
        expect(notification.textContent).toContain(message);
        expect(notification.classList.contains('show')).toBe(true);
    });

    test('showNotification avec type success ajoute la classe appropriée', () => {
        showNotification('Success message', 'success');
        const notification = document.querySelector('.notification');
        expect(notification).not.toBeNull();
        expect(notification.classList.contains('success')).toBe(true);
    });

    test('showNotification avec type error ajoute la classe appropriée', () => {
        showNotification('Error message', 'error');
        const notification = document.querySelector('.notification');
        expect(notification).not.toBeNull();
        expect(notification.classList.contains('error')).toBe(true);
    });

    test('La notification disparaît après un délai', () => {
        showNotification('Test message');
        const notification = document.querySelector('.notification');
        
        expect(notification.classList.contains('show')).toBe(true);
        
        // Avancer le temps de 5 secondes
        jest.advanceTimersByTime(5000);
        
        expect(notification.classList.contains('show')).toBe(false);
        
        // Avancer le temps de 300ms supplémentaires pour l'animation de sortie
        jest.advanceTimersByTime(300);
        
        expect(document.querySelector('.notification')).toBeNull();
    });

    test('Plusieurs notifications peuvent être affichées simultanément', () => {
        showNotification('First message');
        showNotification('Second message');
        
        const notifications = document.querySelectorAll('.notification');
        expect(notifications.length).toBe(2);
    });

    test('Les notifications sont supprimées du DOM après disparition', () => {
        showNotification('Test message');
        
        jest.advanceTimersByTime(5300); // 5000ms + 300ms pour l'animation
        
        const notifications = document.querySelectorAll('.notification');
        expect(notifications.length).toBe(0);
    });

    test('clearNotifications supprime toutes les notifications', () => {
        showNotification('First message');
        showNotification('Second message');
        
        clearNotifications();
        
        const notifications = document.querySelectorAll('.notification');
        expect(notifications.length).toBe(0);
    });
}); 