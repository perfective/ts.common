export = {
    rules: {
        'prefer-arrow/prefer-arrow-functions': ['error', {
            allowStandaloneDeclarations: true,
            // eslint-disable-next-line unicorn/no-keyword-prefix -- option name
            classPropertiesAllowed: false,
            disallowPrototype: false,
            singleReturnOnly: false,
        }],
    },
};
