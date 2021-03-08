import { evalError, isEvalError, isNotEvalError } from './eval-error';

describe('evalError', () => {
    it('creates a new EvalError with a message', () => {
        expect(evalError('Exception'))
            .toStrictEqual(new EvalError('Exception'));
    });
});

describe('isEvalError', () => {
    it('returns true when value is an EvalError', () => {
        expect(isEvalError(new EvalError('Error')))
            .toBe(true);
    });

    it('returns false when value is not an EvalError', () => {
        expect(isEvalError('EvalError'))
            .toBe(false);
    });
});

describe('isNotEvalError', () => {
    it('returns false when value is an EvalError', () => {
        expect(isNotEvalError(new EvalError('Error')))
            .toBe(false);
    });

    it('returns true when value is not an EvalError', () => {
        expect(isNotEvalError('EvalError'))
            .toBe(true);
    });
});
