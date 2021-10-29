import { needToMigrate } from "./migration";

describe('migration needed', () => {

    test('need to migrate empty', () => {
        expect(needToMigrate('')).toEqual(true);
    });
    test('need to migrate empty', () => {
        expect(needToMigrate(null)).toEqual(true);
    });
    test('need to migrate item listed', () => {
        expect(needToMigrate('2.0.3')).toEqual(true);
    });
    test('need to migrate version not listed', () => {
        expect(needToMigrate('1.0.0')).toEqual(false);
    });

});

