import { binary, decimal, hexadecimal, octal } from './base';

describe('decimal', () => {
    it('converts a number into a decimal representation', () => {
        expect(decimal(0))
            .toStrictEqual('0');
        expect(decimal(-1))
            .toStrictEqual('-1');
        expect(decimal(3.14))
            .toStrictEqual('3.14');
    });

    it('parses a sequence of digits, "-", and "." into a real number', () => {
        expect(decimal('1234567890'))
            .toStrictEqual(1_234_567_890);
        expect(decimal('-123450.6789'))
            .toStrictEqual(-123_450.6789);
    });

    it('parses a string until the first character that is not a digit, ".", or "-"', () => {
        expect(decimal('1,024'))
            .toStrictEqual(1);
        expect(decimal('1024.2048'))
            .toStrictEqual(1024.2048);
        expect(decimal('1024.20,48'))
            .toStrictEqual(1024.20);
        expect(decimal('.10,24'))
            .toStrictEqual(0.10);
        expect(decimal('-.20,48'))
            .toStrictEqual(-0.2);
    });

    it('fails to parse a string that does not start with a digit', () => {
        expect(decimal('example'))
            .toStrictEqual(Number.NaN);
        expect(decimal('.example'))
            .toStrictEqual(Number.NaN);
        expect(decimal('-example'))
            .toStrictEqual(Number.NaN);
    });
});

describe('binary', () => {
    it('converts an integer into its binary representation', () => {
        expect(binary(0b10))
            .toStrictEqual('10');
        expect(binary(2))
            .toStrictEqual('10');
        expect(binary(-3))
            .toStrictEqual('-11');
    });

    it('converts an integer part of a real number into its binary representation', () => {
        expect(binary(2.71))
            .toStrictEqual(binary(2));
        expect(binary(3.14))
            .toStrictEqual(binary(3));
    });

    it('parses a sequence of characters "0", "1", or "-" into an integer', () => {
        expect(binary('10'))
            .toStrictEqual(2);
        expect(binary('100'))
            .toStrictEqual(4);
    });

    it('parses a string until the first character that is not "0", "1", or "-"', () => {
        expect(binary('01.10'))
            .toStrictEqual(1);
        expect(binary('10b01'))
            .toStrictEqual(2);
        expect(binary('-11b01'))
            .toStrictEqual(-3);
    });

    it('fails to parse a string that does not start with characters "0" or "1"', () => {
        expect(binary('example'))
            .toStrictEqual(Number.NaN);
    });
});

describe('octal', () => {
    it('converts an integer into its octal representation', () => {
        expect(octal(0o10))
            .toStrictEqual('10');
        expect(octal(8))
            .toStrictEqual('10');
        expect(octal(-16))
            .toStrictEqual('-20');
    });

    it('converts an integer part of a real number into its octal representation', () => {
        expect(octal(2.71))
            .toStrictEqual(octal(2));
        expect(octal(3.14))
            .toStrictEqual(octal(3));
    });

    it('parses a sequence of characters from "0" to "7" or "-" into an integer', () => {
        expect(octal('10'))
            .toStrictEqual(8);
        expect(octal('-20'))
            .toStrictEqual(-16);
    });

    it('parses a string until the first character that is not from "0" to "7", or "-"', () => {
        expect(octal('79.10'))
            .toStrictEqual(7);
        expect(octal('-0109'))
            .toStrictEqual(-8);
    });

    it('fails to parse a string that does not start with characters from "0" to "7"', () => {
        expect(octal('example'))
            .toStrictEqual(Number.NaN);
    });
});

describe('hexadecimal', () => {
    it('converts an integer into its hexadecimal representation', () => {
        expect(hexadecimal(0xF))
            .toStrictEqual('f');
        expect(hexadecimal(16))
            .toStrictEqual('10');
        expect(hexadecimal(-31))
            .toStrictEqual('-1f');
    });

    it('converts an integer part of a real number into its hexadecimal representation', () => {
        expect(hexadecimal(2.71))
            .toStrictEqual(hexadecimal(2));
        expect(hexadecimal(3.14))
            .toStrictEqual(hexadecimal(3));
    });

    it('parses a sequence of characters from "0" to "f" or "-" into an integer', () => {
        expect(hexadecimal('10'))
            .toStrictEqual(16);
        expect(hexadecimal('-ff'))
            .toStrictEqual(-255);
    });

    it('parses a string until the first character that is not from "0" to "f", or "-"', () => {
        expect(hexadecimal('7g.10'))
            .toStrictEqual(7);
        expect(hexadecimal('-0f0.9'))
            .toStrictEqual(-240);
        expect(hexadecimal('example'))
            .toStrictEqual(14);
    });

    it('fails to parse a string that does not start with characters from "0" to "f"', () => {
        expect(hexadecimal('sample'))
            .toStrictEqual(Number.NaN);
    });
});
