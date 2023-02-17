module.exports = {
    extends: [
        '@perfective/eslint-config',
    ],
    overrides: [
        {
            files: ['*.[jt]s?(x)'],
            rules: {
                'jsdoc/require-description': ['error', {
                    exemptedBy: ['inheritdoc', 'package', 'private', 'see', 'deprecated'],
                }],
            },
        },
    ],
};
