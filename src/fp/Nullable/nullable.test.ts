import { Nullable } from "./nullable";

describe('Nullable type', () => {
    it('should handle undefined', () => {
        const result: Nullable<unknown> = undefined;

        expect(result).toBe(undefined);
    });

    it('should handle null', () => {
        const result: Nullable<unknown> = null;

        expect(result).toBe(null);
    });

    it('should handle every type', () => {
        const nullableString: Nullable<string> = 'toto';
        const nullableNumber: Nullable<number> = 42;
        
        expect(nullableString).toBe('toto');
        expect(nullableNumber).toBe(42);
    });
});