import gulp from 'gulp';

import * as build from '@perfective/build/gulp';

export const clean = build.clean(['./dist']);
export const docs = build.asciidoctor();
const full = gulp.series(
    clean,
    build.typescript.esmBuild(),
    build.typescript.cjsBuild(),
    build.typescript.tsDeclarations(),
    build.packageJson.subPackageJson('@perfective/common', {
        type: 'module',
    }),
    build.packageJson.packageJson(),
    build.copy([
        './LICENSE*',
        './CHANGELOG*',
        './README*',
    ], './dist'),
    docs,
);

export default full;
