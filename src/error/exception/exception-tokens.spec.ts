import { describe, expect, it } from '@jest/globals';

import { exceptionToken } from './exception-tokens';

describe(exceptionToken, () => {
    describe('when a given token contains only alphabet characters', () => {
        it('creates a regular expression to find the token', () => {
            const token: RegExp = exceptionToken('id');

            expect(token).toStrictEqual(/\{\{id\}\}/gu);
            expect(token.test('User ID {{id}}')).toBe(true);
        });
    });

    describe('when a given token contains alphanumeric characters', () => {
        it('creates a regular expression to find the token', () => {
            const token: RegExp = exceptionToken('id0');

            expect(token).toStrictEqual(/\{\{id0\}\}/gu);
            expect(token.test('User ID {{id0}}')).toBe(true);
        });
    });

    describe('when a given token contains a dash', () => {
        it('creates a regular expression to find the token', () => {
            const token: RegExp = exceptionToken('user-id');

            expect(token).toStrictEqual(/\{\{user-id\}\}/gu);
            expect(token.test('User ID {{user-id}}')).toBe(true);
        });
    });

    describe('when a given token contains an underscore', () => {
        it('creates a regular expression to find the token', () => {
            const token: RegExp = exceptionToken('user_id');

            expect(token).toStrictEqual(/\{\{user_id\}\}/gu);
            expect(token.test('User ID {{user_id}}')).toBe(true);
        });
    });

    describe('when a given token contains a $ symbol', () => {
        it('creates a regular expression to find the token', () => {
            const token: RegExp = exceptionToken('id$');

            expect(token).toStrictEqual(/\{\{id\$\}\}/gu);
            expect(token.test('User ID {{id$}}')).toBe(true);
        });
    });

    describe('when a given token contains a # symbol', () => {
        it('creates a regular expression to find the token', () => {
            const token: RegExp = exceptionToken('id#');

            expect(token).toStrictEqual(/\{\{id#\}\}/gu);
            expect(token.test('User ID {{id#}}')).toBe(true);
        });
    });
});
