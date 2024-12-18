module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '\\.(gif|ttf|eot|svg|png|jpg|webp)$': '<rootDir>/__mocks__/fileMock.js'
    },
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    collectCoverageFrom: [
        'assets/js/**/*.js',
        '!assets/js/vendor/**/*.js',
        '!**/node_modules/**'
    ],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80
        }
    },
    verbose: true,
    testMatch: ['**/__tests__/**/*.js', '**/?(*.)+(spec|test).js'],
    transform: {
        '^.+\\.js$': 'babel-jest'
    }
}; 