import {
    charAt,
    charCodeAt,
    codePointAt,
    concat,
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

describe('charAt', () => {
    describe('charAt(index)', () => {
        it('returns the character at the specified index', () => {
            expect(charAt(0)('CharAt')).toStrictEqual('C');
            expect(charAt(5)('CharAt')).toStrictEqual('t');
        });

        it('returns an empty string for the out of bound index', () => {
            expect(charAt(-1)('CharAt')).toStrictEqual('');
            expect(charAt(6)('CharAt')).toStrictEqual('');
        });
    });
});

describe('charCodeAt', () => {
    describe('charCodeAt(index)', () => {
        it('returns the Unicode value of the character at the specified index', () => {
            expect(charCodeAt(0)('ABC')).toStrictEqual(65);
            expect(charCodeAt(1)('ABC')).toStrictEqual(66);
            expect(charCodeAt(2)('ABC')).toStrictEqual(67);
        });

        it('returns NaN for the out of bound index', () => {
            expect(charCodeAt(-1)('ABC')).toStrictEqual(Number.NaN);
            expect(charCodeAt(3)('ABC')).toStrictEqual(Number.NaN);
        });
    });
});

describe('codePointAt', () => {
    describe('codePointAt(position)', () => {
        it('returns code point value at the given position when UTF-16 surrogate pair is available', () => {
            expect(codePointAt(0)('\u{1F1FA}')).toStrictEqual(0x1F1FA);
            expect(codePointAt(0)('🇺')).toStrictEqual(0x1F1FA);
            expect(codePointAt(0)('🇺🇸')).toStrictEqual(0x1F1FA);
            expect(codePointAt(0)('\u{1F1F8}')).toStrictEqual(0x1F1F8);
            expect(codePointAt(0)('🇸')).toStrictEqual(0x1F1F8);
            expect(codePointAt(2)('🇺🇸')).toStrictEqual(0x1F1F8);
        });

        it('returns code unit at the given position when UTF-16 surrogate pair is not available', () => {
            expect(codePointAt(0)('\u00A9')).toStrictEqual(0xA9);
            expect(codePointAt(0)('©')).toStrictEqual(0xA9);
            expect(codePointAt(0)('\uDDFA')).toStrictEqual(0xDDFA);
            expect(codePointAt(1)('🇺')).toStrictEqual(0xDDFA);
            expect(codePointAt(1)('🇺🇸')).toStrictEqual(0xDDFA);
            expect(codePointAt(0)('\uDDF8')).toStrictEqual(0xDDF8);
            expect(codePointAt(1)('🇸')).toStrictEqual(0xDDF8);
            expect(codePointAt(3)('🇺🇸')).toStrictEqual(0xDDF8);
        });

        it('returns undefined when no element at the specified position is available', () => {
            expect(codePointAt(1)('©')).toBeUndefined();
            expect(codePointAt(2)('🇺')).toBeUndefined();
            expect(codePointAt(2)('🇸')).toBeUndefined();
            expect(codePointAt(4)('🇺🇸')).toBeUndefined();
        });
    });
});

describe('concat', () => {
    describe('concat(strings)', () => {
        it('concatenates provided strings to the end', () => {
            expect(concat('!')('Hello')).toStrictEqual('Hello!');
            expect(concat(' ', 'World', '!')('Hello')).toStrictEqual('Hello World!');
            expect(concat(...[' ', 'World', '!'])('Hello')).toStrictEqual('Hello World!');
        });
    });
});

describe('endsWith', () => {
    describe('endsWith(search)', () => {
        it('returns true if the given value ends with the search substring', () => {
            expect(endsWith('World')('Hello World')).toStrictEqual(true);
        });

        it('returns false if the given value does not end with the search substring', () => {
            expect(endsWith('World')('Hello World!')).toStrictEqual(false);
        });
    });

    describe('endsWith(search, length)', () => {
        it('returns true if a substring of the value of given length ends with the search substring', () => {
            expect(endsWith('Hello', 5)('Hello World')).toStrictEqual(true);
        });

        it('returns false if a substring of the value of given length does not end with the search substring', () => {
            expect(endsWith('World', 5)('Hello World')).toStrictEqual(false);
        });
    });
});

describe('includes', () => {
    describe('includes(search)', () => {
        it('returns true if the given value includes the search substring', () => {
            expect(includes('W')('Hello World')).toStrictEqual(true);
            expect(includes('o W')('Hello World')).toStrictEqual(true);
        });

        it('returns false if the given value does not include the search substring', () => {
            expect(includes('!')('Hello World')).toStrictEqual(false);
            expect(includes('O W')('Hello World')).toStrictEqual(false);
        });
    });

    describe('includes(search, position)', () => {
        it('returns true if the given value starting from position includes the search substring', () => {
            expect(includes('W', 6)('Hello World')).toStrictEqual(true);
            expect(includes('W', -1)('Hello World')).toStrictEqual(true);
        });

        it('returns true if the given value starting from position does not include the search substring', () => {
            expect(includes('W', 7)('Hello World')).toStrictEqual(false);
            expect(includes('W', 11)('Hello World')).toStrictEqual(false);
        });
    });
});

describe('indexOf', () => {
    describe('indexOf(search)', () => {
        it('returns the index of the search substring in the given value when substring is present', () => {
            expect(indexOf('')('Hello World')).toStrictEqual(0);
            expect(indexOf('World')('Hello World')).toStrictEqual(6);
        });

        it('returns -1 when the search substring is not present in the given value', () => {
            expect(indexOf('Earth')('Hello World')).toStrictEqual(-1);
        });

        it('performs case-sensitive search', () => {
            expect(indexOf('world')('Hello World')).toStrictEqual(-1);
        });
    });

    describe('indexOf(search, from)', () => {
        it('returns the index of the search substring in the given value when substring is present', () => {
            expect(indexOf('', 6)('Hello World')).toStrictEqual(6);
            expect(indexOf('World', 6)('Hello World')).toStrictEqual(6);
            expect(indexOf('World', -5)('Hello World')).toStrictEqual(6);
        });

        it('returns the index of the search substring when the from index is negative', () => {
            expect(indexOf('Hello', -5)('Hello World')).toStrictEqual(0);
            expect(indexOf('World', -5)('Hello World')).toStrictEqual(6);
        });

        it('returns -1 when the search substring is not present in the given value', () => {
            expect(indexOf('Hello', 6)('Hello World')).toStrictEqual(-1);
            expect(indexOf('world', 6)('Hello World')).toStrictEqual(-1);
        });
    });
});

describe('lastIndexOf', () => {
    describe('lastIndexOf(search)', () => {
        it('returns the index of the last occurrence of the search value', () => {
            expect(lastIndexOf('One')('One, two, three. One.'))
                .toStrictEqual(17);
        });

        it('returns -1 when the search value is not found', () => {
            expect(lastIndexOf('Four')('One, two, three. One.'))
                .toStrictEqual(-1);
        });

        it('performs case-sensitive search', () => {
            expect(lastIndexOf('one')('One, two, three. One.'))
                .toStrictEqual(-1);
        });
    });

    describe('lastIndexOf(search, from)', () => {
        it('returns the index of the last occurrence for "from" index less than string length', () => {
            expect(lastIndexOf('two', 17)('One, two, three. One, two.'))
                .toStrictEqual(5);
        });

        it('returns the index of the last occurrence for "from" index above string length', () => {
            expect(lastIndexOf('two', 26)('One, two, three. One, two.'))
                .toStrictEqual(22);
        });

        it('returns 0 for "from" index less or equal 0 if the string starts with the "search"', () => {
            expect(lastIndexOf('One', 0)('One, two, three. One, two.'))
                .toStrictEqual(0);
            expect(lastIndexOf('One', -24)('One, two, three. One, two.'))
                .toStrictEqual(0);
        });

        it('returns -1 for "from" index less or equal 0 if the string does not start with the "search"', () => {
            expect(lastIndexOf('two', 0)('One, two, three. One, two.'))
                .toStrictEqual(-1);
            expect(lastIndexOf('two', -24)('One, two, three. One, two.'))
                .toStrictEqual(-1);
        });
    });
});

describe('lowerCase', () => {
    it('returns a string with all characters in lower case', () => {
        expect(lowerCase('Example String'))
            .toStrictEqual('example string');
    });
});

describe('normalize', () => {
    it('uses canonical equivalence normalization in composed form by default', () => {
        expect(normalize()('\u00F1'))
            .toStrictEqual(normalize()('\u006E\u0303'));
    });

    it('normalizes a unicode string with canonical equivalence normalization in composed form', () => {
        expect(normalize('NFC')('\u00F1'))
            .toHaveLength(1);
        expect(normalize('NFC')('\u006E\u0303'))
            .toHaveLength(1);
        expect(normalize('NFC')('\u00F1'))
            .toStrictEqual(normalize('NFC')('\u006E\u0303'));
    });

    it('normalizes a unicode string with canonical equivalence normalization in decomposed form', () => {
        expect(normalize('NFD')('\u00F1'))
            .toHaveLength(2);
        expect(normalize('NFD')('\u006E\u0303'))
            .toHaveLength(2);
        expect(normalize('NFD')('\u00F1'))
            .toStrictEqual(normalize('NFD')('\u006E\u0303'));
    });

    it('normalize a unicode string with compatibility-composed normalization', () => {
        expect(normalize('NFKC')('\u1E9B\u0323'))
            .toStrictEqual('\u1E69');
    });

    it('normalize a unicode string with compatibility-decomposed normalization', () => {
        expect(normalize('NFKD')('\u1E9B\u0323'))
            .toStrictEqual('\u0073\u0323\u0307');
    });
});

describe('padEnd', () => {
    describe('padEnd(length)', () => {
        it('makes a string of the target "length" by adding spaces to the end of the string', () => {
            expect(padEnd(15)('Hello, World!'))
                .toStrictEqual('Hello, World!  ');
        });

        it('returns the input string as is when the target "length" is shorter than a string', () => {
            expect(padEnd(10)('Hello, World!'))
                .toStrictEqual('Hello, World!');
        });
    });

    describe('padEnd(length, fill)', () => {
        it('makes a string of the target "length" by adding "fill" strings to the end of the string', () => {
            expect(padEnd(15, '?!')('Hello, World!'))
                .toStrictEqual('Hello, World!?!');
            expect(padEnd(16, '?!')('Hello, World!'))
                .toStrictEqual('Hello, World!?!?');
            expect(padEnd(17, '?!')('Hello, World!'))
                .toStrictEqual('Hello, World!?!?!');
        });
    });
});

describe('padStart', () => {
    describe('padStart(length)', () => {
        it('makes a string of the target "length" by adding spaces to the beginning of the string', () => {
            expect(padStart(15)('Hello, World!'))
                .toStrictEqual('  Hello, World!');
        });

        it('returns the input string as is when the target "length" is shorter than a string', () => {
            expect(padStart(10)('Hello, World!'))
                .toStrictEqual('Hello, World!');
        });
    });

    describe('padStart(length, fill)', () => {
        it('makes a string of the target "length" by adding "fill" strings to the beginning of the string', () => {
            expect(padStart(15, '* ')('Hello, World!'))
                .toStrictEqual('* Hello, World!');
            expect(padStart(16, '* ')('Hello, World!'))
                .toStrictEqual('* *Hello, World!');
            expect(padStart(17, '* ')('Hello, World!'))
                .toStrictEqual('* * Hello, World!');
        });
    });
});

describe('repeat', () => {
    describe('repeat(count)', () => {
        it('repeats the input string the given "count" of times', () => {
            expect(repeat(3)('A'))
                .toStrictEqual('AAA');
            expect(repeat(2)('Abc'))
                .toStrictEqual('AbcAbc');
            expect(repeat(1)('Abc'))
                .toStrictEqual('Abc');
        });

        it('returns an empty string when "count" is 0', () => {
            expect(repeat(0)('A'))
                .toStrictEqual('');
        });

        it('throws an error if "count" is negative', () => {
            expect(() => repeat(-1)('A'))
                .toThrow(RangeError);
        });
    });
});

describe('replace', () => {
    it('replaces the first occurrence of a given substring', () => {
        expect(replace('One', 'Uno')('One, two, three. One, two.'))
            .toStrictEqual('Uno, two, three. One, two.');
    });

    it('replaces the first occurrence of a given RegExp without a global flag', () => {
        expect(replace(/One/u, 'Uno')('One, two, three. One, two.'))
            .toStrictEqual('Uno, two, three. One, two.');
    });

    it('replaces all occurrences of a given RegExp with a global flag', () => {
        expect(replace(/One/gu, 'Uno')('One, two, three. One, two.'))
            .toStrictEqual('Uno, two, three. Uno, two.');
    });
});

describe('replaceWith', () => {
    it('replaces the first occurrence of a given substring', () => {
        expect(replaceWith('One', match => match.toLowerCase())('One, two, three. One, two.'))
            .toStrictEqual('one, two, three. One, two.');
    });

    it('replaces the first occurrence of a given RegExp without a global flag', () => {
        expect(replaceWith(/(\w{3}), (\w{3})/u, match => match.toLowerCase())('One, two, three. One, two.'))
            .toStrictEqual('one, two, three. One, two.');
    });

    it('replaces the first occurrence of a given RegExp with a global flag', () => {
        expect(replaceWith(/(\w{3}), (\w{3})/gu, match => match.toLowerCase())('One, two, three. One, two.'))
            .toStrictEqual('one, two, three. one, two.');
    });
});

describe('search', () => {
    it('returns an index of the first match between the regular expression and the given string', () => {
        expect(search(/\w{5}/u)('One, two, three. Six, seven, eight.'))
            .toStrictEqual(10);
    });

    it('returns -1 when no match is found', () => {
        expect(search(/\w{6}/u)('One, two, three. Six, seven, eight.'))
            .toStrictEqual(-1);
    });
});

describe('slice', () => {
    describe('slice(start)', () => {
        it('returns a substring of the given string from the positive "start" index', () => {
            expect(slice(7)('Hello, World'))
                .toStrictEqual('World');
        });

        it('returns a substring of the given string from the negative "start" index', () => {
            expect(slice(-5)('Hello, World'))
                .toStrictEqual('World');
        });
    });

    describe('slice(start, end)', () => {
        it('returns a substring of the given string from the positive "start" and "end" indexes', () => {
            expect(slice(17, 20)('One, two, three. One, two.'))
                .toStrictEqual('One');
        });

        it('returns a substring of the given string from the negative "start" and "end" indexes', () => {
            expect(slice(-9, -6)('One, two, three. One, two.'))
                .toStrictEqual('One');
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

describe('startsWith', () => {
    describe('startsWith(search)', () => {
        it('returns true if the string starts with the given "search"', () => {
            expect(startsWith('Hello')('Hello, World'))
                .toStrictEqual(true);
        });

        it('returns false if the string does not start with the given "search"', () => {
            expect(startsWith('World')('Hello, World'))
                .toStrictEqual(false);
        });

        it('is case sensitive', () => {
            expect(startsWith('hello')('Hello, World'))
                .toStrictEqual(false);
        });
    });

    describe('startsWith(search, from)', () => {
        it('returns true if the string starts with the given "search" in the "from" index', () => {
            expect(startsWith('World', 7)('Hello, World'))
                .toStrictEqual(true);
        });

        it('returns false if the string does not start with the given "search" in the "from" index', () => {
            expect(startsWith('Hello', 7)('Hello, World'))
                .toStrictEqual(false);
        });
    });
});

describe('trim', () => {
    it('removes the leading and trailing white spaces, line terminators from a string', () => {
        expect(trim(' \tabc\u00A0\n'))
            .toStrictEqual('abc');
    });
});

describe('upperCase', () => {
    it('returns a string with all characters in upper case', () => {
        expect(upperCase('Example String'))
            .toStrictEqual('EXAMPLE STRING');
    });
});
