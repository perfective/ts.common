export = {
    rules: {
        'react/jsx-boolean-value': ['warn', 'always'],
        'react/jsx-child-element-spacing': 'error',
        'react/jsx-closing-bracket-location': ['warn', {
            selfClosing: 'after-props',
            nonEmpty: 'after-props',
        }],
        'react/jsx-closing-tag-location': 'warn',
        // See the react/jsx-no-comment-textnodes and react/jsx-no-literals rules
        'react/jsx-curly-brace-presence': ['warn', {
            // eslint-disable-next-line unicorn/prevent-abbreviations -- React "props"
            props: 'never',
            children: 'always',
        }],
        'react/jsx-curly-newline': ['warn', 'never'],
        'react/jsx-curly-spacing': ['warn', {
            when: 'never',
            attributes: {
                allowMultiline: false,
            },
            children: {
                allowMultiline: false,
            },
        }],
        'react/jsx-equals-spacing': ['warn', 'never'],
        'react/jsx-filename-extension': ['error', {
            allow: 'always',
            extensions: ['.jsx', '.tsx'],
        }],
        'react/jsx-first-prop-new-line': ['warn', 'multiline-multiprop'],
        'react/jsx-fragments': ['warn', 'element'],
        'react/jsx-handler-names': ['error', {
            eventHandlerPrefix: 'handle',
            // eslint-disable-next-line unicorn/prevent-abbreviations -- React "prop"
            eventHandlerPropPrefix: 'on',
            checkLocalVariables: true,
            checkInlineFunction: true,
        }],
        // See the 'indent' and '@typescript-eslint/indent' rules
        'react/jsx-indent': ['warn', 4, {
            checkAttributes: true,
            indentLogicalExpressions: true,
        }],
        'react/jsx-indent-props': ['warn', 1],
        'react/jsx-key': ['error', {
            checkFragmentShorthand: true,
        }],
        // See the 'max-depth' rule
        'react/jsx-max-depth': ['error', {
            max: 4,
        }],
        'react/jsx-max-props-per-line': ['warn', {
            maximum: 1,
            when: 'always',
        }],
        // TODO: Enable in the next version
        // 'react/jsx-newline': 'error',
        'react/jsx-no-bind': ['error', {
            // eslint-disable-next-line @typescript-eslint/naming-convention -- configuration property
            ignoreDOMComponents: false,
            // eslint-disable-next-line unicorn/prevent-abbreviations -- React "ref"
            ignoreRefs: false,
            allowArrowFunctions: false,
            allowFunctions: false,
        }],
        'react/jsx-no-comment-textnodes': 'error',
        // TODO: Enable in the next version
        // 'react/jsx-no-constructed-context-values': 'error',
        'react/jsx-no-duplicate-props': ['error', {
            ignoreCase: true,
        }],
        'react/jsx-no-literals': ['error', {
            noStrings: false,
            allowedStrings: [],
            // eslint-disable-next-line unicorn/prevent-abbreviations -- React "props"
            ignoreProps: true,
            noAttributeStrings: false,
        }],
        'react/jsx-no-script-url': 'error',
        'react/jsx-no-target-blank': ['error', {
            allowReferrer: false,
            enforceDynamicLinks: 'always',
        }],
        'react/jsx-no-undef': ['error', {
            allowGlobals: false,
        }],
        'react/jsx-no-useless-fragment': 'warn',
        'react/jsx-one-expression-per-line': ['warn', {
            allow: 'single-child',
        }],
        'react/jsx-pascal-case': ['error', {
            allowAllCaps: false,
            ignore: [],
        }],
        'react/jsx-props-no-multi-spaces': 'warn',
        'react/jsx-props-no-spreading': ['error', {
            html: 'enforce',
            custom: 'enforce',
            // TBD: Community config candidate
            explicitSpread: 'enforce',
            exceptions: [],
        }],
        'react/jsx-sort-default-props': ['error', {
            ignoreCase: false,
        }],
        'react/jsx-sort-props': ['warn', {
            ignoreCase: false,
            callbacksLast: true,
            shorthandFirst: true,
            shorthandLast: false,
            noSortAlphabetically: false,
            reservedFirst: true,
        }],

        /** @deprecated */
        'react/jsx-space-before-closing': 'off',
        'react/jsx-tag-spacing': ['warn', {
            closingSlash: 'never',
            beforeSelfClosing: 'always',
            afterOpening: 'never',
            beforeClosing: 'never',
        }],
        'react/jsx-uses-react': 'error',
        'react/jsx-uses-vars': 'error',
        'react/jsx-wrap-multilines': ['warn', {
            declaration: 'parens-new-line',
            assignment: 'parens-new-line',
            return: 'parens-new-line',
            arrow: 'parens-new-line',
            condition: 'parens-new-line',
            logical: 'parens-new-line',
            // eslint-disable-next-line unicorn/prevent-abbreviations -- React "props"
            prop: 'parens-new-line',
        }],
    },
};
