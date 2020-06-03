export = {
    extends: [
        '@perfective/eslint-config',
    ],
    rules: {
        // Conflicts with the Angular file suffixes: .module, .component, etc.
        'node/file-extension-in-import': 'off',
    },
};
