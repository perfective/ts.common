import { perfectiveEslintConfig } from '@perfective/eslint-config';
import { jestConfig } from '@perfective/eslint-config/jest';

const eslintConfig = perfectiveEslintConfig([
    jestConfig,
    {
        rules: {
            'jsdoc/no-undefined-types': 'off',
        },
    },
]);

export default eslintConfig;
