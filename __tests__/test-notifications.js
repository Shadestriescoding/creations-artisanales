// Mock de setTimeout pour accélérer les tests
jest.useFakeTimers();

const { showNotification } = require('../assets/js/modules/notifications.js');

describe('Notifications', () => {
    beforeEach(() => {
        // Nettoyer le DOM avant chaque test
        document.body.innerHTML = '';
        jest.clearAllTimers();
    });

    afterEach(() => {
        // Nettoyer les timers après chaque test
        jest.clearAllTimers();
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
        const notification = document.querySelector('.notification-success');
        expect(notification).not.toBeNull();
        expect(notification.classList.contains('show')).toBe(true);
    });

    test('showNotification avec type error ajoute la classe appropriée', () => {
        showNotification('Error message', 'error');
        const notification = document.querySelector('.notification-error');
        expect(notification).not.toBeNull();
        expect(notification.classList.contains('show')).toBe(true);
    });

    test('La notification disparaît après un délai', () => {
        showNotification('Test message');
        const notification = document.querySelector('.notification');
        
        expect(notification.classList.contains('show')).toBe(true);
        
        // Avancer le temps de 3 secondes
        jest.advanceTimersByTime(3000);
        
        expect(notification.classList.contains('show')).toBe(false);
    });

    test('Plusieurs notifications peuvent être affichées simultanément', () => {
        showNotification('First notification');
        showNotification('Second notification');
        
        const notifications = document.querySelectorAll('.notification');
        expect(notifications.length).toBe(2);
    });

    test('Les notifications sont supprimées du DOM après disparition', () => {
        showNotification('Test message');
        
        // Avancer le temps de 3.5 secondes (3s + 0.5s pour l'animation)
        jest.advanceTimersByTime(3500);
        
        const notifications = document.querySelectorAll('.notification');
        expect(notifications.length).toBe(0);
    });
}); 