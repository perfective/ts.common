export = {
    rules: {
        'react/boolean-prop-naming': ['error', {
            // eslint-disable-next-line unicorn/prevent-abbreviations -- React "prop"
            propTypeNames: ['bool'],
            rule: '^(is|has)[A-Z]([A-Za-z0-9]?)+',
            validateNested: true,
        }],
        'react/button-has-type': ['error', {
            button: true,
            submit: true,
            reset: true,
        }],
        // TODO: This rule does not seem to work with TypeScript
        'react/default-props-match-prop-types': 'error',
        'react/destructuring-assignment': ['error', 'never'],
        // This rules is used for "createReactClass", which is used without ES6.
        'react/display-name': ['error', {
            ignoreTranspilerName: false,
        }],
        'react/forbid-component-props': 'error',
        'react/forbid-dom-props': ['error', {
            forbid: [],
        }],
        'react/forbid-elements': ['error', {
            forbid: [],
        }],
        'react/forbid-foreign-prop-types': 'error',
        'react/forbid-prop-types': ['error', {
            forbid: ['any', 'array', 'object'],
            checkContextTypes: true,
            checkChildContextTypes: true,
        }],
        'react/function-component-definition': ['warn', {
            namedComponents: 'function-declaration',
            // NOTE: Using expression is style-only, as react/no-this-in-sfc is enabled.
            unnamedComponents: 'function-expression',
        }],
        'react/no-access-state-in-setstate': 'error',
        'react/no-adjacent-inline-elements': 'error',
        'react/no-array-index-key': 'error',
        'react/no-children-prop': 'error',
        'react/no-danger': 'error',
        'react/no-danger-with-children': 'error',
        'react/no-deprecated': 'error',
        'react/no-did-mount-set-state': ['error', 'disallow-in-func'],
        'react/no-did-update-set-state': ['error', 'disallow-in-func'],
        'react/no-direct-mutation-state': 'error',
        'react/no-find-dom-node': 'error',
        'react/no-is-mounted': 'error',
        'react/no-multi-comp': ['error', {
            ignoreStateless: false,
        }],
        'react/no-redundant-should-component-update': 'error',
        'react/no-render-return-value': 'error',
        // TODO: Consider adding another configuration for Flux/Redux applications
        'react/no-set-state': 'off',
        'react/no-string-refs': ['error', {
            noTemplateLiterals: true,
        }],
        'react/no-this-in-sfc': 'error',
        'react/no-typos': 'error',
        'react/no-unescaped-entities': ['error', {
            forbid: ['>', '}'],
        }],
        'react/no-unknown-property': 'warn',
        'react/no-unsafe': 'error',
        // See: https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-unused-prop-types.md#known-issueslimitations
        'react/no-unused-prop-types': 'error',
        'react/no-unused-state': 'error',
        'react/no-will-update-set-state': ['error', 'disallow-in-func'],
        'react/prefer-es6-class': ['error', 'always'],
        // NOTE: this rule work with Flow, not TypeScript
        'react/prefer-read-only-props': 'warn',
        // TBD: consider using this rule
        'react/prefer-stateless-function': 'off',
        'react/prop-types': 'error',
        'react/react-in-jsx-scope': 'error',
        'react/require-default-props': 'error',
        'react/require-optimization': ['error', {
            allowDecorators: [],
        }],
        'react/require-render-return': 'error',
        'react/self-closing-comp': ['warn', {
            component: true,
            html: true,
        }],
        // TODO: Verify compatibility with @typescript-eslint/member-ordering
        'react/sort-comp': ['error', {
            order: [
                'static-methods',
                'lifecycle',
                'everything-else',
                'render',
            ],
            groups: {
                lifecycle: [
                    'displayName',
                    'propTypes',
                    'contextTypes',
                    'childContextTypes',
                    'mixins',
                    'statics',
                    'defaultProps',
                    'constructor',
                    'getDefaultProps',
                    'state',
                    'getInitialState',
                    'getChildContext',
                    'getDerivedStateFromProps',
                    'componentWillMount',
                    'UNSAFE_componentWillMount',
                    'componentDidMount',
                    'componentWillReceiveProps',
                    'UNSAFE_componentWillReceiveProps',
                    'shouldComponentUpdate',
                    'componentWillUpdate',
                    'UNSAFE_componentWillUpdate',
                    'getSnapshotBeforeUpdate',
                    'componentDidUpdate',
                    'componentDidCatch',
                    'componentWillUnmount',
                ],
            },
        }],
        'react/sort-prop-types': ['error', {
            ignoreCase: false,
            callbacksLast: true,
            requiredFirst: true,
            // eslint-disable-next-line unicorn/prevent-abbreviations -- React "prop"
            sortShapeProp: true,
            noSortAlphabetically: false,
        }],
        // State initialization may have dynamic values
        'react/state-in-constructor': ['error', 'always'],
        // TODO: This rule does not seem to work with TypeScript
        'react/static-property-placement': ['error', 'static public field'],
        'react/style-prop-object': 'error',
        'react/void-dom-elements-no-children': 'error',
    },
};
