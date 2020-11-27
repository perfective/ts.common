import { tslint } from './tslint';

export = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 6,
        ecmaFeatures: {
            globalReturn: false,
            impliedStrict: true,
        },
        project: './tsconfig.json',
        sourceType: 'module',
        warnOnUnsupportedTypeScriptVersion: true,
    },
    env: {
        'es6': true,
        'jest/globals': true,
    },
    plugins: [
        '@typescript-eslint',
        '@typescript-eslint/tslint',
        'array-func',
        'deprecation',
        'eslint-comments',
        'import',
        'jest',
        'jest-formatting',
        'jsdoc',
        'node',
        'prefer-arrow',
        'promise',
        'rxjs',
        'simple-import-sort',
        'sonarjs',
        'unicorn',
    ],
    extends: [
        './rules/eslint/possible-errors',
        './rules/eslint/best-practices',
        './rules/eslint/strict-mode',
        './rules/eslint/variables',
        './rules/eslint/stylistic-issues',
        './rules/eslint/ecma-script-6',
        './rules/typescript-eslint/supported-rules',
        './rules/typescript-eslint/extension-rules',
        './rules/array-func',
        './rules/deprecation',
        './rules/eslint-comments/best-practices',
        './rules/eslint-comments/stylistic-issues',
        './rules/import/static-analysis',
        './rules/import/helpful-warnings',
        './rules/import/module-systems',
        './rules/import/style-guide',
        './rules/jest',
        './rules/jest-formatting',
        './rules/jsdoc',
        './rules/node/possible-errors',
        './rules/node/best-practices',
        './rules/node/stylistic-issues',
        './rules/prefer-arrow',
        './rules/promise',
        './rules/rxjs',
        './rules/simple-import-sort',
        './rules/sonarjs/bug-detection',
        './rules/sonarjs/code-smell-detection',
        './rules/unicorn',
    ],
    settings: {
        'import/parsers': {
            '@typescript-eslint/parser': [
                '.ts',
                '.tsx',
            ],
        },
        'import/resolver': {
            typescript: {
                alwaysTryTypes: true,
                project: './tsconfig.json',
            },
        },
        'jsdoc': {
            mode: 'typescript',
            tagNamePreference: {
                augments: {
                    message: '@extends is to be used over @augments as it is more evocative of classes than @augments',
                    replacement: 'extends',
                },
                todo: {
                    message: 'Use TODO for comments',
                },
                fires: {
                    replacement: 'emits',
                },
            },
            /* eslint-disable unicorn/prevent-abbreviations -- configuration properties */
            overrideReplacesDocs: true,
            augmentsExtendsReplacesDocs: false,
            implementsReplacesDoc: false,
            /* eslint-enable unicorn/prevent-abbreviations */
        },
    },
    ignorePatterns: ['**/*.d.ts'],
    rules: {
        '@typescript-eslint/tslint/config': ['warn', {
            rules: tslint,
        }],
    },
    overrides: [
        {
            files: ['*.spec.ts'],
            env: {
                jest: true,
            },
            rules: {
                '@typescript-eslint/ban-ts-comment': ['error', {
                    'ts-expect-error': 'allow-with-description',
                }],
                '@typescript-eslint/init-declarations': 'off',
                'arrow-body-style': ['error', 'as-needed'],
                'max-lines': 'off',
                'max-lines-per-function': 'off',
                'max-nested-callbacks': ['error', 4],
                // Each "describe" or "it" is counted as a separated statement
                'max-statements': 'off',
                // Passing promise is required for async testing
                'rxjs/no-topromise': 'off',
            },
        },
    ],
};
