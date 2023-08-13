import { epoch } from './date';
import { timestamp } from './timestamp';

describe(timestamp, () => {
    describe('when given a valid Date', () => {
        it('returns a Timestamp for the given Date', () => {
            expect(timestamp(epoch())).toBe(0);
        });
    });

    describe('when given an invalid Date', () => {
        it('returns null', () => {
            expect(timestamp(new Date('xyz'))).toBeNull();
        });
    });
});
