export const normalizeByKey = <T>(collection: T[], iteratee: keyof T): Record<string, T> =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    collection.reduce((prev, current) => ({ ...prev, [<any>current[iteratee]]: current }), {});
