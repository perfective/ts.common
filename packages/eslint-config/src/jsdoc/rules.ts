export = {
    rules: {
        // @access should be optional and used only to mark package/private functions
        'jsdoc/check-access': 'off',
        'jsdoc/check-alignment': 'error',
        // TODO: Determine if it can be configured to work with TypeScript
        'jsdoc/check-examples': 'off',
        'jsdoc/check-indentation': 'error',
        // NOTE: "never" is not implemented yet by the plugin
        'jsdoc/check-line-alignment': ['off', 'never'],
        'jsdoc/check-param-names': ['error', {
            // eslint-disable-next-line unicorn/prevent-abbreviations -- option name
            allowExtraTrailingParamDocs: false,
            checkDestructured: true,
            checkRestProperty: false,
            // TODO
            // checkTypesPattern: false,
            enableFixer: true,
        }],
        'jsdoc/check-property-names': ['error', {
            enableFixer: true,
        }],
        'jsdoc/check-syntax': 'error',
        // TODO: Check if tags like @abstract, @async, etc. that have keywords in TypeScript are removed.
        'jsdoc/check-tag-names': ['error', {
            definedTags: ['final', 'sealed'],
        }],
        'jsdoc/check-types': ['error', {
            noDefaults: false,
        }],
        'jsdoc/check-values': 'error',
        'jsdoc/empty-tags': ['error', {
            tags: [],
        }],
        'jsdoc/implements-on-classes': 'error',
        'jsdoc/match-description': 'error',
        'jsdoc/newline-after-description': ['error', 'always'],
        'jsdoc/no-bad-blocks': ['error', {
            ignore: ['ts-check', 'ts-expect-error', 'ts-ignore', 'ts-nocheck', 'typescript-eslint'],
        }],
        'jsdoc/no-defaults': 'error',
        'jsdoc/no-types': 'error',
        'jsdoc/no-undefined-types': 'error',
        'jsdoc/require-description': 'error',
        'jsdoc/require-description-complete-sentence': 'error',
        'jsdoc/require-example': 'off',
        'jsdoc/require-file-overview': 'off',
        'jsdoc/require-hyphen-before-param-description': ['error', 'always'],
        'jsdoc/require-jsdoc': 'off',
        'jsdoc/require-param': 'off',
        'jsdoc/require-param-description': 'error',
        'jsdoc/require-param-name': 'error',
        // Conflicts with jsdoc/no-types: types are defined in the TypeScript code.
        'jsdoc/require-param-type': 'off',
        'jsdoc/require-property': 'error',
        'jsdoc/require-property-description': 'error',
        'jsdoc/require-property-name': 'error',
        'jsdoc/require-property-type': 'error',
        'jsdoc/require-returns': 'off',
        'jsdoc/require-returns-check': 'error',
        'jsdoc/require-returns-description': 'error',
        // Conflicts with jsdoc/no-types: types are defined in the TypeScript code.
        'jsdoc/require-returns-type': 'off',
        'jsdoc/require-throws': 'error',
        'jsdoc/valid-types': 'error',
    },
};
