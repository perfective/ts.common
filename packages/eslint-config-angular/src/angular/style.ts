export = {
    rules: {
        '@angular-eslint/component-class-suffix': 'error',
        '@angular-eslint/component-selector': ['error', {
            type: 'attribute',
            prefix: 'pf',
            style: 'camelCase',
        }],
        '@angular-eslint/directive-class-suffix': 'error',
        '@angular-eslint/directive-selector': ['error', {
            type: 'attribute',
            prefix: 'pf',
            style: 'camelCase',
        }],
        '@angular-eslint/no-host-metadata-property': 'error',
        '@angular-eslint/no-inputs-metadata-property': 'error',
        '@angular-eslint/no-outputs-metadata-property': 'error',
        '@angular-eslint/no-queries-metadata-property': 'error',
    },
};
