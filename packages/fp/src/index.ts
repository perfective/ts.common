export {
    isFunction,
    isNotFunction,
} from './function/function';

export {
    Nullary,
    Value,
    constant,
    empty,
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
    negative,
    neither,
    not,
} from './function/predicate';

export {
    Proposition,
    isFalse,
    isTrue,
} from './function/proposition';

export {
    Type,
    isInstanceOf,
    isNotInstanceOf,
} from './function/type';

export {
    TypeGuard,
} from './function/type-guard';

export {
    Unary,
    same,
} from './function/unary';

export {
    Binary,
} from './function/binary';

export {
    Ternary,
} from './function/ternary';
