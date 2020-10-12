export = {
    rules: {
        'simple-import-sort/sort': ['warn', {
            groups: [
                // Side effect imports
                ['^\\u0000'],
                // Unscoped packages
                ['^[a-zA-Z]'],
                // Scoped packages
                ['^@'],
                // Parent imports, put `..` last
                ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
                // Other relative imports, put same-folder imports and `.` last
                ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
                // Style imports
                ['^.+\\.s?css$'],
            ],
        }],
    },
};
