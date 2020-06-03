export = {
    extends: [
        '@perfective/eslint-config',
    ],
    rules: {
        // Rule conflicts with the Angular file suffixes: .module, .component, etc.
        'node/file-extension-in-import': 'off',
    }
};
