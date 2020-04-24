export = {
    /* eslint-disable @typescript-eslint/naming-convention */
    extends: './',
    rules: {
        'function-paren-newline': ['error', 'multiline-arguments'],
        'max-lines': 'off',
        'max-lines-per-function': 'off',
        'max-params': 'off',
        'max-statements': 'off',
        // Conflicts with decorators
        'new-cap': 'off',
        'newline-per-chained-call': 'off',
        'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
        // Traditionally is used to avoid conflicts between property and method name
        'no-underscore-dangle': 'off',
        'object-curly-newline': ['error', {
            ImportDeclaration: { multiline: true },
            ExportDeclaration: { multiline: true },
        }],
        'object-property-newline': ['error', {
            allowAllPropertiesOnSameLine: true,
        }],
        // Compatibility with "@typescript-eslint/triple-slash-reference"
        'spaced-comment': ['error', 'always', {
            line: {
                markers: ['/ <reference'],
            },
        }],
        // Conflicts with decorators
        '@typescript-eslint/no-extraneous-class': 'off',
        // Conflicts with "no-confusing-arrow" { allowParens: true }
        '@typescript-eslint/no-extra-parens': 'off',
        '@typescript-eslint/triple-slash-reference': ['error', {
            path: 'never',
            types: 'always',
            lib: 'never',
        }],
    },
};
