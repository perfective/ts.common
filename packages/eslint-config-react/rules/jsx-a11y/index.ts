export = {
    rules: {
        'jsx-a11y/accessible-emoji': 'error',
        'jsx-a11y/alt-text': 'error',
        'jsx-a11y/anchor-has-content': ['error', {
            components: [],
        }],
        'jsx-a11y/anchor-is-valid': ['error', {
            components: [],
            specialLink: [],
            aspects: ['noHref', 'invalidHref', 'preferButton'],
        }],
        'jsx-a11y/aria-activedescendant-has-tabindex': 'error',
        'jsx-a11y/aria-props': 'error',
        'jsx-a11y/aria-proptypes': 'error',
        'jsx-a11y/aria-role': ['error', {
            // eslint-disable-next-line @typescript-eslint/naming-convention -- option name
            ignoreNonDOM: false,
        }],
        'jsx-a11y/aria-unsupported-elements': 'error',
        'jsx-a11y/autocomplete-valid': ['error', {
            inputComponents: [],
        }],
        'jsx-a11y/click-events-have-key-events': 'error',
        'jsx-a11y/heading-has-content': ['error', {
            components: [],
        }],
        'jsx-a11y/html-has-lang': 'error',
        'jsx-a11y/iframe-has-title': 'error',
        'jsx-a11y/img-redundant-alt': ['error', {
            components: [],
            words: [],
        }],
        'jsx-a11y/interactive-supports-focus': ['error', {
            tabbable: [],
        }],
        'jsx-a11y/label-has-associated-control': ['error', {
            labelComponents: [],
            labelAttributes: [],
            controlComponents: [],
            assert: 'either',
            depth: 2,
        }],
        'jsx-a11y/lang': 'error',
        'jsx-a11y/media-has-caption': ['error', {
            audio: [],
            video: [],
            track: [],
        }],
        'jsx-a11y/mouse-events-have-key-events': 'error',
        'jsx-a11y/no-access-key': 'error',
        'jsx-a11y/no-autofocus': ['error', {
            // eslint-disable-next-line @typescript-eslint/naming-convention -- option name
            ignoreNonDOM: false,
        }],
        'jsx-a11y/no-distracting-elements': 'error',
        'jsx-a11y/no-interactive-element-to-noninteractive-role': 'error',
        'jsx-a11y/no-noninteractive-element-interactions': 'error',
        'jsx-a11y/no-noninteractive-element-to-interactive-role': 'error',
        'jsx-a11y/no-noninteractive-tabindex': 'error',
        'jsx-a11y/no-onchange': 'error',
        'jsx-a11y/no-redundant-roles': ['error', {
            nav: ['navigation'],
        }],
        'jsx-a11y/no-static-element-interactions': 'error',
        'jsx-a11y/role-has-required-aria-props': 'error',
        'jsx-a11y/role-supports-aria-props': 'error',
        'jsx-a11y/scope': 'error',
        'jsx-a11y/tabindex-no-positive': 'error',
    },
};
