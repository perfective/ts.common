export = {
    extends: [
        './',
        '@perfective/eslint-config/dist/community',
    ],
    rules: {
        '@angular-eslint/use-injectable-provided-in': 'off',
        // Conflicts with the Angular file suffixes: .module, .component, etc.
        'node/file-extension-in-import': 'off',
    },
};
