/* eslint-disable n/no-unpublished-import -- dev-only */
import gulp from 'gulp';

import * as build from '@perfective/build/gulp';

/* eslint-enable n/no-unpublished-import */

export const clean = build.clean(['./dist']);
export const docs = build.asciidoctor();
const full = gulp.series(
    clean,
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
    docs,
);

// eslint-disable-next-line import/no-default-export -- required for configuration
export default full;
