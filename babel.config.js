// eslint-disable-next-line n/no-unpublished-import -- dev-only
import { babelPluginImportExtension, babelPluginRequireExtension } from '@perfective/build/babel';

const babelConfig = {
    presets: [],
    plugins: [
        babelPluginRequireExtension,
        babelPluginImportExtension('js'),
    ],
};

// eslint-disable-next-line import/no-default-export -- required for configuration
export default babelConfig;
