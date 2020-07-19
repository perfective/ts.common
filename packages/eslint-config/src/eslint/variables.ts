export = {
    rules: {
        'init-declarations': ['error', 'always'],
        'no-delete-var': 'error',
        'no-label-var': 'error',
        'no-restricted-globals': 'error',
        'no-shadow': 'off',
        'no-shadow-restricted-names': 'error',
        // TypeScript compiler checks defined symbols
        'no-undef': 'off',
        'no-undef-init': 'warn',
        'no-undefined': 'off',
        'no-unused-vars': ['error', {
            // eslint-disable-next-line unicorn/prevent-abbreviations -- option name
            args: 'after-used',
            // eslint-disable-next-line unicorn/prevent-abbreviations -- option name
            argsIgnorePattern: '^_',
        }],
        'no-use-before-define': ['error', {
            functions: false,
            // eslint-disable-next-line unicorn/no-keyword-prefix -- option name
            classes: false,
        }],
    },
};
