export = {
    rules: {
        'testing-library/await-async-query': 'error',
        'testing-library/await-async-utils': 'error',
        // Vue.js only
        'testing-library/await-fire-event': 'off',
        'testing-library/consistent-data-testid': ['error', {
            testIdPattern: '^[a-z0-9]+(-[a-z0-9]+)*$',
            testIdAttribute: 'data-testId',
        }],
        'testing-library/no-await-sync-query': 'error',
        'testing-library/no-debug': 'error',
        'testing-library/no-dom-import': 'warn',
        'testing-library/no-manual-cleanup': 'error',
        'testing-library/no-render-in-setup': 'error',
        'testing-library/no-wait-for-empty-callback': 'error',
        'testing-library/no-wait-for-snapshot': 'error',
        'testing-library/prefer-explicit-assert': 'error',
        'testing-library/prefer-find-by': 'warn',
        'testing-library/prefer-presence-queries': 'error',
        'testing-library/prefer-screen-queries': 'error',
        'testing-library/prefer-wait-for': 'warn',
    },
};
