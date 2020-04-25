export = {
    extends: [
        './',
        '@perfective/eslint-config/dist/community',
    ],
    rules: {
        // Conflicts with NestJS
        'import/no-cycle': 'off',
    },
};
