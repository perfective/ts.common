export = {
    parserOptions: {
        ecmaVersion: 6,
        ecmaFeatures: {
            globalReturn: false,
            impliedStrict: true,
        },
        project: './tsconfig.json',
        sourceType: 'module',
        warnOnUnsupportedTypeScriptVersion: true,
    },
    plugins: [
        '@angular-eslint/template',
    ],
    ignorePatterns: ['**/*.d.ts'],
    overrides: [
        {
            files: ['*.component.html'],
            parser: '@angular-eslint/template-parser',
            rules: {
                '@angular-eslint/template/accessibility-tabindex-no-positive': 'error',
                '@angular-eslint/template/accessibility-table-scope': 'error',
                '@angular-eslint/template/accessibility-valid-aria': 'error',
                '@angular-eslint/template/banana-in-box': 'error',
                '@angular-eslint/template/conditional-complexity': ['error', {
                    maxComplexity: 2,
                }],
                '@angular-eslint/template/cyclomatic-complexity': 'off',
                // TODO: Definition for rule "@angular-eslint/template/no-any" was not found
                '@angular-eslint/template/no-any': 'off',
                '@angular-eslint/template/no-autofocus': 'error',
                // TODO: Fails with "Cannot read property 'start' of undefined
                '@angular-eslint/template/no-call-expression': 'off',
                // TODO: Fails with "Cannot read property 'start' of undefined
                '@angular-eslint/template/no-negated-async': 'off',
                '@angular-eslint/template/use-track-by-functions': 'error',
            },
        },
        {
            // Despite not being provided directly,
            // the rules from the "*.component.html" section will be applied for the inlined HTML.
            files: ['*.ts'],
            parser: '@typescript-eslint/parser',
            processor: '@angular-eslint/template/extract-inline-html',
            // All plugins that are used have to be listed,
            // in case any of their rules are disabled in the TypeScript code.
            // Otherwise the "Definition for rule '…' was not found" error will be thrown.
            plugins: [
                // From @perfective/eslint-config
                '@typescript-eslint',
                '@typescript-eslint/tslint',
                'array-func',
                'deprecation',
                'eslint-comments',
                'import',
                'jest',
                'jest-formatting',
                'jsdoc',
                'node',
                'prefer-arrow',
                'promise',
                'rxjs',
                'simple-import-sort',
                'sonarjs',
                'unicorn',
                // From @perfective/eslint-config-angular
                '@angular-eslint',
                'jest-dom',
                'rxjs-angular',
                'testing-library',
            ],
        },
    ],

};
