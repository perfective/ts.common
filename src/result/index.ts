export {
    BiFoldResult,
    BiMapResult,
    BiVoidResult,
    failureWith,
    successWith,
} from './result/arguments';
export {
    into,
    onto,
    or,
    otherwise,
    that,
    through,
    to,
    when,
    which,
} from './result/lift';
export {
    promisedResult,
    rejection,
    settledResult,
} from './result/promise';
export {
    Failure,
    failure,
    failureFrom,
    isFailure,
    isNotFailure,
    isNotResult,
    isNotSuccess,
    isResult,
    isSuccess,
    Result,
    result,
    resultFrom,
    resultOf,
    Success,
    success,
    successFrom,
} from './result/result';
