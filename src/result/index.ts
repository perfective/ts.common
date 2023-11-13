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
    // eslint-disable-next-line deprecation/deprecation -- TODO(https://github.com/perfective/ts.common/issues/31)
    recovery,
    Result,
    result,
    resultFrom,
    resultOf,
    Success,
    success,
    successFrom,
} from './result/result';
