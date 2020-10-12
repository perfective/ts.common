# Perfective ESLint Config

`@perfective/eslint-config` provides
a [shareable ESLint configuration](https://eslint.org/docs/developer-guide/shareable-configs)
that is used for the development of the `@perfective` packages.
As the `@perfective` library itself,
these rules are configured for the TypeScript projects only.

In addition to the core [ESLint rules](https://eslint.org/docs/rules/)
and the [`@typescript-eslint`](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin) plugin rules,
`@perfective/eslint-config` configures:

* [`eslint-plugin-array-func`](https://github.com/freaktechnik/eslint-plugin-array-func);
* [`eslint-plugin-deprecation`](https://github.com/gund/eslint-plugin-deprecation);
* [`eslint-plugin-eslint-comments`](https://mysticatea.github.io/eslint-plugin-eslint-comments);
* [`eslint-plugin-import`](https://github.com/benmosher/eslint-plugin-import);
* [`eslint-plugin-jest`](https://github.com/jest-community/eslint-plugin-jest);
* [`eslint-plugin-jest-formatting`](https://github.com/dangreenisrael/eslint-plugin-jest-formatting);
* [`eslint-plugin-jsdoc`](https://github.com/gajus/eslint-plugin-jsdoc);
* [`eslint-plugin-node`](https://github.com/mysticatea/eslint-plugin-node);
* [`eslint-plugin-prefer-arrow`](https://github.com/TristonJ/eslint-plugin-prefer-arrow);
* [`eslint-plugin-promise`](https://github.com/xjamundx/eslint-plugin-promise);
* [`eslint-plugin-rxjs`](https://github.com/cartant/eslint-plugin-rxjs);
* [`eslint-plugin-simple-import-sort`](https://github.com/lydell/eslint-plugin-simple-import-sort#sort-order);
* [`eslint-plugin-sonarjs`](https://github.com/SonarSource/eslint-plugin-sonarjs);
* [`eslint-plugin-unicorn`](https://github.com/sindresorhus/eslint-plugin-unicorn).

To simplify configuring ESLint support in the IDEs and editors,
the severity of all fixable rules is `warning`.
That allows to visually distinguish errors that have to be fixed manually
from issues that will be fixed automatically.

## Setup

Require `@perfective/eslint-config` and its peer dependencies as dev dependencies.
```bash
npm install --save-dev \
    @perfective/eslint-config \
    @typescript-eslint/eslint-plugin \
    @typescript-eslint/parser \
    eslint \
    eslint-import-resolver-typescript \
    eslint-plugin-array-func \
    eslint-plugin-deprecation \
    eslint-plugin-eslint-comments \
    eslint-plugin-import \
    eslint-plugin-jest \
    eslint-plugin-jest-formatting \
    eslint-plugin-jsdoc \
    eslint-plugin-node \
    eslint-plugin-prefer-arrow \
    eslint-plugin-promise \
    eslint-plugin-rxjs \
    eslint-plugin-simple-import-sort \
    eslint-plugin-sonarjs \
    eslint-plugin-unicorn \
    tslint
```

Require the configuration in your root `.eslintrc.js` or `.eslintrc.json`.
```json
{
    "extends": ["@perfective"]
}
```

## TSLint

ESLint and its plugins replace most of the [TSLint](https://palantir.github.io/tslint/) rules.
Yet, there are plenty of rules that need to be supported.
Until then, it's recommended to also use the TSLint and its configuration.

Adding `tslint.json` to the project root:
```json
{
    "extends": ["@perfective/eslint-config/tslint"]
}
```

Read the [full documentation](https://github.com/perfective/js/blob/master/packages/estlint-config/README.adoc) 
in the repository.
