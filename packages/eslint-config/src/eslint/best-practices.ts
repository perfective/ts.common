export = {
    rules: {
        'accessor-pairs': 'error',
        'array-callback-return': 'error',
        'block-scoped-var': 'error',
        'class-methods-use-this': 'off',
        'complexity': ['error', 3],
        'consistent-return': 'error',
        'curly': ['error', 'all'],
        'default-case': 'error',
        // TODO: ESLint 7
        'default-case-last': 'off',
        'default-param-last': 'error',
        'dot-location': ['error', 'property'],
        'dot-notation': ['error', {
            allowKeywords: true,
        }],
        'eqeqeq': 'error',
        'grouped-accessor-pairs': 'error',
        'guard-for-in': 'error',
        'max-classes-per-file': ['error', 1],
        'no-alert': 'error',
        'no-caller': 'error',
        'no-case-declarations': 'error',
        'no-constructor-return': 'error',
        'no-div-regex': 'error',
        'no-else-return': 'error',
        'no-empty-function': 'error',
        'no-empty-pattern': 'error',
        'no-eq-null': 'error',
        'no-eval': 'error',
        'no-extend-native': 'error',
        'no-extra-bind': 'error',
        'no-extra-label': 'error',
        'no-fallthrough': 'error',
        'no-floating-decimal': 'error',
        'no-global-assign': 'error',
        'no-implicit-coercion': 'error',
        'no-implicit-globals': 'error',
        'no-implied-eval': 'error',
        'no-invalid-this': 'error',
        'no-iterator': 'error',
        'no-labels': 'error',
        'no-lone-blocks': 'error',
        'no-loop-func': 'error',
        'no-magic-numbers': 'error',
        'no-multi-spaces': 'error',
        'no-multi-str': 'error',
        'no-new': 'error',
        'no-new-func': 'error',
        'no-new-wrappers': 'error',
        'no-octal': 'error',
        'no-octal-escape': 'error',
        'no-param-reassign': 'error',
        'no-proto': 'error',
        'no-redeclare': 'error',
        'no-restricted-properties': 'error',
        'no-return-assign': 'error',
        'no-return-await': 'error',
        'no-script-url': 'error',
        'no-self-assign': 'error',
        'no-self-compare': 'error',
        'no-sequences': 'error',
        'no-throw-literal': 'error',
        'no-unmodified-loop-condition': 'error',
        'no-unused-expressions': 'error',
        'no-unused-labels': 'error',
        'no-useless-call': 'error',
        'no-useless-catch': 'error',
        'no-useless-concat': 'error',
        'no-useless-escape': 'error',
        'no-useless-return': 'error',
        'no-void': 'error',
        'no-warning-comments': 'off',
        'no-with': 'error',
        // TODO: ECMAScript 2018
        'prefer-named-capture-group': 'off',
        'prefer-promise-reject-errors': 'error',
        'prefer-regex-literals': 'off',
        'radix': 'error',
        'require-await': 'error',
        'require-unicode-regexp': 'error',
        'vars-on-top': 'error',
        'wrap-iife': 'error',
        'yoda': ['error', 'never'],
    },
};