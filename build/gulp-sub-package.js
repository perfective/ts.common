const path = require('path');
const stream = require('stream');

function subPackageName(filepath) {
    return path.dirname(filepath)
        .split('/')
        .pop();
}

function subPackagePath(originalPath) {
    return `${path.dirname(originalPath)}/package.json`;
}

module.exports = function gulpSubPackage() {
    const gulpStream = new stream.Transform({ objectMode: true });

    // eslint-disable-next-line no-underscore-dangle -- external method
    gulpStream._transform = (vinyl, encoding, callback) => {
        vinyl.path = subPackagePath(vinyl.path);
        vinyl.contents = Buffer.from(JSON.stringify({
            name: `@perfective/common/${subPackageName(vinyl.path)}`,
        }), encoding);
        callback(null, vinyl);
    };

    return gulpStream;
};
