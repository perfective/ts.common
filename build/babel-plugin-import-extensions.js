module.exports = function babelPluginImportExtensions(_babel) {
    return {
        visitor: {
            ImportDeclaration: esmModuleExtension,
            ExportDeclaration: esmModuleExtension,
            CallExpression: commonJsExtension,
        },
    };
};

function esmModuleExtension(path, state) {
    if (path.node.source !== null
        && isEsmModule(state.file.opts.filename)) {
        mjsExtension(path.node.source);
    }
}

const esmModuleFilenamePattern = /\.m?js$/u;

function isEsmModule(source) {
    return source.match(esmModuleFilenamePattern) !== null;
}

function mjsExtension(source) {
    if (isRelativePath(source.value)) {
        source.value += '.mjs';
    }
}

function commonJsExtension(path) {
    if (path.get('callee').isIdentifier({ name: 'require' })
        && path.get('arguments.0').isStringLiteral()
    ) {
        cjsExtension(path.container.init.arguments[0]);
    }
}

function cjsExtension(argument) {
    if (isRelativePath(argument.value)) {
        argument.value += '.cjs';
    }
}
const relativePathPattern = /\.{1,2}\//u;
const extensionsPattern = /\.([cm]?)js$/u;

function isRelativePath(value) {
    return value.match(relativePathPattern)
        && !value.match(extensionsPattern);
}
