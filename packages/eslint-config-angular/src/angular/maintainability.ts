export = {
    rules: {
        '@angular-eslint/component-max-inline-declarations': ['error', {
            animations: 0,
            styles: 0,
            template: 10,
        }],
        '@angular-eslint/no-conflicting-lifecycle': 'error',
        '@angular-eslint/no-forward-ref': 'error',
        '@angular-eslint/no-input-prefix': ['error', {
            prefixes: ['can', 'is', 'on', 'should'],
        }],
        '@angular-eslint/no-input-rename': 'off',
        '@angular-eslint/no-output-on-prefix': 'error',
        '@angular-eslint/no-output-rename': 'error',
        '@angular-eslint/prefer-output-readonly': 'error',
        '@angular-eslint/relative-url-prefix': 'error',
        // '@angular-eslint/template/cyclomatic-complexity': 'off',
        // '@angular-eslint/template/no-call-expression': 'error',
        '@angular-eslint/use-component-selector': 'error',
        '@angular-eslint/use-component-view-encapsulation': 'error',
        '@angular-eslint/use-pipe-decorator': 'error',
        '@angular-eslint/use-pipe-transform-interface': 'error',
    },
};
