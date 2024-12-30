import { describe, expect, it } from '@jest/globals';

import { isDefined } from '../../value/value';

import {
    arrayInput,
    booleanInput,
    Input,
    input,
    InputObject, InputPrimitive,
    nullInput,
    numberInput,
    objectInput,
    stringInput,
} from './input';

interface Example {
    params: {
        id: number;
        date: string;
    };
    query: {
        filter: {
            status: boolean;
            colors: string[];
        };
        sort: {
            direction: 'ascending' | 'descending';
        };
    };
    fragment: string;
}

describe(input, () => {
    describe('when given a value', () => {
        // eslint-disable-next-line complexity -- complexity is 1
        it('casts it to a given Input<T> type', () => {
            const unknownInput: unknown = {
                params: {
                    id: 1,
                },
                query: {
                    sort: {
                        direction: 'ascending',
                    },
                },
                fragment: 'partial',
            };
            const exampleInput: Input<Example> = input(unknownInput);
            const example: InputObject<Example> | undefined = objectInput(exampleInput);
            const params: {
                id?: InputPrimitive<number>;
                date?: InputPrimitive<string>;
            } | null | undefined = example?.params;
            const query: {
                filter?: {
                    status?: InputPrimitive<boolean>;
                    colors?: InputPrimitive<string>[] | null | undefined;
                } | null | undefined;
                sort?: {
                    direction?: InputPrimitive<'ascending' | 'descending'>;
                } | null | undefined;
            } | null | undefined = example?.query;
            const fragment: string | undefined = stringInput(example?.fragment);

            expect({
                params,
                query,
                fragment,
            } as Input<Example>).toStrictEqual(example);
        });
    });
});

describe(stringInput, () => {
    describe('when a given value is a string', () => {
        it('returns the given value', () => {
            const inputString: InputPrimitive<string> = input<string>('0');
            const validString: string | undefined = stringInput(inputString);

            expect(validString)
                .toBe('0');
        });
    });

    describe('when a given value is not a string', () => {
        it('returns undefined', () => {
            expect(stringInput(0))
                .toBeUndefined();
        });
    });
});

describe(numberInput, () => {
    describe('when a given value is a number', () => {
        it('returns the given value', () => {
            const inputNumber: InputPrimitive<number> = input<number>(3.14);
            const validNumber: number | undefined = numberInput(inputNumber);

            expect(validNumber)
                .toBe(3.14);
        });
    });

    describe('when a given value is not a number', () => {
        it('returns undefined', () => {
            expect(numberInput('3.14'))
                .toBeUndefined();
        });
    });
});

describe(booleanInput, () => {
    describe('when a given value is a boolean', () => {
        it('returns the given value', () => {
            const inputBoolean: InputPrimitive<boolean> = input<boolean>(false);
            const validBoolean: boolean | undefined = booleanInput(inputBoolean);

            expect(validBoolean).toBe(false);
        });
    });

    describe('when a given value is not a boolean', () => {
        it('returns undefined', () => {
            expect(booleanInput('true'))
                .toBeUndefined();
        });
    });
});

describe(arrayInput, () => {
    describe('when a given value is an array', () => {
        it('returns the given value', () => {
            const inputColors: InputPrimitive<string>[] | null | undefined = input<string[]>([
                'red',
                'white',
                'blue',
            ]);
            // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents -- listing types for testing
            const inputArray: (string | unknown | null | undefined)[] = arrayInput<string>(inputColors) as [];
            const validInput: string[] = inputArray.map(stringInput).filter(isDefined);

            expect(validInput)
                .toStrictEqual(['red', 'white', 'blue']);
        });
    });

    describe('when a given value is not an array', () => {
        it('returns undefined', () => {
            expect(arrayInput<string[]>({}))
                .toBeUndefined();
        });
    });
});

describe(objectInput, () => {
    describe('when a given value is an object', () => {
        it('returns the given value', () => {
            const inputObject: InputObject<Example> | null | undefined = input<Example>({});
            const validInput: InputObject<Example> | undefined = objectInput(inputObject);

            expect(validInput)
                .toStrictEqual({});
        });
    });

    describe('when a given value is not an object', () => {
        it('returns undefined', () => {
            expect(objectInput(input<string>([])))
                .toBeUndefined();
        });
    });
});

describe(nullInput, () => {
    describe('when a given value is null', () => {
        it('returns the given value', () => {
            const inputNull: Input<null> = input<null>(null);
            const validNull: null | undefined = nullInput(inputNull);

            expect(validNull)
                .toBeNull();
        });
    });

    describe('when a given value is not a null', () => {
        it('returns undefined', () => {
            expect(nullInput(input<null>(undefined)))
                .toBeUndefined();
        });
    });
});
