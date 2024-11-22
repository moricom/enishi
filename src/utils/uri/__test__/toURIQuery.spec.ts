import { describe, expect, it } from "@jest/globals";

import { toURIQuery } from "@/utils/uri/toURIQuery";

describe("toURIQuery", () => {
    it("take an object and returns a query string", () => {
        const queryString = toURIQuery({
            "number1": 100,
            "string1": "test-string",
            "number2": 200,
            "string2": "test-string2",
            "unreserved_characters-_.~": "-_.~"
        });

        expect(queryString).toEqual("?number1=100&string1=test-string&number2=200&string2=test-string2&unreserved_characters-_.~=-_.~");
    });

    it("handle strings by URI encoding them", () => {
        const result = toURIQuery({ "containing space": "a string", "日本語": "漢あアｱ　 " });

        expect(result).toEqual(
            "?containing%20space=a%20string&%E6%97%A5%E6%9C%AC%E8%AA%9E=%E6%BC%A2%E3%81%82%E3%82%A2%EF%BD%B1%E3%80%80%20"
        );
    });

    it("handle reserved character by URI encoding them", () => {
        const result = toURIQuery({ "#$&*+,/:;=?@[]": "#$&*+,/:;=?@[]" });

        expect(result).toEqual("?%23%24%26*%2B%2C%2F%3A%3B%3D%3F%40%5B%5D=%23%24%26*%2B%2C%2F%3A%3B%3D%3F%40%5B%5D");
    });

    it("returns an empty string if empty object is passed in", () => {
        const queryString = toURIQuery({});

        expect(queryString).toEqual("");
    });
});
