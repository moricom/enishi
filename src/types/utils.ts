export type Prefix<Type, P extends string> = { [K in keyof Type as `${P}${K & string}`]: Type[K] };
export type Writable<T> = { -readonly [P in keyof T]: T[P] };

/* eslint-disable @typescript-eslint/no-explicit-any */
type UnionKeys<T> = T extends any ? keyof T : never;
export type DistributiveOmit<T, K extends UnionKeys<T>> = T extends any ? Omit<T, Extract<keyof T, K>> : never;

type DeepReadonlyArray<T> = readonly DeepReadonly<T>[];

type DeepReadonlyObject<T> = {
    readonly [P in keyof T]: DeepReadonly<T[P]>;
};

export type DeepReadonly<T> = T extends (infer R)[]
    ? DeepReadonlyArray<R>
    : T extends Function // eslint-disable-line @typescript-eslint/ban-types
      ? T
      : T extends object
        ? DeepReadonlyObject<T>
        : T;

export type PromisableFunction<T extends (...args: any[]) => any> = T extends (...args: infer A) => infer R
    ? ((...args: A) => Promise<R>) | ((...args: A) => R)
    : never;
