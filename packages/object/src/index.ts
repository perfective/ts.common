// ./object
export {
    copy,
} from './object/object';
export {
    isEmpty,
    isFalsy,
    isObject,
    isRecord,
    isTruthy,
} from './object/predicate';
export {
    Entry,
    recordFromArray,
    recordFromEntries,
    toRecordFromEntries,
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
