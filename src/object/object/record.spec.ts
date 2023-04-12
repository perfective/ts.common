import { isTruthy } from './predicate';
import {
    assigned,
    filter,
    omit,
    pick,
    recordFiltered,
    recordFromArray,
    recordFromEntries,
    recordWithAssigned,
    recordWithOmitted,
    recordWithPicked,
} from './record';

describe(recordFromArray, () => {
    describe('when given an empty array', () => {
        it('creates an empty object', () => {
            expect(recordFromArray([])).toStrictEqual({});
        });
    });

    describe('when given an array', () => {
        it('creates an object with the given array values as keys and their indexes as values', () => {
            expect(recordFromArray(['a', 'b', 'c']))
                .toStrictEqual({
                    a: 0,
                    b: 1,
                    c: 2,
                });
        });
    });
});

describe(recordFromEntries, () => {
    describe('when given an empty array', () => {
        it('creates an empty object', () => {
            expect(recordFromEntries([]))
                .toStrictEqual({});
        });
    });

    describe('when given an array of entries', () => {
        it('creates an object with entries keys as properties and entries values as their values', () => {
            expect(recordFromEntries([
                ['number', 0],
                ['string', 'string'],
                ['undefined', undefined],
                ['null', null],
            ])).toStrictEqual({
                number: 0,
                string: 'string',
                null: null,
                undefined,
            });
        });
    });
});

interface Example {
    a: string;
    b: number;
    c: boolean;
    d: string[];
}

const input: Example = {
    a: '',
    b: 0,
    c: false,
    d: [],
};

describe(pick, () => {
    it('creates a copy of a record with the given properties', () => {
        const output: Pick<Example, 'a' | 'b'> = pick(input, 'a', 'b');

        expect(output).toStrictEqual({
            a: '',
            b: 0,
        } as Omit<Example, 'c' | 'd'>);
    });
});

describe(recordWithPicked, () => {
    describe('recordWithPicked(...properties)', () => {
        it('creates a copy of a record with the given properties', async () => {
            const output: Pick<Example, 'a' | 'b'> = await Promise.resolve(input).then(recordWithPicked('a', 'b'));

            expect(output).toStrictEqual({
                a: '',
                b: 0,
            } as Omit<Example, 'c' | 'd'>);
        });
    });
});

describe(omit, () => {
    it('creates a copy of a record without the given properties', () => {
        const output: Omit<Example, 'a' | 'b'> = omit(input, 'a', 'b');

        expect(output).toStrictEqual({
            c: false,
            d: [],
        } as Pick<Example, 'c' | 'd'>);
    });
});

describe(recordWithOmitted, () => {
    describe('recordWithOmitted(properties)', () => {
        it('creates a copy of a record without the given properties', async () => {
            const output: Omit<Example, 'a' | 'b'> = await Promise.resolve(input).then(recordWithOmitted('a', 'b'));

            expect(output).toStrictEqual({
                c: false,
                d: [],
            } as Pick<Example, 'c' | 'd'>);
        });
    });
});

describe(filter, () => {
    it('keeps only values that pass the filter', () => {
        const output: Partial<Example> = filter(input, isTruthy);

        expect(output)
            .toStrictEqual({
                d: [],
            } as Partial<Example>);
    });
});

describe(recordFiltered, () => {
    describe('recordFiltered(condition)', () => {
        it('keeps only values that pass the filter', async () => {
            const output: Partial<Example> = await Promise.resolve(input).then(recordFiltered(isTruthy));

            expect(output)
                .toStrictEqual({
                    d: [],
                } as Partial<Example>);
        });
    });
});

describe(assigned, () => {
    interface ExampleA {
        a: number;
        b: number;
    }
    const input: ExampleA = {
        a: 0,
        b: 1,
    };

    it('creates a shallow copy of the given value with the given overrides', () => {
        const output: ExampleA = assigned(input, {
            a: -1,
        });

        expect(output).toStrictEqual({
            a: -1,
            b: 1,
        } as ExampleA);
        expect(output).not.toBe(input);
    });

    it('creates a record instead of the original object', () => {
        const output: Date & ExampleA = assigned(new Date(), {
            a: 0,
            b: 1,
        } as ExampleA);

        expect(output).toBeInstanceOf(Object);
        expect(output).not.toBeInstanceOf(Date);
        expect(output).toStrictEqual({
            a: 0,
            b: 1,
        });
    });

    interface ExampleB {
        a: string;
        c: string;
    }

    it('extends a shallow copy of the given value with the given overrides', () => {
        const output: ExampleA & ExampleB = assigned(input, {
            a: '0',
            c: '1',
        } as ExampleB);

        expect(output).toStrictEqual({
            a: '0',
            b: 1,
            c: '1',
        } as ExampleA & ExampleB);
    });

    it('extends a shallow copy of the given value with the given multiple overrides', () => {
        const output: ExampleA & ExampleB = assigned(input, {
            a: '0',
            c: '1',
        } as ExampleB, {
            b: -1,
        } as Partial<ExampleA>);

        expect(output).toStrictEqual({
            a: '0',
            b: -1,
            c: '1',
        } as ExampleA & ExampleB);
    });
});

describe(recordWithAssigned, () => {
    interface ExampleA {
        a: number;
        b: number;
    }
    const input: ExampleA = {
        a: 0,
        b: 1,
    };

    describe('recordWithAssigned(...overrides)', () => {
        it('creates a shallow copy of the given value with the given overrides', () => {
            const output: ExampleA = recordWithAssigned<ExampleA>({
                a: -1,
            })(input);

            expect(output).toStrictEqual({
                a: -1,
                b: 1,
            } as ExampleA);
            expect(output).not.toBe(input);
        });

        interface ExampleB {
            a: string;
            c: string;
        }

        it('extends a shallow copy of the given value with the given overrides', () => {
            const output: ExampleA & ExampleB = recordWithAssigned<ExampleA, ExampleB>({
                a: '0',
                c: '1',
            } as ExampleB)(input);

            expect(output).toStrictEqual({
                a: '0',
                b: 1,
                c: '1',
            } as ExampleA & ExampleB);
        });

        it('extends a shallow copy of the given value with the given multiple overrides', () => {
            const output: ExampleA & ExampleB = recordWithAssigned<ExampleA, ExampleB>({
                a: '0',
                c: '1',
            } as ExampleB, {
                b: -1,
            } as Partial<ExampleA>)(input);

            expect(output).toStrictEqual({
                a: '0',
                b: -1,
                c: '1',
            } as ExampleA & ExampleB);
        });
    });
});
