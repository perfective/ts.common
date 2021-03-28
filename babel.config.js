const perfective = require('@perfective/build/babel');

module.exports = {
    presets: [],
    plugins: [
        perfective.babelPluginRequireExtension,
    ],
};
