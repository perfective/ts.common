import { exceptionToken } from './exception-tokens';

describe('exceptionToken', () => {
    it('creates a regular expression to find a token by key', () => {
        const token: RegExp = exceptionToken('id');

        expect(token).toStrictEqual(/\{\{id\}\}/gu);
        expect(token.test('User ID {{id}}')).toStrictEqual(true);
    });

    it('creates a regular expression to find a token when key has a dash', () => {
        const token: RegExp = exceptionToken('user-id');

        expect(token).toStrictEqual(/\{\{user-id\}\}/gu);
        expect(token.test('User ID {{user-id}}')).toStrictEqual(true);
    });

    it('creates a regular expression to find a token when key has an underscore', () => {
        const token: RegExp = exceptionToken('user_id');

        expect(token).toStrictEqual(/\{\{user_id\}\}/gu);
        expect(token.test('User ID {{user_id}}')).toStrictEqual(true);
    });

    it('create a regular expression to find a token when key has a $ symbol', () => {
        const token: RegExp = exceptionToken('id$');

        expect(token).toStrictEqual(/\{\{id\$\}\}/gu);
        expect(token.test('User ID {{id$}}')).toStrictEqual(true);
    });
});
