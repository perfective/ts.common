import { perfectiveEslintConfig } from '@perfective/eslint-config';
import { jestConfig } from '@perfective/eslint-config/jest';

const eslintConfig = perfectiveEslintConfig([
    jestConfig,
]);

export default eslintConfig;
