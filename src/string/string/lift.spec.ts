import {
    charAt,
    charCodeAt,
    codePointAt,
    concat,
    concatTo,
    endsWith,
    includes,
    indexOf,
    lastIndexOf,
    lowerCase,
    normalize,
    padEnd,
    padStart,
    repeat,
    replace,
    replaceWith,
    search,
    slice,
    split,
    startsWith,
    trim,
    upperCase,
} from './lift';

describe(charAt, () => {
    describe('charAt(index)', () => {
        it('returns the character at the given index', () => {
            expect(charAt(0)('CharAt')).toBe('C');
            expect(charAt(5)('CharAt')).toBe('t');
        });

        it('returns an empty string for the out of bound index', () => {
            expect(charAt(-1)('CharAt')).toBe('');
            expect(charAt(6)('CharAt')).toBe('');
        });
    });
});

describe(charCodeAt, () => {
    describe('charCodeAt(index)', () => {
        it('returns the Unicode value of the character at the given index', () => {
            expect(charCodeAt(0)('ABC')).toBe(65);
            expect(charCodeAt(1)('ABC')).toBe(66);
            expect(charCodeAt(2)('ABC')).toBe(67);
        });

        it('returns NaN for the out of bound index', () => {
            expect(charCodeAt(-1)('ABC')).toStrictEqual(Number.NaN);
            expect(charCodeAt(3)('ABC')).toStrictEqual(Number.NaN);
        });
    });
});

describe(codePointAt, () => {
    describe('codePointAt(position)', () => {
        /* eslint-disable jest/max-expects -- checking different codepoints */
        describe('when UTF-16 surrogate pair is available', () => {
            it('returns code point value at the given position', () => {
                expect(codePointAt(0)('\u{1F1FA}')).toBe(0x1F1FA);
                expect(codePointAt(0)('🇺')).toBe(0x1F1FA);
                expect(codePointAt(0)('🇺🇸')).toBe(0x1F1FA);
                expect(codePointAt(0)('\u{1F1F8}')).toBe(0x1F1F8);
                expect(codePointAt(0)('🇸')).toBe(0x1F1F8);
                expect(codePointAt(2)('🇺🇸')).toBe(0x1F1F8);
            });
        });

        describe('when UTF-16 surrogate pair is not available', () => {
            it('returns code unit at the given position', () => {
                expect(codePointAt(0)('\u00A9')).toBe(0xA9);
                expect(codePointAt(0)('©')).toBe(0xA9);
                expect(codePointAt(0)('\uDDFA')).toBe(0xDDFA);
                expect(codePointAt(1)('🇺')).toBe(0xDDFA);
                expect(codePointAt(1)('🇺🇸')).toBe(0xDDFA);
                expect(codePointAt(0)('\uDDF8')).toBe(0xDDF8);
                expect(codePointAt(1)('🇸')).toBe(0xDDF8);
                expect(codePointAt(3)('🇺🇸')).toBe(0xDDF8);
            });
        });

        describe('when no element at the specified position is available', () => {
            it('returns undefined', () => {
                expect(codePointAt(1)('©')).toBeUndefined();
                expect(codePointAt(2)('🇺')).toBeUndefined();
                expect(codePointAt(2)('🇸')).toBeUndefined();
                expect(codePointAt(4)('🇺🇸')).toBeUndefined();
            });
        });
        /* eslint-enable jest/max-expects */
    });
});

describe(concat, () => {
    describe('concat(strings)', () => {
        it('concatenates provided strings to the end', () => {
            expect(concat('!')('Hello')).toBe('Hello!');
            expect(concat(' ', 'World', '!')('Hello')).toBe('Hello World!');
            // eslint-disable-next-line unicorn/no-useless-spread -- a demo of a spread for testing only
            expect(concat(...[' ', 'World', '!'])('Hello')).toBe('Hello World!');
        });
    });
});

describe(concatTo, () => {
    describe('concatTo(value)', () => {
        it('concatenates input strings to the given value', () => {
            expect(concatTo('Hello')('!')).toBe('Hello!');
            expect(concatTo('Hello')([' ', 'World', '!'])).toBe('Hello World!');
        });

        it('concatenates input string when passed into the unary', async () => {
            const output: string = await Promise.resolve([' ', 'World', '!']).then(concatTo('Hello'));

            expect(output).toBe('Hello World!');
        });
    });
});

describe(endsWith, () => {
    describe('endsWith(search)', () => {
        describe('when the given value ends with the search substring', () => {
            it('returns true', () => {
                expect(endsWith('World')('Hello World')).toBe(true);
            });
        });

        describe('when the given value does not end with the search substring', () => {
            it('returns false', () => {
                expect(endsWith('World')('Hello World!')).toBe(false);
            });
        });
    });

    describe('endsWith(search, length)', () => {
        describe('when a substring of the value of given length ends with the search substring', () => {
            it('returns true', () => {
                expect(endsWith('Hello', 5)('Hello World')).toBe(true);
            });
        });

        describe('when a substring of the value of given length does not end with the search substring', () => {
            it('returns false', () => {
                expect(endsWith('World', 5)('Hello World')).toBe(false);
            });
        });
    });
});

describe(includes, () => {
    describe('includes(search)', () => {
        describe('when the given value includes the search substring', () => {
            it('returns true', () => {
                expect(includes('W')('Hello World')).toBe(true);
                expect(includes('o W')('Hello World')).toBe(true);
            });
        });

        describe('when the given value does not include the search substring', () => {
            it('returns false', () => {
                expect(includes('!')('Hello World')).toBe(false);
                expect(includes('O W')('Hello World')).toBe(false);
            });
        });
    });

    describe('includes(search, position)', () => {
        describe('when the given value starting from position includes the search substring', () => {
            it('returns true', () => {
                expect(includes('W', 6)('Hello World')).toBe(true);
                expect(includes('W', -1)('Hello World')).toBe(true);
            });
        });

        describe('when the given value starting from position does not include the search substring', () => {
            it('returns true', () => {
                expect(includes('W', 7)('Hello World')).toBe(false);
                expect(includes('W', 11)('Hello World')).toBe(false);
            });
        });
    });
});

describe('indexOf', () => {
    describe('indexOf(search)', () => {
        describe('when substring is present', () => {
            it('returns the index of the search substring in the given value', () => {
                expect(indexOf('')('Hello World')).toBe(0);
                expect(indexOf('World')('Hello World')).toBe(6);
            });
        });

        describe('when the search substring is not present in the given value', () => {
            it('returns -1', () => {
                expect(indexOf('Earth')('Hello World')).toBe(-1);
            });
        });

        it('performs case-sensitive search', () => {
            expect(indexOf('world')('Hello World')).toBe(-1);
        });
    });

    describe('indexOf(search, from)', () => {
        describe('when substring is present', () => {
            it('returns the index of the search substring in the given value', () => {
                expect(indexOf('', 6)('Hello World')).toBe(6);
                expect(indexOf('World', 6)('Hello World')).toBe(6);
                expect(indexOf('World', -5)('Hello World')).toBe(6);
            });
        });

        describe('when the from index is negative', () => {
            it('returns the index of the search substring', () => {
                expect(indexOf('Hello', -5)('Hello World')).toBe(0);
                expect(indexOf('World', -5)('Hello World')).toBe(6);
            });
        });

        describe('when the search substring is not present in the given value', () => {
            it('returns -1', () => {
                expect(indexOf('Hello', 6)('Hello World')).toBe(-1);
                expect(indexOf('world', 6)('Hello World')).toBe(-1);
            });
        });
    });
});

describe('lastIndexOf', () => {
    describe('lastIndexOf(search)', () => {
        it('returns the index of the last occurrence of the search value', () => {
            expect(lastIndexOf('One')('One, two, three. One.'))
                .toBe(17);
        });

        describe('when the search value is not found', () => {
            it('returns -1', () => {
                expect(lastIndexOf('Four')('One, two, three. One.'))
                    .toBe(-1);
            });
        });

        it('performs case-sensitive search', () => {
            expect(lastIndexOf('one')('One, two, three. One.'))
                .toBe(-1);
        });
    });

    describe('lastIndexOf(search, from)', () => {
        describe('when "from" index less than string length', () => {
            it('returns the index of the last occurrence', () => {
                expect(lastIndexOf('two', 17)('One, two, three. One, two.'))
                    .toBe(5);
            });
        });

        describe('when "from" index above string length', () => {
            it('returns the index of the last occurrence', () => {
                expect(lastIndexOf('two', 26)('One, two, three. One, two.'))
                    .toBe(22);
            });
        });

        describe('when the string starts with the "search"', () => {
            it('returns 0 for "from" index less or equal 0', () => {
                expect(lastIndexOf('One', 0)('One, two, three. One, two.'))
                    .toBe(0);
                expect(lastIndexOf('One', -24)('One, two, three. One, two.'))
                    .toBe(0);
            });
        });

        describe('when the string does not start with the "search"', () => {
            it('returns -1 for "from" index less or equal 0', () => {
                expect(lastIndexOf('two', 0)('One, two, three. One, two.'))
                    .toBe(-1);
                expect(lastIndexOf('two', -24)('One, two, three. One, two.'))
                    .toBe(-1);
            });
        });
    });
});

describe(lowerCase, () => {
    it('returns a string with all characters in lower case', () => {
        expect(lowerCase('Example String'))
            .toBe('example string');
    });
});

describe(normalize, () => {
    describe('normalize()', () => {
        it('uses canonical equivalence normalization in composed form by default', () => {
            expect(normalize()('\u00F1'))
                .toStrictEqual(normalize()('\u006E\u0303'));
        });
    });

    describe(`normalize('NFC')`, () => {
        it('normalizes a unicode string with canonical equivalence normalization in composed form', () => {
            expect(normalize('NFC')('\u00F1'))
                .toHaveLength(1);
            expect(normalize('NFC')('\u006E\u0303'))
                .toHaveLength(1);
            expect(normalize('NFC')('\u00F1'))
                .toStrictEqual(normalize('NFC')('\u006E\u0303'));
        });
    });

    describe(`normalize('NFD')`, () => {
        it('normalizes a unicode string with canonical equivalence normalization in decomposed form', () => {
            expect(normalize('NFD')('\u00F1'))
                .toHaveLength(2);
            expect(normalize('NFD')('\u006E\u0303'))
                .toHaveLength(2);
            expect(normalize('NFD')('\u00F1'))
                .toStrictEqual(normalize('NFD')('\u006E\u0303'));
        });
    });

    describe(`normalize('NFKC')`, () => {
        it('normalize a unicode string with compatibility-composed normalization', () => {
            expect(normalize('NFKC')('\u1E9B\u0323'))
                .toBe('\u1E69');
        });
    });

    describe(`normalize('NFKD')`, () => {
        it('normalize a unicode string with compatibility-decomposed normalization', () => {
            expect(normalize('NFKD')('\u1E9B\u0323'))
                .toBe('\u0073\u0323\u0307');
        });
    });
});

describe(padEnd, () => {
    describe('padEnd(length)', () => {
        describe('when the target `length` is greater than the input string length', () => {
            it('makes a string of the target "length" by adding spaces to the end of the string', () => {
                expect(padEnd(15)('Hello, World!'))
                    .toBe('Hello, World!  ');
            });
        });

        describe('when the given `length` is less than or equal to the input string length', () => {
            it('returns the input string as is', () => {
                expect(padEnd(10)('Hello, World!'))
                    .toBe('Hello, World!');
            });
        });
    });

    describe('padEnd(length, fill)', () => {
        it('makes a string of the given `length` by adding "fill" strings to the end of the string', () => {
            expect(padEnd(15, '?!')('Hello, World!'))
                .toBe('Hello, World!?!');
            expect(padEnd(16, '?!')('Hello, World!'))
                .toBe('Hello, World!?!?');
            expect(padEnd(17, '?!')('Hello, World!'))
                .toBe('Hello, World!?!?!');
        });
    });
});

describe(padStart, () => {
    describe('padStart(length)', () => {
        describe('when the given `length` is greater than the input string length', () => {
            it('makes a string of the target "length" by adding spaces to the beginning of the string', () => {
                expect(padStart(15)('Hello, World!'))
                    .toBe('  Hello, World!');
            });
        });

        describe('when the given `length` is less than or equal to the input string length', () => {
            it('returns the input string as is', () => {
                expect(padStart(10)('Hello, World!'))
                    .toBe('Hello, World!');
            });
        });
    });

    describe('padStart(length, fill)', () => {
        it('makes a string of the target "length" by adding "fill" strings to the beginning of the string', () => {
            expect(padStart(15, '* ')('Hello, World!'))
                .toBe('* Hello, World!');
            expect(padStart(16, '* ')('Hello, World!'))
                .toBe('* *Hello, World!');
            expect(padStart(17, '* ')('Hello, World!'))
                .toBe('* * Hello, World!');
        });
    });
});

describe(repeat, () => {
    describe('repeat(count)', () => {
        it('repeats the input string the given "count" of times', () => {
            expect(repeat(3)('A'))
                .toBe('AAA');
            expect(repeat(2)('Abc'))
                .toBe('AbcAbc');
            expect(repeat(1)('Abc'))
                .toBe('Abc');
        });

        describe('when the given `count` is 0', () => {
            it('returns an empty string', () => {
                expect(repeat(0)('A'))
                    .toBe('');
            });
        });

        describe('when the given `count` is a negative number', () => {
            it('throws a RangeError', () => {
                expect(() => repeat(-1)('A'))
                    .toThrow(RangeError);
            });
        });
    });
});

describe(replace, () => {
    it('replaces the first occurrence of a given substring', () => {
        expect(replace('One', 'Uno')('One, two, three. One, two.'))
            .toBe('Uno, two, three. One, two.');
    });

    it('replaces the first occurrence of a given RegExp without a global flag', () => {
        expect(replace(/One/u, 'Uno')('One, two, three. One, two.'))
            .toBe('Uno, two, three. One, two.');
    });

    it('replaces all occurrences of a given RegExp with a global flag', () => {
        expect(replace(/One/gu, 'Uno')('One, two, three. One, two.'))
            .toBe('Uno, two, three. Uno, two.');
    });
});

describe(replaceWith, () => {
    it('replaces the first occurrence of a given substring', () => {
        expect(replaceWith('One', match => match.toLowerCase())('One, two, three. One, two.'))
            .toBe('one, two, three. One, two.');
    });

    it('replaces the first occurrence of a given RegExp without a global flag', () => {
        expect(replaceWith(/(\w{3}), (\w{3})/u, match => match.toLowerCase())('One, two, three. One, two.'))
            .toBe('one, two, three. One, two.');
    });

    it('replaces the first occurrence of a given RegExp with a global flag', () => {
        expect(replaceWith(/(\w{3}), (\w{3})/gu, match => match.toLowerCase())('One, two, three. One, two.'))
            .toBe('one, two, three. one, two.');
    });
});

describe(search, () => {
    it('returns an index of the first match between the regular expression and the given string', () => {
        expect(search(/\w{5}/u)('One, two, three. Six, seven, eight.'))
            .toBe(10);
    });

    describe('when no match is found', () => {
        it('returns -1', () => {
            expect(search(/\w{6}/u)('One, two, three. Six, seven, eight.'))
                .toBe(-1);
        });
    });
});

describe(slice, () => {
    describe('slice(start)', () => {
        it('returns a substring of the given string from the positive "start" index', () => {
            expect(slice(7)('Hello, World'))
                .toBe('World');
        });

        it('returns a substring of the given string from the negative "start" index', () => {
            expect(slice(-5)('Hello, World'))
                .toBe('World');
        });
    });

    describe('slice(start, end)', () => {
        it('returns a substring of the given string from the positive "start" and "end" indexes', () => {
            expect(slice(17, 20)('One, two, three. One, two.'))
                .toBe('One');
        });

        it('returns a substring of the given string from the negative "start" and "end" indexes', () => {
            expect(slice(-9, -6)('One, two, three. One, two.'))
                .toBe('One');
        });
    });
});

describe(split, () => {
    describe('split(separator)', () => {
        it('returns an array of strings split by a separator', () => {
            expect(split(',')('a,b,c'))
                .toStrictEqual(['a', 'b', 'c']);
        });

        describe('when a given separator is not in the string', () => {
            it('returns an array with the original string', () => {
                expect(split(',')('abc'))
                    .toStrictEqual(['abc']);
            });
        });
    });

    describe('split(separator, limit)', () => {
        it('returns an array of strings split by a separator up to the limit count', () => {
            expect(split(',', 2)('a,b,c'))
                .toStrictEqual(['a', 'b']);
        });

        describe('when then given `limit` is a float number', () => {
            it('returns an array with the floored limit value', () => {
                expect(split(',', 2.9)('a,b,c'))
                    .toStrictEqual(['a', 'b']);
            });
        });

        describe('when the given `limit` is zero', () => {
            it('returns an empty array', () => {
                expect(split(',', 0)('a,b,c'))
                    .toStrictEqual([]);
            });
        });

        describe('when the given `limit` is negative', () => {
            it('returns an array with all split elements', () => {
                expect(split(',', -1)('a,b,c'))
                    .toStrictEqual(['a', 'b', 'c']);
            });
        });
    });
});

describe(startsWith, () => {
    describe('startsWith(search)', () => {
        describe('when the string starts with the given "search"', () => {
            it('returns true', () => {
                expect(startsWith('Hello')('Hello, World'))
                    .toBe(true);
            });
        });

        describe('when the string does not start with the given "search"', () => {
            it('returns false', () => {
                expect(startsWith('World')('Hello, World'))
                    .toBe(false);
            });
        });

        it('is case sensitive', () => {
            expect(startsWith('hello')('Hello, World'))
                .toBe(false);
        });
    });

    describe('startsWith(search, from)', () => {
        describe('when the string starts with the given "search" in the "from" index', () => {
            it('returns true', () => {
                expect(startsWith('World', 7)('Hello, World'))
                    .toBe(true);
            });
        });

        describe('when the string does not start with the given "search" in the "from" index', () => {
            it('returns false', () => {
                expect(startsWith('Hello', 7)('Hello, World'))
                    .toBe(false);
            });
        });
    });
});

describe(trim, () => {
    it('removes the leading and trailing white spaces, line terminators from a string', () => {
        expect(trim(' \tabc\u00A0\n'))
            .toBe('abc');
    });
});

describe(upperCase, () => {
    it('returns a string with all characters in upper case', () => {
        expect(upperCase('Example String'))
            .toBe('EXAMPLE STRING');
    });
});
