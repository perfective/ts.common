import { perfectiveEslintConfig } from '@perfective/eslint-config';
import { jestConfig } from '@perfective/eslint-config/jest';

const eslintConfig = perfectiveEslintConfig([
    jestConfig,
    {
        rules: {
            'jsdoc/no-undefined-types': 'off',
            // ES target is before ES2020
            'unicorn/prefer-bigint-literals': 'off',
        },
    },
]);

export default eslintConfig;
