import { describe, expect, it } from "@jest/globals";

import { formatDate } from "@/utils/formatDate";

describe("formatDate", () => {
    it("should return a string", () => {
        const value = formatDate(new Date(), "yyyy-MM-dd");
        expect(value).toEqual(expect.any(String));
    });
    it("should return a string with the value `2021-01-01`", () => {
        const date = new Date("2021-01-01 00:00:00.000");
        const value = formatDate(date, "yyyy-MM-dd");
        expect(value).toBe("2021-01-01");
    });
    it("should return a string with the value `2021-01-01 00:00:00`", () => {
        const date = new Date("2021-01-01 00:00:00.000");
        const value = formatDate(date, "yyyy-MM-dd HH:mm:ss");
        expect(value).toBe("2021-01-01 00:00:00");
    });
    it("should return a string with the value `2021-01-01 00:00:00.000`", () => {
        const date = new Date("2021-01-01 00:00:00.000");
        const value = formatDate(date, "yyyy-MM-dd HH:mm:ss.SSS");
        expect(value).toBe("2021-01-01 00:00:00.000");
    });
});
