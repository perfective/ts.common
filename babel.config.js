import { babelPluginImportExtension, babelPluginRequireExtension } from '@perfective/build/babel';

const babelConfig = {
    presets: [],
    plugins: [
        babelPluginRequireExtension,
        babelPluginImportExtension('js'),
    ],
};

export default babelConfig;
