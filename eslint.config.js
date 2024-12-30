const perfectiveEslintConfig = require('@perfective/eslint-config');
const perfectiveJestConfig = require('@perfective/eslint-config/jest');

module.exports = [
    ...perfectiveEslintConfig.default,
    perfectiveJestConfig.jestConfig(),
];
