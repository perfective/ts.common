export type Rule = boolean | [boolean, unknown];
export type Rules = Record<string, Rule>;

const format: Rules = {
    'import-spacing': true,
};

const functionality: Rules = {
    'no-inferred-empty-object-type': true,
    'no-tautology-expression': true,
    'prefer-conditional-expression': [true, 'check-else-if'],
    'static-this': true,
    'strict-comparisons': [true, {
        'allow-object-equal-comparison': true,
        'allow-string-order-comparison': true,
    }],
    'strict-type-predicates': true,
};

const maintainability: Rules = {
    'no-default-import': true,
    'no-mergeable-namespace': true,
};

const style: Rules = {
    'encoding': true,
    'no-unnecessary-callback-wrapper': true,
    'prefer-switch': [true, { 'min-cases': 2 }],
    'prefer-while': true,
    'return-undefined': true,
    'switch-final-break': [true, 'always'],
};

export const tslint: Rules = {
    ...format,
    ...functionality,
    ...maintainability,
    ...style,
};
