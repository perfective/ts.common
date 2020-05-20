module.exports = {
    testEnvironment: 'node',
    preset: 'ts-jest',
    // <rootDir> is `./packages/*/src`
    rootDir: './src',
    globals: {
        'ts-jest': {
            tsConfig: '<rootDir>/../../../tsconfig.json',
        }
    },
    moduleNameMapper: {
        '^@perfective/(\\w*)$': '<rootDir>/../../$1/src/index.ts',
    },
    collectCoverage: true,
    coverageReporters: ['text'],
    verbose: true
};
