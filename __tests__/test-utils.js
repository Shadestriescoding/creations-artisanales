// Tests des fonctions utilitaires
const { validateEmail, validatePhone, formatPrice, debounce } = require('../assets/js/modules/utils.js');

describe('Fonctions utilitaires', () => {
    // Tests de validation d'email
    test('validateEmail', () => {
        expect(validateEmail('test@example.com')).toBe(true);
        expect(validateEmail('invalid-email')).toBe(false);
        expect(validateEmail('')).toBe(false);
        expect(validateEmail('test@test@test.com')).toBe(false);
    });

    // Tests de validation de téléphone
    test('validatePhone', () => {
        expect(validatePhone('0612345678')).toBe(true);
        expect(validatePhone('+33612345678')).toBe(true);
        expect(validatePhone('abc')).toBe(false);
        expect(validatePhone('123')).toBe(false);
    });

    // Tests de formatage de prix
    test('formatPrice', () => {
        expect(formatPrice(10)).toBe('10.00 €');
        expect(formatPrice(10.5)).toBe('10.50 €');
        expect(formatPrice(0)).toBe('0.00 €');
        expect(formatPrice(999.99)).toBe('999.99 €');
    });

    // Tests de debounce
    test('debounce', (done) => {
        let counter = 0;
        const increment = () => counter++;
        const debouncedIncrement = debounce(increment, 100);

        debouncedIncrement();
        debouncedIncrement();
        debouncedIncrement();

        expect(counter).toBe(0);

        setTimeout(() => {
            expect(counter).toBe(1);
            done();
        }, 150);
    });
}); 