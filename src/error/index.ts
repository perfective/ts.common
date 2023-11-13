// ./error
export {
    error,
    errorOutput,
    isError,
    isNotError,
    stack,
} from './error/error';
export {
    evalError,
    isEvalError,
    isNotEvalError,
} from './error/eval-error';
export {
    isNotRangeError,
    isRangeError,
    rangeError,
} from './error/range-error';
export {
    isNotReferenceError,
    isReferenceError,
    referenceError,
} from './error/reference-error';
export {
    isNotSyntaxError,
    isSyntaxError,
    syntaxError,
} from './error/syntax-error';
export {
    isNotTypeError,
    isTypeError,
    typeError,
} from './error/type-error';

// ./error/recovery
export { Recovery } from './error/recovery/recovery';

// ./error/trace
export {
    stackTrace,
    Trace,
    trace,
} from './error/trace/trace';

// ./exception
export {
    caughtError,
    causedBy,
    chained,
    chainStack,
    Exception,
    exception,
    fault,
    isException,
    isNotException,
    unchained,
    // eslint-disable-next-line deprecation/deprecation -- TODO(https://github.com/perfective/ts.common/issues/31)
    unknownError,
} from './exception/exception';
export { ExceptionContext } from './exception/exception-context';
export {
    ExceptionMessage,
    exceptionMessage,
    exceptionMessageOutput,
} from './exception/exception-message';
export { ExceptionTokens } from './exception/exception-tokens';

// ./failure
export {
    Failure,
    failure,
} from './failure/failure';

// ./panic
export {
    Panic,
    panic,
    /* eslint-disable deprecation/deprecation -- TODO(https://github.com/perfective/ts.common/issues/31) */
    Rethrow,
    rethrow,
    /* eslint-enable deprecation/deprecation */
    rethrows,
    throws,
} from './panic/panic';
