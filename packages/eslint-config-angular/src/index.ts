export = {
    plugins: [
        '@angular-eslint',
        'jest-dom',
        'rxjs-angular',
        'testing-library',
    ],
    extends: [
        '@perfective/eslint-config',
        './angular/rules',
        './angular/functionality',
        './angular/maintainability',
        './angular/style',
        './jest-dom/rules',
        './rxjs-angular/rules',
    ],
    rules: {
        // The default, Angular-friendly, configuration
        'rxjs/finnish': ['error', {
            functions: true,
            methods: true,
            names: {
                '^(canActivate|canActivateChild|canDeactivate|canLoad|intercept|resolve|validate)$': false,
            },
            parameters: true,
            properties: true,
            types: {
                '^EventEmitter$': false,
            },
            variables: true,
        }],
    },
    overrides: [
        {
            // TODO: Overrides conflicts with @typescript-eslint
            //  Requires a separate .eslintrc file
            files: ['*.component.html'],
            parser: '@angular-eslint/template-parser',
            plugins: ['@angular-eslint/template'],
            rules: {
                '@angular-eslint/template/accessibility-tabindex-no-positive': 'error',
                '@angular-eslint/template/banana-in-a-box': 'error',
                '@angular-eslint/template/cyclomatic-complexity': 'off',
                '@angular-eslint/template/no-autofocus': 'error',
                // TODO: Fails with "Cannot read property 'start' of undefined
                '@angular-eslint/template/no-call-expression': 'off',
                // TODO: Fails with "Cannot read property 'start' of undefined
                '@angular-eslint/template/no-negated-async': 'off',
            },
        },
    ],
};
