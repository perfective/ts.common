module.exports = {
    testEnvironment: 'node',
    preset: 'ts-jest',
    rootDir: './src',
    globals: {
        'ts-jest': {
            tsconfig: './tsconfig.json',
        },
    },
    collectCoverage: true,
    coverageReporters: ['text'],
    coverageThreshold: {
        global: {
            statements: 100,
            branches: 100,
            functions: 100,
            lines: 100,
        },
    },
    verbose: false,
};
