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
        'deprecation',
        'import',
        'jest',
    ],
    extends: [
        './eslint/possible-errors',
        './eslint/best-practices',
        './eslint/strict-mode',
        './eslint/variables',
        './eslint/node-js-and-common-js',
        './eslint/stylistic-issues',
        './eslint/ecma-script-6',
        './typescript-eslint/supported-rules',
        './typescript-eslint/extension-rules',
        './deprecation/deprecation',
        './import/static-analysis',
        './import/helpful-warnings',
        './import/module-systems',
        './import/style-guide',
        './jest/rules',
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
                directory: './tsconfig.json',
            },
        },
    },
    rules: {
        'no-undefined': 'off',
    },
    overrides: [
        {
            files: ['*.spec.ts'],
            env: {
                jest: true,
            },
            rules: {
                'arrow-body-style': ['error', 'as-needed'],
                'max-lines-per-function': 'off',
                'max-nested-callbacks': ['error', 4],
            },
        },
    ],
};
