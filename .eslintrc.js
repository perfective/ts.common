module.exports = {
    extends: [
        '@perfective/eslint-config',
    ],
    overrides: [
        {
            files: ['*.[jt]s?(x)'],
            rules: {
                'lines-around-comment': ['warn', {
                    beforeBlockComment: true,
                    afterBlockComment: false,
                    beforeLineComment: false,
                    afterLineComment: false,
                    allowBlockStart: false,
                    allowBlockEnd: false,
                    allowObjectStart: false,
                    allowObjectEnd: false,
                    allowArrayStart: false,
                    allowArrayEnd: false,
                    allowClassStart: true,
                    allowClassEnd: false,
                }],
            },
        },
        {
            files: ['*.@(spec|test).[jt]s?(x)'],
            rules: {
                'max-nested-callbacks': ['error', 5],
            },
        },
    ],
};
