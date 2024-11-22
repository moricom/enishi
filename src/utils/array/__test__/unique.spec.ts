import { describe, expect, it } from "@jest/globals";

import { unique } from "@/utils/array/unique";

describe("unique", () => {
    it("should return a array", () => {
        expect(unique([])).toStrictEqual(expect.any(Array));
    });
    it("should returns a unique array of number type", () => {
        expect(unique([1, 2, 2, 3, 1, 2, 4, 3, 0])).toStrictEqual([1, 2, 3, 4, 0]);
    });
    it("should returns a unique array of string type", () => {
        expect(unique(["a", "b", "a", "c", "a", "d", "b", "c", "c"])).toStrictEqual(["a", "b", "c", "d"]);
    });
    it("should returns a unique array of multiple type", () => {
        const date = new Date();
        const obj = {
            a: 1,
            b: 2
        };
        expect(unique([0, "a", 1, null, 1, "a", null, -1, -1, date, "a", date, obj, 1, obj, undefined])).toStrictEqual([
            0,
            "a",
            1,
            null,
            -1,
            date,
            obj,
            undefined
        ]);
    });
    it("should returns a unique array of multiple type", () => {
        const date = new Date();
        const obj = {
            a: 1,
            b: 2
        };
        expect(unique([0, "a", 1, null, 1, "a", null, -1, -1, date, "a", date, obj, 1, obj, undefined])).toStrictEqual([
            0,
            "a",
            1,
            null,
            -1,
            date,
            obj,
            undefined
        ]);
    });

    it("should returns a unique array of object type, and the object is compared by the specified key", () => {
        const obj1 = {
            id: "1",
            data: "1"
        };
        const obj2 = {
            id: "2",
            data: "2"
        };
        const obj3 = {
            id: "3",
            data: "3"
        };
        const obj4 = {
            id: "4",
            data: "4"
        };
        expect(unique([obj4, obj3, obj1, obj2, obj2, obj4], (v) => v.id)).toStrictEqual(expect.arrayContaining([obj4, obj3, obj1, obj2]));
        expect(unique([obj4, obj3, obj1, obj2, obj2, obj4], (v) => v.data)).toStrictEqual(expect.arrayContaining([obj4, obj3, obj1, obj2]));
    });
});
