module.exports = {
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
    },
    setupFilesAfterEnv: [
        '<rootDir>/__tests__/setup.js'
    ],
    transform: {
        '^.+\\.js$': ['babel-jest', { configFile: './.babelrc' }]
    },
    moduleFileExtensions: ['js', 'json'],
    testPathIgnorePatterns: ['/node_modules/'],
    collectCoverageFrom: [
        'assets/js/**/*.js',
        '!assets/js/vendor/**'
    ],
    verbose: true,
    testMatch: [
        '**/__tests__/**/*.js'
    ],
    transformIgnorePatterns: [
        '/node_modules/(?!(@testing-library)/)'
    ]
}; 