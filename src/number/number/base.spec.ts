import { describe, expect, it } from '@jest/globals';

import { binary, decimal, hexadecimal, octal } from './base';

describe(decimal, () => {
    describe('decimal(number)', () => {
        it('converts a number into a decimal representation', () => {
            expect(decimal(0))
                .toBe('0');
            expect(decimal(-1))
                .toBe('-1');
            expect(decimal(3.14))
                .toBe('3.14');
        });
    });

    describe('decimal(string)', () => {
        it('parses a sequence of digits, "-", and "." into a real number', () => {
            expect(decimal('1234567890'))
                .toBe(1_234_567_890);
            expect(decimal('-123450.6789'))
                .toBe(-123_450.6789);
        });

        it('parses a string until the first character that is not a digit, ".", or "-"', () => {
            expect(decimal('1,024'))
                .toBe(1);
            expect(decimal('1024.2048'))
                .toBe(1024.2048);
            expect(decimal('1024.20,48'))
                .toBe(1024.20);
            expect(decimal('.10,24'))
                .toBe(0.10);
            expect(decimal('-.20,48'))
                .toBe(-0.2);
        });

        describe('when a string does not start with a digit', () => {
            it('returns null', () => {
                expect(decimal('example'))
                    .toBeNull();
                expect(decimal('.example'))
                    .toBeNull();
                expect(decimal('-example'))
                    .toBeNull();
            });
        });
    });
});

describe(binary, () => {
    describe('binary(number)', () => {
        it('converts an integer into its binary representation', () => {
            expect(binary(0b10))
                .toBe('10');
            expect(binary(2))
                .toBe('10');
            expect(binary(-3))
                .toBe('-11');
        });
    });

    describe('binary(string)', () => {
        it('converts an integer part of a real number into its binary representation', () => {
            expect(binary(2.71))
                .toStrictEqual(binary(2));
            expect(binary(3.14))
                .toStrictEqual(binary(3));
        });

        it('parses a sequence of characters "0", "1", or "-" into an integer', () => {
            expect(binary('10'))
                .toBe(2);
            expect(binary('100'))
                .toBe(4);
        });

        it('parses a string until the first character that is not "0", "1", or "-"', () => {
            expect(binary('01.10'))
                .toBe(1);
            expect(binary('10b01'))
                .toBe(2);
            expect(binary('-11b01'))
                .toBe(-3);
        });

        describe('when given a string that does not start with characters "0" or "1"', () => {
            it('returns null', () => {
                expect(binary('example'))
                    .toBeNull();
            });
        });
    });
});

describe(octal, () => {
    describe('octal(number)', () => {
        it('converts an integer into its octal representation', () => {
            expect(octal(0o10))
                .toBe('10');
            expect(octal(8))
                .toBe('10');
            expect(octal(-16))
                .toBe('-20');
        });
    });

    describe('octal(string)', () => {
        it('converts an integer part of a real number into its octal representation', () => {
            expect(octal(2.71))
                .toStrictEqual(octal(2));
            expect(octal(3.14))
                .toStrictEqual(octal(3));
        });

        it('parses a sequence of characters from "0" to "7" or "-" into an integer', () => {
            expect(octal('10'))
                .toBe(8);
            expect(octal('-20'))
                .toBe(-16);
        });

        it('parses a string until the first character that is not from "0" to "7", or "-"', () => {
            expect(octal('79.10'))
                .toBe(7);
            expect(octal('-0109'))
                .toBe(-8);
        });

        describe('when given a string that does not start with characters from "0" to "7"', () => {
            it('returns null', () => {
                expect(octal('example'))
                    .toBeNull();
            });
        });
    });
});

describe(hexadecimal, () => {
    describe('hexadecimal(number)', () => {
        it('converts an integer into its hexadecimal representation', () => {
            expect(hexadecimal(0xF))
                .toBe('f');
            expect(hexadecimal(16))
                .toBe('10');
            expect(hexadecimal(-31))
                .toBe('-1f');
        });
    });

    describe('hexadecimal(string)', () => {
        it('converts an integer part of a real number into its hexadecimal representation', () => {
            expect(hexadecimal(2.71))
                .toStrictEqual(hexadecimal(2));
            expect(hexadecimal(3.14))
                .toStrictEqual(hexadecimal(3));
        });

        it('parses a sequence of characters from "0" to "f" or "-" into an integer', () => {
            expect(hexadecimal('10'))
                .toBe(16);
            expect(hexadecimal('-ff'))
                .toBe(-255);
        });

        it('parses a string until the first character that is not from "0" to "f", or "-"', () => {
            expect(hexadecimal('7g.10'))
                .toBe(7);
            expect(hexadecimal('-0f0.9'))
                .toBe(-240);
            expect(hexadecimal('example'))
                .toBe(14);
        });

        describe('when given a string that does not start with characters from "0" to "f"', () => {
            it('fails to parse', () => {
                expect(hexadecimal('sample'))
                    .toBeNull();
            });
        });
    });
});
