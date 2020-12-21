export = {
    extends: [
        '../',
        '@perfective/eslint-config/community',
    ],
    rules: {
        'unicorn/prevent-abbreviations': ['warn', {
            extendDefaultWhitelist: true,
            checkDefaultAndNamespaceImports: true,
            checkShorthandImports: false,
            checkShorthandProperties: false,
            // Does not check for properties on external types
            checkProperties: false,
            checkVariables: true,
            checkFilenames: true,
            replacements: {
                args: false,
                db: false,
                env: false,
                i: false,
                j: false,
                // eslint-disable-next-line unicorn/prevent-abbreviations -- additional abbreviations
                params: false,
                /* eslint-disable unicorn/prevent-abbreviations -- React-specific abbreviations */
                prop: false,
                props: false,
                ref: false,
                refs: false,
                /* eslint-enable unicorn/prevent-abbreviations */
            },
            ignore: [],
        }],
    },
};
