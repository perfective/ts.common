export = {
    rules: {
        'rxjs/ban-observables': 'error',
        'rxjs/ban-operators': ['error', {
            tap: false,
        }],
        'rxjs/finnish': ['error', {
            functions: true,
            methods: true,
            names: {},
            parameters: true,
            properties: true,
            types: {},
            variables: true,
        }],
        'rxjs/just': 'off',
        'rxjs/no-async-subscribe': 'error',
        'rxjs/no-compat': 'error',
        'rxjs/no-connectable': 'error',
        'rxjs/no-create': 'error',
        // Fails for nullable and optional subjects, e.g.:
        //  new BehaviorSubject(null) != new BehaviorSubject<T | null>(null);
        'rxjs/no-explicit-generics': 'off',
        'rxjs/no-exposed-subjects': 'error',
        'rxjs/no-finnish': 'off',
        'rxjs/no-ignored-error': 'error',
        'rxjs/no-ignored-notifier': 'error',
        'rxjs/no-ignored-observable': 'error',
        'rxjs/no-ignored-replay-buffer': 'error',
        'rxjs/no-ignored-subscribe': 'error',
        'rxjs/no-ignored-subscription': 'error',
        'rxjs/no-ignored-takewhile-value': 'error',
        'rxjs/no-implicit-any-catch': 'error',
        'rxjs/no-index': 'error',
        'rxjs/no-internal': 'error',
        'rxjs/no-nested-subscribe': 'error',
        'rxjs/no-redundant-notify': 'error',
        // Prior to v6.4.0 shareReplay() operator had some surprising behavior:
        //  https://github.com/ReactiveX/rxjs/pull/4059
        'rxjs/no-sharereplay': 'off',
        'rxjs/no-subclass': 'error',
        'rxjs/no-subject-unsubscribe': 'error',
        'rxjs/no-subject-value': 'error',
        // Deprecated
        'rxjs/no-tap': 'off',
        'rxjs/no-topromise': 'error',
        // See https://ncjamieson.com/avoiding-switchmap-related-bugs/
        'rxjs/no-unbound-methods': 'error',
        'rxjs/no-unsafe-catch': 'error',
        'rxjs/no-unsafe-first': 'error',
        'rxjs/no-unsafe-subject-next': 'error',
        'rxjs/no-unsafe-switchmap': 'error',
        'rxjs/no-unsafe-takeuntil': 'error',
        'rxjs/prefer-observer': 'off',
        'rxjs/suffix-subjects': 'error',
        'rxjs/throw-error': 'error',
    },
};
