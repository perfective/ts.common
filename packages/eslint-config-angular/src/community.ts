export = {
    extends: [
        '@perfective/eslint-config/dist/basic',
    ],
    rules: {
        // Conflicts with NestJS
        'import/no-cycle': 'off',
    },
};
