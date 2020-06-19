export = {
    rules: {
        'import/first': 'off',
        'import/exports-last': 'off',
        'import/no-duplicates': ['warn', {
            considerQueryString: true,
        }],
        'import/no-namespace': 'off',
        'import/extensions': ['error', 'never'],
        'import/order': ['off', {
            'groups': ['unknown', 'builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
            'newlines-between': 'always',
            'alphabetize': {
                order: 'asc',
                caseInsensitive: false,
            },
        }],
        'import/newline-after-import': 'warn',
        'import/prefer-default-export': 'off',
        'import/max-dependencies': 'off',
        'import/no-unassigned-import': 'error',
        'import/no-named-default': 'error',
        'import/no-default-export': 'error',
        'import/no-named-export': 'off',
        'import/no-anonymous-default-export': 'error',
        'import/group-exports': 'off',
        'import/dynamic-import-chunkname': 'off',
    },
};
