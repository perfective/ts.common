export = {
    extends: [
        '../template',
    ],
    overrides: [
        {
            files: ['*.component.html'],
            rules: {
                '@angular-eslint/template/conditional-complexity': ['error', {
                    maxComplexity: 3,
                }],
            },
        },
    ],
};
