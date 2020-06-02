export = {
    rules: {
        'sonarjs/cognitive-complexity': ['error', 5],
        // This rule should be based on exhaustiveness, not count
        'sonarjs/max-switch-cases': 'off',
        'sonarjs/no-collapsible-if': 'error',
        'sonarjs/no-collection-size-mischeck': 'error',
        'sonarjs/no-duplicate-string': 'error',
        'sonarjs/no-duplicated-branches': 'error',
        'sonarjs/no-identical-functions': 'error',
        'sonarjs/no-inverted-boolean-check': 'error',
        'sonarjs/no-redundant-boolean': 'error',
        'sonarjs/no-redundant-jump': 'error',
        'sonarjs/no-same-line-conditional': 'error',
        'sonarjs/no-small-switch': 'error',
        'sonarjs/no-unused-collection': 'error',
        'sonarjs/no-useless-catch': 'error',
        'sonarjs/prefer-immediate-return': 'error',
        'sonarjs/prefer-object-literal': 'error',
        'sonarjs/prefer-single-boolean-return': 'error',
        'sonarjs/prefer-while': 'error',
    },
};
