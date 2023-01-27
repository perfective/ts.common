// ./format
export {
    Format,
    format,
    formatted,
} from './format/format';
export {
    Tokens,
    tokens,
} from './format/tokens';

// ./string
export { lines } from './string/array';
export {
    charAt,
    charCodeAt,
    codePointAt,
    concat,
    concatTo,
    endsWith,
    includes,
    indexOf,
    lastIndexOf,
    lowerCase,
    normalize,
    NumberOrErrorCode,
    padEnd,
    padStart,
    repeat,
    replace,
    Replacement,
    replaceWith,
    search,
    slice,
    split,
    startsWith,
    trim,
    UnicodeCanonicalEquivalenceNormalization,
    UnicodeCompatibilityNormalization,
    UnicodeNormalizationForm,
    upperCase,
} from './string/lift';
/* eslint-disable deprecation/deprecation -- TODO: Remove in v0.10.0 */
export {
    isNotOutput,
    isOutput,
    Output,
    output,
} from './string/output';
/* eslint-enable deprecation/deprecation */
export {
    CodePoint,
    isEmpty,
    isNotEmpty,
    isNotString,
    isString,
    length,
    stringFromCharCode,
    stringFromCodePoint,
    Utf16CodeUnit,
} from './string/string';
