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

describe('input', () => {
    it('casts an unknown value to the given Input<T> type', () => {
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
        // @ts-expect-error -- test behvaior when exactOptionalPropertyTypes is off.
        const query: {
            filter?: {
                status?: InputPrimitive<boolean>;
                colors?: InputPrimitive<string>[] | null;
            } | null;
            sort?: {
                direction?: InputPrimitive<'ascending' | 'descending'>;
            } | null;
        } | null | undefined = example?.query;
        const fragment: string | undefined = stringInput(example?.fragment);

        expect({
            params,
            query,
            fragment,
        } as Input<Example>).toStrictEqual(example);
    });
});

describe('stringInput', () => {
    it('validates that the given input is a string', () => {
        const inputString: InputPrimitive<string> = input<string>('0');
        const validString: string | undefined = stringInput(inputString);

        expect(validString)
            .toBe('0');
    });

    it('returns undefined when the given input is not a string', () => {
        expect(stringInput(0))
            .toBeUndefined();
    });
});

describe('numberInput', () => {
    it('validates that the given input is a number', () => {
        const inputNumber: InputPrimitive<number> = input<number>(3.14);
        const validNumber: number | undefined = numberInput(inputNumber);

        expect(validNumber)
            .toBe(3.14);
    });

    it('returns undefined when the given input is not a number', () => {
        expect(numberInput('3.14'))
            .toBeUndefined();
    });
});

describe('booleanInput', () => {
    it('validates that the given input is a boolean', () => {
        const inputBoolean: InputPrimitive<boolean> = input<boolean>(false);
        const validBoolean: boolean | undefined = booleanInput(inputBoolean);

        expect(validBoolean).toBe(false);
    });

    it('returns undefined when the given input is not boolean', () => {
        expect(booleanInput('true'))
            .toBeUndefined();
    });
});

describe('arrayInput', () => {
    it('validates that the given input is an array', () => {
        const inputColors: InputPrimitive<string>[] | null | undefined = input<string[]>([
            'red',
            'white',
            'blue',
        ]);
        const inputArray: (string | unknown | null | undefined)[] = arrayInput<string>(inputColors) ?? [];
        const validInput: string[] = inputArray.map(stringInput).filter(isDefined);

        expect(validInput)
            .toStrictEqual(['red', 'white', 'blue']);
    });

    it('returns undefined when the given input is not an array', () => {
        expect(arrayInput<string[]>({}))
            .toBeUndefined();
    });
});

describe('objectInput', () => {
    it('validates that the given input is an object', () => {
        const inputObject: InputObject<Example> | null | undefined = input<Example>({});
        const validInput: InputObject<Example> | undefined = objectInput(inputObject);

        expect(validInput)
            .toStrictEqual({});
    });

    it('returns undefined when the given input is not an object', () => {
        expect(objectInput(input<string>([])))
            .toBeUndefined();
    });
});

describe('nullInput', () => {
    it('validates that the given input is null', () => {
        const inputNull: Input<null> = input<null>(null);
        const validNull: null | undefined = nullInput(inputNull);

        expect(validNull)
            .toBeNull();
    });

    it('returns undefined when the given input is not null', () => {
        expect(nullInput(input<null>(undefined)))
            .toBeUndefined();
    });
});
