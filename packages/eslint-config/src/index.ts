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
        './eslint/possible-errors',
        './eslint/best-practices',
        './eslint/strict-mode',
        './eslint/variables',
        './eslint/stylistic-issues',
        './eslint/ecma-script-6',
        './typescript-eslint/supported-rules',
        './typescript-eslint/extension-rules',
        './array-func/rules',
        './deprecation/deprecation',
        './eslint-comments/best-practices',
        './eslint-comments/stylistic-issues',
        './import/static-analysis',
        './import/helpful-warnings',
        './import/module-systems',
        './import/style-guide',
        './jest/rules',
        './jest-formatting/rules',
        './jsdoc/rules',
        './node/possible-errors',
        './node/best-practices',
        './node/stylistic-issues',
        './prefer-arrow/rules',
        './promise/rules',
        './rxjs/rules',
        './simple-import-sort/rules',
        './sonarjs/bug-detection',
        './sonarjs/code-smell-detection',
        './unicorn/rules',
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
