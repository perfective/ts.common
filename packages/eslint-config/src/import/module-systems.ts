export = {
    rules: {
        'import/unambiguous': 'error',
        'import/no-commonjs': [
            'error',
            {
                allowConditionalRequire: true,
                allowPrimitiveModules: true
            }
        ],
        'import/no-amd': 'error',
        'import/no-nodejs-modules': 'off'
    }
};
