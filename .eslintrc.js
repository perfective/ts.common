module.exports = {
    extends: [
        '@perfective/eslint-config',
    ],
    overrides: [
        {
            files: ['*.@(spec|test).[jt]s?(x)'],
            rules: {
                'max-nested-callbacks': ['error', 6],
                'jest/max-nested-describe': ['error', {
                    max: 4,
                }],
            },
        },
    ],
};
