import { describe, expect, it } from "@jest/globals";

import { normalizeByKey } from "@/utils/normalizeByKey";

const testUser1 = {
    id: 1,
    name: "test-user-1",
    contacts: {
        email: "user1@example.com",
        telephoneNumber: "XXX-XXXX-0001"
    },
    hobbies: ["Golf", "Football", "Tennis"],
    createdAt: new Date("2022-12-17T03:24:00"),
    active: true
};
const testUser2 = {
    id: 2,
    name: "test-user-2",
    contacts: {
        email: "user2@example.com",
        telephoneNumber: "XXX-XXXX-0002"
    },
    hobbies: ["Basketball", "Dodge ball"],
    createdAt: new Date("2022-12-17T03:24:00"),
    active: false
};
const testUser3 = {
    id: 3,
    name: "test-user-3",
    contacts: {
        email: "user3@example.com",
        telephoneNumber: "XXX-XXXX-0003"
    },
    hobbies: ["Golf", "Baseball"],
    createdAt: new Date("2022-12-17T03:24:00"),
    active: true
};
const collection = [testUser1, testUser2, testUser3];

describe("normalizeByKey", () => {
    it("should return a object", () => {
        expect(normalizeByKey([], "")).toStrictEqual({});
    });
    it("should return the value normalized by the number value", () => {
        expect(normalizeByKey(collection, "id")).toStrictEqual({
            "1": testUser1,
            "2": testUser2,
            "3": testUser3
        });
    });
    it("should return the value normalized by the string value", () => {
        expect(normalizeByKey(collection, "name")).toStrictEqual({
            "test-user-1": testUser1,
            "test-user-2": testUser2,
            "test-user-3": testUser3
        });
    });
    it("should return the value normalized by the boolean value", () => {
        expect(normalizeByKey(collection, "active")).toStrictEqual({
            false: testUser2,
            true: testUser3
        });
    });
});
