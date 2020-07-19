export = {
    /* eslint-disable unicorn/no-keyword-prefix */
    /* eslint-disable unicorn/prevent-abbreviations */
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
        'jest-formatting',
        'node',
        'prefer-arrow',
        'promise',
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
        './deprecation/deprecation',
        './import/static-analysis',
        './import/helpful-warnings',
        './import/module-systems',
        './import/style-guide',
        './jest/rules',
        './jest-formatting/rules',
        './node/possible-errors',
        './node/best-practices',
        './node/stylistic-issues',
        './prefer-arrow/rules',
        './promise/rules',
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
                directory: './tsconfig.json',
            },
        },
    },
    overrides: [
        {
            files: ['*.spec.ts'],
            env: {
                jest: true,
            },
            rules: {
                '@typescript-eslint/init-declarations': 'off',
                'arrow-body-style': ['error', 'as-needed'],
                'max-lines': 'off',
                'max-lines-per-function': 'off',
                'max-nested-callbacks': ['error', 4],
                // Each "describe" or "it" is counted as a separated statement
                'max-statements': 'off',
            },
        },
    ],
};
