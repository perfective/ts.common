import { lines } from './array';

describe('lines', () => {
    it('splits string into array of string by line break characters', () => {
        expect(lines('Lorem\r\nipsum\ndolor\tsit\n\ramet'))
            .toStrictEqual([
                'Lorem',
                'ipsum',
                'dolor\tsit',
                'amet',
            ]);
    });
});
