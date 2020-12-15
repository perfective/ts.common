import { Rules } from '@perfective/eslint-config/tslint';

const functionality: Rules = {
    'contextual-decorator': true,
    'template-accessibility-alt-text': true,
    'template-accessibility-elements-content': true,
    'template-accessibility-label-for': true,

    /** @deprecated - see @angular-eslint/template/accessibility-tabindex-no-positive. */
    'template-accessibility-tabindex-no-positive': true,
    'template-accessibility-table-scope': true,
    'template-accessibility-valid-aria': true,

    /** @deprecated - see @angular-eslint/template/banana-in-a-box. */
    'template-banana-in-box': true,
    'template-click-events-have-key-events': true,
    'template-mouse-events-have-key-events': true,
    'template-no-any': true,

    /** @deprecated - see @angular-eslint/template/no-autofocus. */
    'template-no-autofocus': true,
    'template-no-distracting-elements': true,

    /** @deprecated - see @angular-eslint/template/no-negated-async. */
    'template-no-negated-async': true,
};

const maintainability: Rules = {
    'no-unused-css': true,
    'template-conditional-complexity': [true, 2],
    'template-i18n': false,

    /** @deprecated - see @angular-eslint/template/no-call-expression. */
    'template-no-call-expression': true,

    /** @deprecated - see @angular-eslint/template/use-track-by-functions. */
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
