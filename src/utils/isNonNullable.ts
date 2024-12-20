export const isNonNullable = <T>(t: T): t is NonNullable<T> => t !== null && t !== undefined;
