/* eslint-disable n/no-unpublished-import -- dev-only */
import perfectiveEslintConfig from '@perfective/eslint-config';
import { jestConfig } from '@perfective/eslint-config/jest';

/* eslint-enable n/no-unpublished-import */

const eslintConfig = [...perfectiveEslintConfig.default, jestConfig()];

// eslint-disable-next-line import/no-default-export -- required for configuration
export default eslintConfig;
