import { tslint } from '@perfective/eslint-config/tslint';

export = {
    plugins: [
        'jest-dom',
        'testing-library',
    ],
    extends: [
        '@perfective/eslint-config',
        './rules/jest-dom',
        './rules/testing-library',
    ],
    rules: {
        // Legacy rules for TSLint
        '@typescript-eslint/tslint/config': ['warn', {
            rules: {
                ...tslint,
            },
        }],
    },
};
