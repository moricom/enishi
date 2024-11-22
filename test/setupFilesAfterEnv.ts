import { expect } from "@jest/globals";

expect.extend({
    toBeGreaterThanString(received: string, argument: string) {
        const pass = received > argument;
        if (pass) {
            return {
                message: () => `expected ${received} not to be greater than ${argument}`,
                pass: true
            };
        } else {
            return {
                message: () => `expected ${received} to be greater than ${argument}`,
                pass: false
            };
        }
    },

    toBeLessThanString(received: string, argument: string) {
        const pass = received < argument;
        if (pass) {
            return {
                message: () => `expected ${received} not to be less than ${argument}`,
                pass: true
            };
        } else {
            return {
                message: () => `expected ${received} to be less than ${argument}`,
                pass: false
            };
        }
    }
});

export {};
