/* eslint-disable @typescript-eslint/consistent-type-imports -- to keep it in devDependencies */
// eslint-disable-next-line node/no-unpublished-import -- the package is in devDependencies
import type { Config } from '@jest/types';
/* eslint-enable @typescript-eslint/consistent-type-imports */

const config: Config.InitialOptions = {
    testEnvironment: 'node',
    preset: 'ts-jest',
    rootDir: './src', // == ./packages/*/src
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/../../../tsconfig.json',
        },
    },
    moduleNameMapper: {
        '^@perfective/(\\w*)$': '<rootDir>/../../$1/src/index.ts',
    },
    collectCoverage: true,
    coverageReporters: ['text'],
    verbose: false,
};
export = config;
