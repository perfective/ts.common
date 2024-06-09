import { describe, expect, it } from '@jest/globals';

import { tokenKey, Tokens, tokens } from './tokens';

describe(tokens, () => {
    describe('tokens(string[])', () => {
        it('creates a Tokens record using array indices', () => {
            expect(tokens(['first', 'second', 'third']))
                .toStrictEqual({
                    0: 'first',
                    1: 'second',
                    2: 'third',
                } as Tokens);
        });
    });

    describe('tokens(Tokens)', () => {
        it('returns original Tokens record', () => {
            const input: Tokens = {
                first: '1st',
                second: '2nd',
                third: '3rd',
            };

            expect(tokens(input)).toBe(input);
        });
    });
});

describe(tokenKey, () => {
    it('creates a regular expression to find a token', () => {
        const value: RegExp = tokenKey('id');

        expect(value).toStrictEqual(/\{\{id\}\}/gu);
        expect(value.test('User ID {{id}}')).toBe(true);
    });

    describe('when key has a dash', () => {
        it('creates a regular expression to find a token', () => {
            const value: RegExp = tokenKey('user-id');

            expect(value).toStrictEqual(/\{\{user-id\}\}/gu);
            expect(value.test('User ID {{user-id}}')).toBe(true);
        });
    });

    describe('when key has an underscore', () => {
        it('creates a regular expression to find a token', () => {
            const value: RegExp = tokenKey('user_id');

            expect(value).toStrictEqual(/\{\{user_id\}\}/gu);
            expect(value.test('User ID {{user_id}}')).toBe(true);
        });
    });

    describe('when key has a $ symbol', () => {
        it('create a regular expression to find a token', () => {
            const value: RegExp = tokenKey('id$');

            expect(value).toStrictEqual(/\{\{id\$\}\}/gu);
            expect(value.test('User ID {{id$}}')).toBe(true);
        });
    });
});
