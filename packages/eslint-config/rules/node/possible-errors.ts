export = {
    rules: {
        'node/handle-callback-err': 'error',
        'node/no-callback-literal': 'error',
        'node/no-exports-assign': 'error',
        // Imports and require are handled by the "eslint-plugin-import"
        'node/no-extraneous-import': 'off',
        'node/no-extraneous-require': 'off',
        'node/no-missing-import': 'off',
        'node/no-missing-require': 'off',
        'node/no-new-require': 'error',
        'node/no-path-concat': 'error',
        'node/no-process-exit': 'error',
        'node/no-unpublished-bin': 'error',
        'node/no-unpublished-import': 'error',
        'node/no-unpublished-require': 'error',
        'node/no-unsupported-features/es-builtins': 'error',
        // Does not recognize TypeScript
        'node/no-unsupported-features/es-syntax': 'off',
        'node/no-unsupported-features/node-builtins': 'error',
        'node/process-exit-as-throw': 'error',
        'node/shebang': 'warn',
    },
};
