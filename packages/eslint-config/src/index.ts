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
        'eslint-comments',
        'import',
        'jest',
        'jest-formatting',
        'node',
        'prefer-arrow',
        'promise',
        'rxjs',
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
        './eslint-comments/best-practices',
        './eslint-comments/stylistic-issues',
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
        './rxjs/rules',
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
