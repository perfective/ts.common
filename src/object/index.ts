// ./enum
export {
    Enum,
    Member,
    members,
} from './enum/enum';

// ./input
export {
    arrayInput,
    booleanInput,
    Input,
    input,
    InputArray,
    InputObject,
    InputPrimitive,
    nullInput,
    numberInput,
    objectInput,
    stringInput,
} from './input/input';

// ./object
export {
    clone,
    copy,
    hasMethod,
    hasNoMethod,
} from './object/object';
export {
    isEmpty,
    // eslint-disable-next-line deprecation/deprecation -- TODO(https://github.com/perfective/ts.common/issues/31)
    isFalsy,
    isObject,
    isRecord,
    // eslint-disable-next-line deprecation/deprecation -- TODO(https://github.com/perfective/ts.common/issues/31)
    isTruthy,
} from './object/predicate';
export {
    assigned,
    Entry,
    filter,
    omit,
    pick,
    recordFiltered,
    recordFromArray,
    recordFromEntries,
    recordWithAssigned,
    recordWithOmitted,
    recordWithPicked,
    toRecordFromEntries,
} from './object/record';
export { RecursivePartial } from './object/recursive-partial';

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
