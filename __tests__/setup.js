// Configuration de l'environnement de test
require('@testing-library/jest-dom');

// Mock des fonctions de navigateur
Object.defineProperty(window, 'localStorage', {
    value: {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        clear: jest.fn()
    },
    writable: true
});

// Mock de l'API Performance
window.performance = {
    now: jest.fn(() => Date.now()),
    getEntriesByType: jest.fn(() => []),
    timing: {
        navigationStart: Date.now(),
        domInteractive: Date.now()
    }
};

// Mock de PerformanceObserver
global.PerformanceObserver = class PerformanceObserver {
    constructor(callback) {
        this.callback = callback;
    }
    observe() {}
    disconnect() {}
    takeRecords() { return []; }
};

// Mock de l'Intersection Observer
global.IntersectionObserver = class IntersectionObserver {
    constructor() {}
    observe() {}
    unobserve() {}
    disconnect() {}
};

// Mock de fetch
global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({}),
        ok: true,
        status: 200
    })
);

// Mock de requestAnimationFrame
global.requestAnimationFrame = callback => setTimeout(callback, 0);

// Mock de Sentry
global.Sentry = {
    init: jest.fn(),
    captureException: jest.fn(),
    captureMessage: jest.fn(),
    setUser: jest.fn()
};

// Ajout de tests pour vérifier la configuration
describe('Test Environment Setup', () => {
    test('Environment is properly configured', () => {
        expect(window.localStorage).toBeDefined();
        expect(window.performance).toBeDefined();
        expect(global.PerformanceObserver).toBeDefined();
        expect(global.IntersectionObserver).toBeDefined();
        expect(global.fetch).toBeDefined();
        expect(global.requestAnimationFrame).toBeDefined();
        expect(global.Sentry).toBeDefined();
    });
}); 