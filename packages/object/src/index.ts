// ./object
export {
    isEmpty,
    isFalsy,
    isObject,
    isTruthy,
} from './object/predicate';
export {
    recordFromArray,
} from './object/record';
export {
    RecursivePartial,
} from './object/recursive-partial';

// ./property
export {
    by,
    hasAbsentProperty,
    hasDefinedProperty,
    hasNotNullProperty,
    hasNullProperty,
    hasPresentProperty,
    hasUndefinedProperty,
    ObjectWithAbsent,
    ObjectWithDefined,
    ObjectWithNotNull,
    ObjectWithNull,
    ObjectWithPresent,
    ObjectWithUndefined,
    property,
} from './property/property';
