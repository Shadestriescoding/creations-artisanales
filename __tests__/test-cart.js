import cart from '../assets/js/modules/cart.js';

describe('Fonctionnalités du panier', () => {
    const mockProduct = {
        id: '1',
        name: 'Test Product',
        price: 10.99,
        quantity: 1
    };

    let mockStorage = {};

    beforeEach(() => {
        // Mise en place du DOM pour les tests
        document.body.innerHTML = `
            <div class="cart-count">0</div>
        `;
        
        // Mock du localStorage
        mockStorage = {};
        Object.defineProperty(window, 'localStorage', {
            value: {
                getItem: jest.fn(key => mockStorage[key] || null),
                setItem: jest.fn((key, value) => {
                    mockStorage[key] = value;
                }),
                clear: jest.fn(() => {
                    mockStorage = {};
                })
            },
            writable: true
        });
        
        // Réinitialisation du panier
        cart.clearCart();
    });

    test('init', () => {
        const spy = jest.spyOn(localStorage, 'getItem');
        cart.initCart();
        expect(spy).toHaveBeenCalledWith('cart');
        spy.mockRestore();
    });

    test('addToCart avec initialisation', () => {
        cart.initCart();
        const result = cart.addToCart(mockProduct);
        expect(result).toBe(true);
        expect(cart.getState().items.length).toBe(1);
    });

    test('gestion erreur saveCart', () => {
        const spy = jest.spyOn(localStorage, 'setItem').mockImplementation(() => {
            throw new Error('Storage error');
        });
        const result = cart.addToCart(mockProduct);
        expect(result).toBe(false);
        spy.mockRestore();
    });

    test('gestion erreur loadCart', () => {
        const spy = jest.spyOn(localStorage, 'getItem').mockImplementation(() => 'invalid JSON');
        const result = cart.loadCart();
        expect(result).toBe(false);
        expect(cart.getState().items.length).toBe(0);
        spy.mockRestore();
    });

    test('addToCart', () => {
        const result = cart.addToCart(mockProduct);
        expect(result).toBe(true);
        expect(cart.getState().items[0].id).toBe(mockProduct.id);
    });

    test('removeFromCart', () => {
        cart.addToCart(mockProduct);
        const result = cart.removeFromCart(mockProduct.id);
        expect(result).toBe(true);
        expect(cart.getState().items.length).toBe(0);
    });

    test('updateCartCount', () => {
        cart.addToCart(mockProduct);
        cart.updateCartCount();
        const countElement = document.querySelector('.cart-count');
        expect(countElement.textContent).toBe('1');
    });

    test('clearCart', () => {
        cart.addToCart(mockProduct);
        const result = cart.clearCart();
        expect(result).toBe(true);
        expect(cart.getState().items.length).toBe(0);
        expect(cart.getState().total).toBe(0);
    });

    test('calcul du total du panier', () => {
        cart.addToCart(mockProduct);
        cart.addToCart(mockProduct); // Ajoute le même produit une deuxième fois
        const total = cart.calculateTotal();
        expect(total).toBe(mockProduct.price * 2);
    });

    test('saveCart et loadCart', () => {
        // Ajouter un produit et sauvegarder
        cart.addToCart(mockProduct);
        expect(cart.saveCart()).toBe(true);
        
        // Vérifier que les données sont dans le mock storage
        expect(mockStorage.cart).toBeDefined();
        const savedData = JSON.parse(mockStorage.cart);
        expect(savedData.items.length).toBe(1);
        expect(savedData.items[0].id).toBe(mockProduct.id);
        
        // Vider le panier en mémoire mais garder les données dans le storage
        cart.clearCart();
        expect(cart.getState().items.length).toBe(0);
        
        // Restaurer les données du mock storage
        mockStorage.cart = JSON.stringify({
            items: [mockProduct],
            total: mockProduct.price
        });
        
        // Recharger le panier depuis le storage
        expect(cart.loadCart()).toBe(true);
        expect(cart.getState().items.length).toBe(1);
        expect(cart.getState().items[0].id).toBe(mockProduct.id);
    });
}); 