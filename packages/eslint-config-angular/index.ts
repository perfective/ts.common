import { tslint } from '@perfective/eslint-config/tslint';

import { codelyzer } from './codelyzer';

export = {
    plugins: [
        '@angular-eslint',
        'jest-dom',
        'rxjs-angular',
        'testing-library',
    ],
    extends: [
        '@perfective/eslint-config',
        './rules/angular/best-practices',
        './rules/angular/functionality',
        './rules/angular/maintainability',
        './rules/angular/style',
        './rules/jest-dom',
        './rules/rxjs-angular',
        './rules/testing-library',
    ],
    rules: {
        // Legacy rules for TSLint and Codelyzer
        '@typescript-eslint/tslint/config': ['warn', {
            rules: {
                ...tslint,
                ...codelyzer,
            },
            rulesDirectory: [
                'codelyzer',
            ],
        }],
        // The default, Angular-friendly, configuration
        'rxjs/finnish': ['error', {
            functions: true,
            methods: true,
            names: {
                '^(canActivate|canActivateChild|canDeactivate|canLoad|intercept|resolve|validate)$': false,
            },
            parameters: true,
            properties: true,
            types: {
                '^EventEmitter$': false,
            },
            variables: true,
        }],
    },
};
