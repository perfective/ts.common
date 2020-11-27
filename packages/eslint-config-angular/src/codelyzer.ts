import { Rules } from '@perfective/eslint-config/tslint';

const functionality: Rules = {
    'contextual-decorator': true,
    'template-accessibility-alt-text': true,
    'template-accessibility-elements-content': true,
    'template-accessibility-label-for': true,
    'template-accessibility-tabindex-no-positive': true,
    'template-accessibility-table-scope': true,
    'template-accessibility-valid-aria': true,
    'template-banana-in-box': true,
    'template-click-events-have-key-events': true,
    'template-mouse-events-have-key-events': true,
    'template-no-any': true,
    'template-no-autofocus': true,
    'template-no-distracting-elements': true,
    'template-no-negated-async': true,
};

const maintainability: Rules = {
    'no-unused-css': true,
    'template-conditional-complexity': [true, 2],
    'template-i18n': false,
    'template-no-call-expression': true,
    'template-use-track-by-function': true,
};

const style: Rules = {
    'angular-whitespace': false,
    'import-destructuring-spacing': true,
    'prefer-inline-decorator': false,
};

export const codelyzer: Rules = {
    ...functionality,
    ...maintainability,
    ...style,
};
