import { describe, expect, it } from '@jest/globals';

import { evalError, isEvalError, isNotEvalError } from './eval-error';

describe(evalError, () => {
    it('creates an EvalError with a given message', () => {
        // eslint-disable-next-line jest/no-error-equal -- testing error constructor
        expect(evalError('Exception'))
            .toStrictEqual(new EvalError('Exception'));
    });
});

describe(isEvalError, () => {
    describe('when a given value is an EvalError', () => {
        it('returns true', () => {
            expect(isEvalError(new EvalError('Error')))
                .toBe(true);
        });
    });

    describe('when a given value is not an EvalError', () => {
        it('returns false', () => {
            expect(isEvalError('EvalError'))
                .toBe(false);
        });
    });
});

describe(isNotEvalError, () => {
    describe('when a given value is not an EvalError', () => {
        it('returns true', () => {
            expect(isNotEvalError('EvalError'))
                .toBe(true);
        });
    });

    describe('when a given value is an EvalError', () => {
        it('returns false', () => {
            expect(isNotEvalError(new EvalError('Error')))
                .toBe(false);
        });
    });
});
