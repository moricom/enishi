export const isNotNull = <T>(t: T): t is Exclude<T, null> => t !== null;
