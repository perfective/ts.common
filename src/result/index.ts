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
    that,
    through,
    to,
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
    recovery,
    Result,
    result,
    resultFrom,
    resultOf,
    Success,
    success,
    successFrom,
} from './result/result';
