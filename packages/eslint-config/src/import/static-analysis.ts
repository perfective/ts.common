export = {
    rules: {
        'import/no-unresolved': 'error',
        'import/named': 'error',
        'import/default': 'error',
        'import/namespace': 'error',
        'import/no-restricted-paths': 'off',
        'import/no-absolute-path': 'error',
        'import/no-dynamic-require': 'error',
        'import/no-internal-modules': 'off',
        'import/no-webpack-loader-syntax': 'error',
        'import/no-self-import': 'error',
        'import/no-cycle': ['error', {
            ignoreExternal: true,
        }],
        'import/no-useless-path-segments': 'error',
        'import/no-relative-parent-imports': 'off',
        'import/no-unused-modules': 'error',
    },
};
