const gulp = require('gulp');

const build = require('@perfective/build/gulp');

exports.clean = build.clean(['./dist']);
exports.docs = build.asciidoctor();
exports.default = gulp.series(
    exports.clean,
    build.typescript.esmBuild(),
    build.typescript.cjsBuild(),
    build.typescript.tsDeclarations(),
    build.packageJson.subPackageJson('@perfective/common'),
    build.packageJson.packageJson(),
    build.copy([
        './LICENSE*',
        './CHANGELOG*',
        './README*',
    ], './dist'),
    exports.docs,
);
