export {
    isFunction,
    isNotFunction,
} from './function/function';

export {
    Fallback,
    Nullary,
    Value,
    constant,
    empty,
    fallbackTo,
    valueOf,
} from './function/nullary';

export {
    Predicate,
    all,
    atLeast,
    atMost,
    either,
    exactly,
    is,
    isNot,
    neither,
    not,
} from './function/predicate';

export {
    Proposition,
    always,
    isFalse,
    isTrue,
    never,
} from './function/proposition';

export {
    Type,
    isInstanceOf,
    isNotInstanceOf,
} from './function/type';

export {
    TypeGuard,
    Unary,
    value,
} from './function/unary';

export {
    Binary,
} from './function/binary';

export {
    Ternary,
} from './function/ternary';
