import { Rules } from '@perfective/eslint-config/tslint';

const functionality: Rules = {
    'contextual-decorator': true,
    'template-accessibility-alt-text': true,

    /** @deprecated - see @angular-eslint/template/accessibility-elements-content. */
    'template-accessibility-elements-content': true,
    'template-accessibility-label-for': true,

    /** @deprecated - see @angular-eslint/template/no-positive-tabindex. */
    'template-accessibility-tabindex-no-positive': true,

    /** @deprecated - see @angular-eslint/template/accessibility-table-scope. */
    'template-accessibility-table-scope': true,

    /** @deprecated - see @angular-eslint/template/accessibility-valid-aria. */
    'template-accessibility-valid-aria': true,

    /** @deprecated - see @angular-eslint/template/banana-in-box. */
    'template-banana-in-box': true,
    'template-click-events-have-key-events': true,

    /** @deprecated - see @angular-eslint/template/mouse-events-have-key-events. */
    'template-mouse-events-have-key-events': true,

    /** @deprecated - see @angular-eslint/template/no-any. */
    'template-no-any': true,

    /** @deprecated - see @angular-eslint/template/no-autofocus. */
    'template-no-autofocus': true,

    /** @deprecated - see @angular-eslint/template/no-distracting-elements. */
    'template-no-distracting-elements': true,

    /** @deprecated - see @angular-eslint/template/no-negated-async. */
    'template-no-negated-async': true,
};

const maintainability: Rules = {
    'no-unused-css': true,

    /** @deprecated - see @angular-eslint/template/conditional-complexity. */
    'template-conditional-complexity': [true, 2],

    /** @deprecated - see @angular-eslint/template/i18n. */
    'template-i18n': false,

    /** @deprecated - see @angular-eslint/template/no-call-expression. */
    'template-no-call-expression': true,

    /** @deprecated - see @angular-eslint/template/use-track-by-function. */
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
