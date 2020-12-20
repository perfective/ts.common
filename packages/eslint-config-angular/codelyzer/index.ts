import { Rules } from '@perfective/eslint-config/tslint';

const functionality: Rules = {
    'contextual-decorator': true,
    'template-accessibility-alt-text': true,
    'template-accessibility-label-for': true,
    'template-click-events-have-key-events': true,

    /** @deprecated - see @angular-eslint/template/mouse-events-have-key-events. */
    'template-mouse-events-have-key-events': true,

    /** @deprecated - see @angular-eslint/template/no-any. */
    'template-no-any': true,

    /** @deprecated - see @angular-eslint/template/no-negated-async. */
    'template-no-negated-async': true,
};

const maintainability: Rules = {
    'no-unused-css': true,

    /** @deprecated - see @angular-eslint/template/no-call-expression. */
    'template-no-call-expression': true,
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
