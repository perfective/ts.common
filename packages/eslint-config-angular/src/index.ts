export = {
    plugins: [
        '@angular-eslint',
        'jest-dom',
    ],
    extends: [
        '@perfective/eslint-config',
        './angular/functionality',
        './angular/maintainability',
        './angular/style',
        './jest-dom/rules',
    ],
    rules: {},
    overrides: [
        {
            // TODO: Overrides conflicts with @typescript-eslint
            //  Requires a separate .eslintrc file
            files: ['*.component.html'],
            parser: '@angular-eslint/template-parser',
            plugins: ['@angular-eslint/template'],
            rules: {
                '@angular-eslint/template/banana-in-a-box': 'error',
                '@angular-eslint/template/cyclomatic-complexity': 'off',
                // TODO: Fails with "Cannot read property 'start' of undefined
                '@angular-eslint/template/no-call-expression': 'off',
                // TODO: Fails with "Cannot read property 'start' of undefined
                '@angular-eslint/template/no-negated-async': 'off',
            },
        },
    ],
};
