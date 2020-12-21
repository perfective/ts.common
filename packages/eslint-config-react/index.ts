import { tslint } from '@perfective/eslint-config/tslint';

export = {
    plugins: [
        'jest-dom',
        'react',
        'testing-library',
    ],
    extends: [
        '@perfective/eslint-config',
        './rules/jest-dom',
        './rules/react',
        './rules/react/jsx',
        './rules/testing-library',
    ],
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        jest: true,
        node: true,
    },
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    settings: {
        react: {
            version: 'detect',
            createClass: 'createReactClass',
            pragma: 'React',
            fragment: 'Fragment',
        },
        // eslint-disable-next-line unicorn/prevent-abbreviations -- React "prop"
        propWrapperFunctions: [
            'exactPropTypes',
        ],
        linkComponents: [],
    },
    rules: {
        // Legacy rules for TSLint
        '@typescript-eslint/tslint/config': ['warn', {
            rules: {
                ...tslint,
            },
        }],
        // TODO: Resolve duplication/override problem
        'unicorn/prevent-abbreviations': ['warn', {
            extendDefaultWhitelist: true,
            checkDefaultAndNamespaceImports: true,
            checkShorthandImports: false,
            checkShorthandProperties: false,
            checkProperties: true,
            checkVariables: true,
            checkFilenames: true,
            replacements: {
                args: false,
                db: false,
                env: false,
                i: false,
                j: false,
                /* eslint-disable unicorn/prevent-abbreviations -- React-specific abbreviations */
                prop: false,
                props: false,
                ref: false,
                refs: false,
                /* eslint-enable unicorn/prevent-abbreviations */
            },
            ignore: [],
        }],
    },
};
