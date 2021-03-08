const path = require('path');

const del = require('del');
const glob = require('glob');
const gulp = require('gulp');
const gulpAsciidoctor = require('@asciidoctor/gulp-asciidoctor');
const gulpBabel = require('gulp-babel');
const gulpJsonEditor = require('gulp-json-editor');
const gulpRename = require('gulp-rename');
const gulpTypeScript = require('gulp-typescript');

const gulpSubPackage = require('./build/gulp-sub-package');

function fileExtension(from, to) {
    return path => {
        if (path.extname === `.${from}`) {
            path.extname = `.${to}`;
        }
    };
}

function typeScriptConfig(config, settings = {}) {
    const project = gulpTypeScript.createProject(config, settings);
    return project.src().pipe(project());
}

function clean(callback) {
    del(['dist']);
    callback();
}

function subPackages() {
    return new Promise((resolve, reject) => {
        glob('./dist/*/package.json', {}, (error, files) => {
            if (error) {
                reject(error);
            }
            resolve(
                files.map(file => path.dirname(file).split('/').pop()),
            );
        });
    });
}

/**
 * @see https://nodejs.org/api/packages.html#packages_subpath_exports
 */
function subPackageExports(packages) {
    return packages
        .map(name => [
            `./${name}`,
            {
                import: `./${name}/index.js`,
                require: `./${name}/index.cjs`,
            },
        ])
        .reduce((exports, [key, value]) => ({
            ...exports,
            [key]: value,
        }), {});
}

async function copyPackageJson() {
    const packages = await subPackages();
    return gulp.src('./package.json')
        .pipe(gulpJsonEditor({
            scripts: undefined,
            devDependencies: undefined,
            main: './index.cjs',
            module: './index.js',
            types: './index.d.ts',
            exports: {
                '.': {
                    import: './index.js',
                    require: './index.cjs',
                },
                ...subPackageExports(packages),
            },
        }))
        .pipe(gulp.dest('dist'));
}

function createSubPackageJson() {
    return gulp
        .src('./src/*/index.ts')
        .pipe(gulpSubPackage())
        .pipe(gulpJsonEditor({
            main: './index.cjs',
            module: './index.js',
            types: './index.d.ts',
            exports: {
                import: './index.js',
                require: './index.cjs',
            },
            sideEffects: false,
        }))
        .pipe(gulp.dest('dist'));
}

function copyStaticFiles() {
    return gulp
        .src([
            './LICENSE',
            './CHANGELOG.adoc',
            './README.adoc',
            './README.md',
        ])
        .pipe(
            gulp.dest('dist'),
        );
}

function buildEsm() {
    return typeScriptConfig('tsconfig.build.json', {
        module: 'esnext',
        allowSyntheticDefaultImports: true,
    })
        .pipe(gulpBabel())
        .pipe(gulp.dest('dist'));
}

function buildCommonJs() {
    return typeScriptConfig('tsconfig.build.json', {
        module: 'commonjs',
        esModuleInterop: true,
    })
        .pipe(gulpBabel())
        .pipe(gulpRename(fileExtension('js', 'cjs')))
        .pipe(gulp.dest('dist'));
}

function buildDeclarations() {
    return typeScriptConfig('tsconfig.build.json', {
        module: 'esnext',
        emitDeclarationOnly: true,
        declaration: true,
    }).pipe(gulp.dest('dist'));
}

function buildDocumentation() {
    return gulp.src('./src/index.adoc')
        .pipe(gulpAsciidoctor())
        .pipe(gulpRename(path => {
            path.basename = 'docs';
            return path;
        }))
        .pipe(gulp.dest('dist'));
}

exports.docs = buildDocumentation;

exports.default = gulp.series(
    clean,
    buildEsm,
    buildCommonJs,
    buildDeclarations,
    createSubPackageJson,
    copyPackageJson,
    copyStaticFiles,
    buildDocumentation,
);
