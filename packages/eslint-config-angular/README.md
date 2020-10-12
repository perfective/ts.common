# Perfective ESLint Config for Angular

`@perfective/eslint-config-angular` provides
a [shareable ESLint configuration](https://eslint.org/docs/developer-guide/shareable-configs)
that is used for the development of the `@perfective` [Angular](https://angular.io) packages.
This package is based on the
[`@perfective/eslint-config`](https://www.npmjs.com/package/@perfective/eslint-config) package.

`@perfective/eslint-config-angular` uses the following ESLint plugins:

* [`@angular-eslint/eslint-plugin`](https://github.com/angular-eslint/angular-eslint);
* [`eslint-plugin-jest-dom`](https://github.com/testing-library/eslint-plugin-jest-dom);
* [`eslint-plugin-rxjs-angular`](https://github.com/cartant/eslint-plugin-rxjs-angular);
* [`eslint-plugin-testing-library`](https://github.com/testing-library/eslint-plugin-testing-library).

## Setup

1. Require `@perfective/eslint-config-angular` and its peer dependencies as dev dependencies:
```bash
npm install --save-dev \
    @perfective/eslint-config-angular \
    @angular-eslint/eslint-plugin \
    @angular-eslint/eslint-plugin-template \
    @angular-eslint/template-parser \
    @typescript-eslint/eslint-plugin \
    @typescript-eslint/parser \
    eslint \
    eslint-import-resolver-typescript \
    eslint-plugin-array-func \
    eslint-plugin-deprecation \
    eslint-plugin-eslint-comments \
    eslint-plugin-import \
    eslint-plugin-jest \
    eslint-plugin-jest-dom \
    eslint-plugin-jest-formatting \
    eslint-plugin-jsdoc \
    eslint-plugin-node \
    eslint-plugin-prefer-arrow \
    eslint-plugin-promise \
    eslint-plugin-rxjs \
    eslint-plugin-rxjs-angular \
    eslint-plugin-simple-import-sort \
    eslint-plugin-sonarjs \
    eslint-plugin-testing-library \
    eslint-plugin-unicorn \
    tslint \
    codelyzer
```

2. Require the configuration in your root `.eslintrc.js` or `.eslintrc.json`.
```json
{
    "extends": [
        "@perfective/eslint-config-angular"
    ]
}
```

## TSLint

While the [`@angular-eslint/eslint-plugin`](https://github.com/angular-eslint/angular-eslint) is
still in active development,
[Codelyzer](https://github.com/mgechev/codelyzer) is used to increase the quality coverage.
It's based on the deprecated [TSLint](https://palantir.github.io/tslint/).

Add `tslint.json` to the project root.
```json
{
    "extends": ["@perfective/eslint-config-angular/tslint"]
}
```

Read the [full documentation](https://github.com/perfective/js/blob/master/packages/estlint-config-angular/README.adoc) 
in the repository.
