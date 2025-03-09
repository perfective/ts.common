/* eslint-disable n/no-unpublished-import -- dev-only */
import perfectiveEslintConfig from '@perfective/eslint-config';
import { jestConfig } from '@perfective/eslint-config/jest';

const eslintConfig = [
    ...perfectiveEslintConfig,
    jestConfig(),
    {
        files: ['**/*.ts?(x)'],
        rules: {
            '@typescript-eslint/no-unnecessary-condition': ['warn', {
                allowConstantLoopConditions: false,
                allowRuleToRunWithoutStrictNullChecksIKnowWhatIAmDoing: false,
                checkTypePredicates: false,
            }],
        },
    },
];

// eslint-disable-next-line import/no-default-export -- required for configuration
export default eslintConfig;
/* eslint-enable n/no-unpublished-import */
