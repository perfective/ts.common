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
            files: ['*.component.html'],
            parser: '@angular-eslint/template-parser',
            plugins: ['@angular-eslint/template'],
            rules: {
                '@angular-eslint/template/banana-in-a-box': 'error',
                '@angular-eslint/template/cyclomatic-complexity': 'error',
                '@angular-eslint/template/no-call-expression': 'error',
                '@angular-eslint/template/no-negated-async': 'error',
            },
        },
    ],
};
