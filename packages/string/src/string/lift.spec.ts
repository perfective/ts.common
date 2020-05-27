import { lowerCase, split, trim, upperCase } from './lift';

describe('lowerCase', () => {
    describe('lowerCase()', () => {
        it('returns a string with all characters in lower case', () => {
            expect(lowerCase()('Example String'))
                .toStrictEqual('example string');
        });
    });
});

describe('split', () => {
    describe('split(separator)', () => {
        it('returns an array of strings split by a separator', () => {
            expect(split(',')('a,b,c'))
                .toStrictEqual(['a', 'b', 'c']);
        });

        it('returns an array with the original string when separator is not in the string', () => {
            expect(split(',')('abc'))
                .toStrictEqual(['abc']);
        });
    });

    describe('split(separator, limit)', () => {
        it('returns an array of strings split by a separator up to the limit count', () => {
            expect(split(',', 2)('a,b,c'))
                .toStrictEqual(['a', 'b']);
        });

        it('returns an array with the floored limit value', () => {
            expect(split(',', 2.9)('a,b,c'))
                .toStrictEqual(['a', 'b']);
        });

        it('returns an empty array when limit is 0', () => {
            expect(split(',', 0)('a,b,c'))
                .toStrictEqual([]);
        });

        it('returns an array with all split elements when limit is negative', () => {
            expect(split(',', -1)('a,b,c'))
                .toStrictEqual(['a', 'b', 'c']);
        });
    });
});

describe('trim', () => {
    describe('trim()', () => {
        it('removes the leading and trailing white spaces, line terminators from a string', () => {
            expect(trim()(' \tabc \n'))
                .toStrictEqual('abc');
        });
    });
});

describe('upperCase', () => {
    describe('upperCase()', () => {
        it('returns a string with all characters in upper case', () => {
            expect(upperCase()('Example String'))
                .toStrictEqual('EXAMPLE STRING');
        });
    });
});
