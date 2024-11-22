export const unique = <T>(values: T[], key = (v: T): T | number | string => v) =>
    Array.from(new Map(values.map((value) => [key(value), value])).values());
