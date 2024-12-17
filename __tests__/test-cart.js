// Mock des dépendances
jest.mock('../assets/js/main.js', () => ({
    products: [
        {
            id: 1,
            name: "Test Product",
            price: 15.99
        },
        {
            id: 2,
            name: "Test Product 2",
            price: 17.99
        }
    ]
}));

jest.mock('../assets/js/modules/notifications.js', () => ({
    showNotification: jest.fn()
}));

// Mock localStorage
const localStorageMock = (() => {
    let store = {};
    return {
        getItem: jest.fn(key => store[key] || null),
        setItem: jest.fn((key, value) => {
            store[key] = value;
        }),
        clear: jest.fn(() => {
            store = {};
        })
    };
})();

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock
});

import { products } from '../assets/js/main.js';
import { cartModule } from '../assets/js/modules/cart.js';
import { showNotification } from '../assets/js/modules/notifications.js';

describe('Fonctionnalités du panier', () => {
    // Réinitialisation avant chaque test
    beforeEach(() => {
        cartModule.clearCart();
        document.body.innerHTML = `
            <span class="cart-count">0</span>
            <div class="cart-items"></div>
        `;
        localStorage.clear();
        jest.clearAllMocks();
    });

    // Test d'initialisation
    test('init', () => {
        const testProduct = products[0];
        localStorage.setItem('cart', JSON.stringify([testProduct]));
        
        cartModule.init();
        expect(cartModule.cart).toEqual([testProduct]);
        expect(document.querySelector('.cart-count').textContent).toBe('1');
    });

    // Test d'ajout au panier avec initialisation automatique
    test('addToCart avec initialisation', () => {
        const product = products[0];
        const result = cartModule.addToCart(product);
        
        expect(result).toBe(true);
        expect(cartModule.cart.length).toBe(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([product]));
    });

    // Test de gestion d'erreur lors de la sauvegarde
    test('gestion erreur saveCart', () => {
        localStorage.setItem.mockImplementationOnce(() => {
            throw new Error('Storage error');
        });

        const result = cartModule.addToCart(products[0]);
        expect(showNotification).toHaveBeenCalledWith('Erreur lors de la sauvegarde du panier', 'error');
        expect(cartModule.cart.length).toBe(1);
    });

    // Test de gestion d'erreur lors du chargement
    test('gestion erreur loadCart', () => {
        localStorage.getItem.mockImplementationOnce(() => 'invalid JSON');
        const result = cartModule.loadCart();
        
        expect(result).toBe(false);
        expect(showNotification).toHaveBeenCalledWith('Erreur lors du chargement du panier', 'error');
        expect(cartModule.cart.length).toBe(0);
    });

    // Test d'ajout au panier
    test('addToCart', () => {
        const product = products[0];
        cartModule.addToCart(product);
        
        expect(cartModule.cart.length).toBe(1);
        expect(cartModule.cart[0]).toEqual(product);
        expect(document.querySelector('.cart-count').textContent).toBe('1');
    });

    // Test de suppression du panier
    test('removeFromCart', () => {
        const product = products[0];
        cartModule.addToCart(product);
        expect(cartModule.cart.length).toBe(1);

        cartModule.removeFromCart(0);
        expect(cartModule.cart.length).toBe(0);
        expect(document.querySelector('.cart-count').textContent).toBe('0');
    });

    // Test de mise à jour du compteur
    test('updateCartCount', () => {
        const product = products[0];
        cartModule.addToCart(product);
        
        const cartCount = document.querySelector('.cart-count');
        expect(cartCount.textContent).toBe('1');
        expect(cartCount.style.display).toBe('flex');
    });

    // Test de nettoyage du panier
    test('clearCart', () => {
        cartModule.addToCart(products[0]);
        cartModule.addToCart(products[1]);
        expect(cartModule.cart.length).toBe(2);

        cartModule.clearCart();
        expect(cartModule.cart.length).toBe(0);
        expect(document.querySelector('.cart-count').textContent).toBe('0');
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([]));
    });

    // Test du calcul du total
    test('calcul du total du panier', () => {
        cartModule.addToCart(products[0]);
        cartModule.addToCart(products[1]);

        const total = cartModule.calculateCartTotal();
        expect(total).toBeCloseTo(15.99 + 17.99);
    });

    // Test de sauvegarde et chargement du panier
    test('saveCart et loadCart', () => {
        const product = products[0];
        cartModule.addToCart(product);
        
        const saveResult = cartModule.saveCart();
        expect(saveResult).toBe(true);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([product]));
        
        cartModule.clearCart();
        expect(cartModule.cart.length).toBe(0);

        localStorage.getItem.mockReturnValueOnce(JSON.stringify([product]));
        const loadResult = cartModule.loadCart();
        expect(loadResult).toBe(true);
        expect(cartModule.cart.length).toBe(1);
        expect(cartModule.cart[0]).toEqual(product);
    });
}); 