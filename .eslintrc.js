module.exports = {
    extends: [
        '@perfective/eslint-config',
    ],
    overrides: [
        {
            files: ['*.[jt]s?(x)'],
            rules: {
                // TODO: Enable back when the issue with RegExp literal notations is fixed
                // See: https://github.com/jest-community/eslint-plugin-jest/issues/921
                'jest/prefer-to-be': 'off',
            },
        },
    ],
};
