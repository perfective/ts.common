import { describe, expect, it } from '@jest/globals';

import { lines } from './array';

describe(lines, () => {
    describe('when a given string contains Windows line separators (\\r\\n)', () => {
        it('splits the string into an array of strings', () => {
            expect(lines('Lorem\r\nipsum\r\ndolor\r\nsit\r\namet')).toStrictEqual([
                'Lorem',
                'ipsum',
                'dolor',
                'sit',
                'amet',
            ]);
        });
    });

    describe('when a given string contains Unix line separators (\\n)', () => {
        it('splits the string into an array of strings', () => {
            expect(lines('Lorem\nipsum\ndolor\nsit\namet')).toStrictEqual([
                'Lorem',
                'ipsum',
                'dolor',
                'sit',
                'amet',
            ]);
        });
    });

    describe('when a given string contains MacOS separators (\\r)', () => {
        it('splits the string into an array of strings', () => {
            expect(lines('Lorem\ripsum\rdolor\rsit\ramet')).toStrictEqual([
                'Lorem',
                'ipsum',
                'dolor',
                'sit',
                'amet',
            ]);
        });
    });

    describe('when string contains mixed separators', () => {
        it('splits string into array of string by line break characters', () => {
            expect(lines('Lorem\r\nipsum\ndolor\n\rsit\ramet'))
                .toStrictEqual([
                    'Lorem',
                    'ipsum',
                    'dolor',
                    '',
                    'sit',
                    'amet',
                ]);
        });
    });
});
