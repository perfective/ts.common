import { Format, format, formatted } from './format';
import { Tokens } from './tokens';

describe('format', () => {
    describe('format(string)', () => {
        it('creates a Format record without tokens', () => {
            expect(format('Output string'))
                .toStrictEqual({
                    template: 'Output string',
                    tokens: {},
                } as Format);
        });
    });

    describe('format(string, string[])', () => {
        it('creates a Format record with named tokens converted from positional tokens', () => {
            expect(format('Absent values are {{0}} and {{1}}', [undefined, null]))
                .toStrictEqual({
                    template: 'Absent values are {{0}} and {{1}}',
                    tokens: {
                        0: 'undefined',
                        1: 'null',
                    },
                } as Format);
        });
    });

    describe('format(string, Tokens)', () => {
        it('creates a Format record with the given Tokens', () => {
            const tokens: Tokens = {
                first: '1st',
                second: '2n',
            };

            expect(format('Output values: {{first}}, {{second}}', tokens))
                .toStrictEqual({
                    template: 'Output values: {{first}}, {{second}}',
                    tokens,
                } as Format);
        });
    });
});

describe('formatted', () => {
    it('replaces named tokens in the string', () => {
        expect(formatted({
            template: 'Formatted values: {{first}}, {{second}}, {{third}}',
            tokens: {
                first: '1st',
                second: '2nd',
                third: 'and 3rd',
            },
        })).toBe('Formatted values: 1st, 2nd, and 3rd');
    });

    it('skips tokens that are not defined', () => {
        expect(formatted({
            template: 'Formatted values: {{first}}, {{second}}, {{third}}, and {{fourth}}',
            tokens: {
                first: '1st',
                second: '2nd',
                third: 'and 3rd',
            },
        })).toBe('Formatted values: 1st, 2nd, and 3rd, and {{fourth}}');
        expect(formatted({
            template: 'Formatted values: {{first}}, {{second}}',
            tokens: {
                first: '1st',
                second: '2nd',
                third: 'and 3rd',
            },
        })).toBe('Formatted values: 1st, 2nd');
    });
});
