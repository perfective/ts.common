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
        'no-undef-init': 'error',
        'no-undefined': 'off',
        'no-unused-vars': ['error', {
            args: 'after-used',
            argsIgnorePattern: '^_',
        }],
        'no-use-before-define': ['error', {
            functions: false,
            classes: false,
        }],
    },
};
