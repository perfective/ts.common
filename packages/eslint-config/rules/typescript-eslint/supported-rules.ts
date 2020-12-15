export = {
    rules: {
        '@typescript-eslint/adjacent-overload-signatures': 'error',
        '@typescript-eslint/array-type': ['warn', {
            default: 'array',
            readonly: 'array',
        }],
        '@typescript-eslint/await-thenable': 'error',
        '@typescript-eslint/ban-ts-comment': 'error',
        '@typescript-eslint/ban-tslint-comment': 'warn',
        '@typescript-eslint/ban-types': 'error',
        '@typescript-eslint/class-literal-property-style': 'off',
        '@typescript-eslint/consistent-indexed-object-style': ['warn', 'record'],
        '@typescript-eslint/consistent-type-assertions': ['error', {
            assertionStyle: 'as',
            objectLiteralTypeAssertions: 'allow',
        }],
        '@typescript-eslint/consistent-type-definitions': ['warn', 'interface'],
        '@typescript-eslint/consistent-type-imports': ['warn', {
            prefer: 'no-type-imports',
            disallowTypeAnnotations: true,
        }],
        '@typescript-eslint/explicit-function-return-type': ['error', {
            allowConciseArrowFunctionExpressionsStartingWithVoid: true,
        }],
        '@typescript-eslint/explicit-member-accessibility': 'warn',
        '@typescript-eslint/explicit-module-boundary-types': 'error',
        '@typescript-eslint/member-delimiter-style': ['warn', {
            multiline: {
                delimiter: 'semi',
                requireLast: true,
            },
            singleline: {
                delimiter: 'semi',
                requireLast: true,
            },
        }],
        '@typescript-eslint/member-ordering': ['error', {
            default: [
                'signature',
                'public-static-field',
                'public-abstract-field',
                'public-decorated-field',
                'public-instance-field',
                'protected-static-field',
                'protected-abstract-field',
                'protected-decorated-field',
                'protected-instance-field',
                'private-static-field',
                'private-abstract-field',
                'private-decorated-field',
                'private-instance-field',
                'field',
                'constructor',
                'public-static-method',
                'public-abstract-method',
                'public-decorated-method',
                'public-instance-method',
                'protected-static-method',
                'protected-abstract-method',
                'protected-decorated-method',
                'protected-instance-method',
                'private-static-method',
                'private-abstract-method',
                'private-decorated-method',
                'private-instance-method',
                'method',
            ],
        }],
        '@typescript-eslint/method-signature-style': ['warn', 'property'],
        '@typescript-eslint/naming-convention': ['error', {
            selector: ['enumMember', 'typeLike'],
            format: ['StrictPascalCase'],
        }, {
            selector: ['memberLike', 'variableLike'],
            format: ['strictCamelCase'],
        }],
        '@typescript-eslint/no-base-to-string': 'error',
        '@typescript-eslint/no-confusing-non-null-assertion': 'warn',
        '@typescript-eslint/no-confusing-void-expression': ['warn', {
            ignoreArrowShorthand: true,
            ignoreVoidOperator: false,
        }],
        '@typescript-eslint/no-dynamic-delete': 'warn',
        '@typescript-eslint/no-empty-interface': ['warn', {
            allowSingleExtends: true,
        }],
        '@typescript-eslint/no-explicit-any': ['error', {
            fixToUnknown: false,
            ignoreRestArgs: false,
        }],
        '@typescript-eslint/no-extra-non-null-assertion': 'warn',
        '@typescript-eslint/no-extraneous-class': 'error',
        '@typescript-eslint/no-floating-promises': 'error',
        '@typescript-eslint/no-for-in-array': 'error',
        '@typescript-eslint/no-implicit-any-catch': ['error', {
            allowExplicitAny: false,
        }],
        '@typescript-eslint/no-implied-eval': 'error',
        '@typescript-eslint/no-inferrable-types': 'off',
        // Allow for generic types like "Nullary<void>" (as "(value: T) => void" declaration is already valid)
        '@typescript-eslint/no-invalid-void-type': ['error', {
            allowInGenericTypeArguments: true,
        }],
        '@typescript-eslint/no-misused-new': 'error',
        '@typescript-eslint/no-misused-promises': 'error',
        '@typescript-eslint/no-namespace': 'error',
        '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
        '@typescript-eslint/no-non-null-assertion': 'error',
        '@typescript-eslint/no-parameter-properties': 'off',
        '@typescript-eslint/no-require-imports': 'error',
        '@typescript-eslint/no-this-alias': 'error',
        '@typescript-eslint/no-type-alias': 'off',
        '@typescript-eslint/no-unnecessary-boolean-literal-compare': ['warn', {
            allowComparingNullableBooleansToTrue: true,
            allowComparingNullableBooleansToFalse: true,
        }],
        '@typescript-eslint/no-unnecessary-condition': 'warn',
        '@typescript-eslint/no-unnecessary-qualifier': 'warn',
        '@typescript-eslint/no-unnecessary-type-arguments': 'warn',
        '@typescript-eslint/no-unnecessary-type-assertion': 'warn',
        '@typescript-eslint/no-unnecessary-type-constraint': 'warn',
        '@typescript-eslint/no-unsafe-assignment': 'error',
        '@typescript-eslint/no-unsafe-call': 'error',
        '@typescript-eslint/no-unsafe-member-access': 'error',
        '@typescript-eslint/no-unsafe-return': 'error',
        '@typescript-eslint/no-unused-vars-experimental': ['error', {
            ignoreArgsIfArgsAfterAreUsed: true,
        }],
        '@typescript-eslint/no-var-requires': 'error',
        '@typescript-eslint/prefer-as-const': 'warn',
        '@typescript-eslint/prefer-enum-initializers': 'error',
        '@typescript-eslint/prefer-for-of': 'error',
        '@typescript-eslint/prefer-function-type': 'warn',
        '@typescript-eslint/prefer-includes': 'warn',
        '@typescript-eslint/prefer-literal-enum-member': 'error',
        '@typescript-eslint/prefer-namespace-keyword': 'warn',
        '@typescript-eslint/prefer-nullish-coalescing': 'error',
        '@typescript-eslint/prefer-optional-chain': 'error',
        '@typescript-eslint/prefer-readonly': 'warn',
        // Rule behavior is unpredictable and 3rd-party libraries may not provide read-only types
        '@typescript-eslint/prefer-readonly-parameter-types': 'off',
        '@typescript-eslint/prefer-reduce-type-parameter': 'warn',
        '@typescript-eslint/prefer-regexp-exec': 'error',
        '@typescript-eslint/prefer-string-starts-ends-with': 'warn',
        '@typescript-eslint/prefer-ts-expect-error': 'warn',
        '@typescript-eslint/promise-function-async': 'error',
        '@typescript-eslint/require-array-sort-compare': ['error', {
            ignoreStringArrays: true,
        }],
        '@typescript-eslint/restrict-plus-operands': ['error', {
            checkCompoundAssignments: true,
        }],
        '@typescript-eslint/restrict-template-expressions': ['error', {
            allowNumber: false,
            allowBoolean: false,
            allowAny: false,
            allowNullish: false,
        }],
        '@typescript-eslint/strict-boolean-expressions': ['error', {
            allowString: false,
            allowNumber: false,
            allowNullableObject: true,
            allowNullableBoolean: false,
            allowNullableString: false,
            allowNullableNumber: false,
            allowAny: false,
        }],
        '@typescript-eslint/switch-exhaustiveness-check': 'error',
        '@typescript-eslint/triple-slash-reference': ['error', {
            path: 'never',
            types: 'never',
            // eslint-disable-next-line unicorn/prevent-abbreviations -- option name
            lib: 'never',
        }],
        '@typescript-eslint/type-annotation-spacing': 'warn',
        '@typescript-eslint/typedef': ['error', {
            arrayDestructuring: true,
            arrowParameter: false,
            memberVariableDeclaration: true,
            objectDestructuring: true,
            parameter: true,
            propertyDeclaration: true,
            variableDeclaration: true,
            variableDeclarationIgnoreFunction: false,
        }],
        '@typescript-eslint/unbound-method': 'error',
        '@typescript-eslint/unified-signatures': 'error',
    },
};