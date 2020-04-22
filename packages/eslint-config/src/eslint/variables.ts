export = {
    rules: {
        'init-declarations': ['error', 'always'],
        'no-delete-var': 'error',
        'no-label-var': 'error',
        'no-restricted-globals': 'error',
        'no-shadow': 'off',
        'no-shadow-restricted-names': 'error',
        'no-undef': 'error',
        'no-undef-init': 'error',
        'no-undefined': 'error',
        'no-unused-vars': ['error', {
            args: 'after-used',
            argsIgnorePattern: '^_',
        }],
        'no-use-before-define': ['error', {
            functions: true,
            classes: true,
        }],
    },
};
