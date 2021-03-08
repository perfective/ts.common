module.exports = function babelPluginImportExtensions(_babel) {
    return {
        visitor: {
            CallExpression: commonJsExtension,
        },
    };
};

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
