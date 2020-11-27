export = {
    extends: '../',
    rules: {
        'arrow-body-style': ['error', 'as-needed'],
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
        'no-underscore-dangle': ['error', {
            // eslint-disable-next-line unicorn/prevent-abbreviations -- option name
            allowFunctionParams: true,
        }],
        'object-curly-newline': ['error', {
            // eslint-disable-next-line @typescript-eslint/naming-convention -- option name
            ImportDeclaration: { multiline: true },
            // eslint-disable-next-line @typescript-eslint/naming-convention -- option name
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
        // Arrow functions should be used only as parameters,
        // so `async` keywords can be skipped for brevity.
        '@typescript-eslint/promise-function-async': ['error', {
            checkArrowFunctions: false,
        }],
        '@typescript-eslint/triple-slash-reference': ['error', {
            path: 'never',
            types: 'always',
            // eslint-disable-next-line unicorn/prevent-abbreviations -- option name
            lib: 'never',
        }],
        // Using the established defaults in typescript-eslint v3.x
        '@typescript-eslint/typedef': ['error', {
            arrayDestructuring: false,
            arrowParameter: false,
            memberVariableDeclaration: true,
            objectDestructuring: false,
            parameter: true,
            propertyDeclaration: true,
            variableDeclaration: false,
            variableDeclarationIgnoreFunction: false,
        }],
        // Allow uppercase in describe() as it can be used for the class name in PascalCase
        'jest/lowercase-name': ['error', {
            ignore: ['describe'],
        }],
        // Undesired behavior in functions like forkJoin
        'rxjs/finnish': 'off',
        'unicorn/no-keyword-prefix': ['error', {
            blacklist: ['class'],
            checkProperties: true,
            onlyCamelCase: false,
        }],
        'unicorn/prevent-abbreviations': ['warn', {
            extendDefaultWhitelist: true,
            checkDefaultAndNamespaceImports: true,
            checkShorthandImports: false,
            checkShorthandProperties: false,
            // Does not check for properties on external types
            checkProperties: false,
            checkVariables: true,
            checkFilenames: true,
            /* eslint-disable unicorn/prevent-abbreviations -- additional abbreviations */
            replacements: {
                args: false,
                db: false,
                env: false,
                params: false,
            },
            /* eslint-enable unicorn/prevent-abbreviations */
        }],
        // Requires research on level of effort in writing safer regular expressions
        'unicorn/no-unsafe-regex': 'off',
    },
};
