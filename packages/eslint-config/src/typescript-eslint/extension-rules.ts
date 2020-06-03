export = {
    /* eslint-disable @typescript-eslint/naming-convention */
    rules: {
        'brace-style': 'off',
        '@typescript-eslint/brace-style': ['error', 'stroustrup', {
            allowSingleLine: false,
        }],
        'comma-spacing': 'off',
        '@typescript-eslint/comma-spacing': ['error', {
            before: false,
            after: true,
        }],
        'default-param-last': 'off',
        '@typescript-eslint/default-param-last': 'error',
        'dot-notation': 'off',
        '@typescript-eslint/dot-notation': ['error', {
            allowKeywords: true,
            allowPrivateClassPropertyAccess: false,
        }],
        'func-call-spacing': 'off',
        '@typescript-eslint/func-call-spacing': ['error', 'never'],
        'indent': 'off',
        '@typescript-eslint/indent': ['error', 4, { SwitchCase: 1 }],
        'init-declarations': 'off',
        '@typescript-eslint/init-declarations': ['error', 'always'],
        'keyword-spacing': 'off',
        '@typescript-eslint/keyword-spacing': ['error', {
            before: true,
            after: true,
        }],
        'lines-between-class-members': 'off',
        '@typescript-eslint/lines-between-class-members': ['error', 'always', {
            exceptAfterSingleLine: true,
            exceptAfterOverload: true,
        }],
        'no-array-constructor': 'off',
        '@typescript-eslint/no-array-constructor': 'error',
        'no-dupe-class-members': 'off',
        '@typescript-eslint/no-dupe-class-members': 'error',
        'no-empty-function': 'off',
        '@typescript-eslint/no-empty-function': ['error', {
            allow: ['protected-constructors', 'private-constructors'],
        }],
        'no-extra-parens': 'off',
        '@typescript-eslint/no-extra-parens': 'error',
        'no-extra-semi': 'off',
        '@typescript-eslint/no-extra-semi': 'error',
        'no-invalid-this': 'off',
        '@typescript-eslint/no-invalid-this': 'error',
        'no-magic-numbers': 'off',
        '@typescript-eslint/no-magic-numbers': 'off',
        'no-throw-literal': 'off',
        '@typescript-eslint/no-throw-literal': 'error',
        'no-unused-expressions': 'off',
        '@typescript-eslint/no-unused-expressions': 'error',
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': ['error', {
            args: 'after-used',
            // TypeScript recognizes underscore for unused parameters
            argsIgnorePattern: '^_',
        }],
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': ['error', {
            functions: false,
            classes: false,
            typedefs: false,
        }],
        'no-useless-constructor': 'off',
        '@typescript-eslint/no-useless-constructor': 'error',
        'quotes': 'off',
        '@typescript-eslint/quotes': ['error', 'single', {
            avoidEscape: true,
            allowTemplateLiterals: true,
        }],
        'require-await': 'off',
        '@typescript-eslint/require-await': 'error',
        'no-return-await': 'off',
        '@typescript-eslint/return-await': ['error', 'never'],
        'semi': 'off',
        '@typescript-eslint/semi': ['error', 'always'],
        'space-before-function-paren': 'off',
        '@typescript-eslint/space-before-function-paren': ['error', {
            anonymous: 'always',
            named: 'never',
            asyncArrow: 'always',
        }],
    },
};
