// eslint-disable-next-line n/no-unpublished-import -- dev-only
import { babelPluginRequireExtension } from '@perfective/build/babel';

const babelConfig = {
    presets: [],
    plugins: [
        babelPluginRequireExtension,
    ],
};

// eslint-disable-next-line import/no-default-export -- required for configuration
export default babelConfig;
