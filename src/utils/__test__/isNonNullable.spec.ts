import { describe, expect, it } from "@jest/globals";

import { isNonNullable } from "@/utils/isNonNullable";

describe("isNonNullable", () => {
    it("should return false if null", () => {
        expect(isNonNullable(null)).toBe(false);
    });

    it("should return false if undefined", () => {
        expect(isNonNullable(undefined)).toBe(false);
    });

    it("should return true otherwise", () => {
        expect(isNonNullable(0)).toBe(true);
        expect(isNonNullable(1)).toBe(true);
        expect(isNonNullable("")).toBe(true);
        expect(isNonNullable("string")).toBe(true);
        expect(isNonNullable(true)).toBe(true);
        expect(isNonNullable(false)).toBe(true);
        expect(isNonNullable({})).toBe(true);
        expect(isNonNullable([])).toBe(true);
    });
});
