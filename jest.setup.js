// Import des extensions Jest pour le DOM
require('@testing-library/jest-dom');

// Configuration globale pour les tests
global.fetch = jest.fn();

// Mock des variables d'environnement
process.env = {
    ...process.env,
    NODE_ENV: 'test',
};

// Nettoyage des mocks après chaque test
afterEach(() => {
    jest.clearAllMocks();
}); 