export = {
    extends: [
        './',
        '@perfective/eslint-config/dist/community',
    ],
    rules: {
        // Conflicts with NestJS
        'import/no-cycle': 'off',
        // Conflicts with the Angular file suffixes: .module, .component, etc.
        'node/file-extension-in-import': 'off',
    },
};
