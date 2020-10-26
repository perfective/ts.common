/* eslint-disable @typescript-eslint/consistent-type-imports -- to keep it in devDependencies */
/* eslint-disable node/no-unpublished-import -- false-positive, the package is public */
import type { Config } from '@jest/types';
/* eslint-enable node/no-unpublished-import */
/* eslint-enable @typescript-eslint/consistent-type-imports */

const config: Config.InitialOptions = {
    testEnvironment: 'node',
    preset: 'ts-jest',
    // eslint-disable-next-line unicorn/prevent-abbreviations -- configuration option
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
