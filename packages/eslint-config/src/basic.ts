export = {
    extends: './',
    rules: {
        // Conflicts with decorators
        'new-cap': 'off',
        // Conflicts with decorators
        '@typescript-eslint/no-extraneous-class': 'off',
        // Conflicts with "no-confusing-arrow" { allowParens: true }
        '@typescript-eslint/no-extra-parens': 'off',
        '@typescript-eslint/triple-slash-reference': ['error', {
            path: 'never',
            types: 'always',
            lib: 'never',
        }],
        // Conflicts with NestJS
        'import/no-cycle': 'off',
    },
};
