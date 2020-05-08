export = {
    /* eslint-disable @typescript-eslint/naming-convention */
    extends: './',
    rules: {
        'arrow-body-style': ['error', 'as-needed'],
        'function-paren-newline': ['error', 'multiline-arguments'],
        'max-len': ['error', {
            code: 120,
            tabWidth: 4,
            ignoreRegExpLiterals: true,
            ignoreUrls: true,
        }],
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
        // Allow for generic types like "Nullary<void>"
        '@typescript-eslint/no-invalid-void-type': ['error', {
            allowInGenericTypeArguments: true,
        }],
        // 3rd-party libraries may not provide read-only types
        '@typescript-eslint/prefer-readonly-parameter-types': 'off',
        // Arrow functions should be used only as parameters,
        // so `async` keywords can be skipped for brevity.
        '@typescript-eslint/promise-function-async': ['error', {
            checkArrowFunctions: false,
        }],
        '@typescript-eslint/triple-slash-reference': ['error', {
            path: 'never',
            types: 'always',
            lib: 'never',
        }],
        // Allow uppercase in describe() as it can be used for the class name in PascalCase
        'jest/lowercase-name': ['error', {
            ignore: ['describe'],
        }],
    },
};
