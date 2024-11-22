export type Result<A, B> = Failed<B> | Succeeded<A>;

export type ExtractSucceeded<A extends Result<unknown, unknown>> = Extract<A, { type: "succeeded" }>;
export type ExtractFailed<A extends Result<unknown, unknown>> = Extract<A, { type: "failed" }>;

export type Succeeded<A> = {
    type: "succeeded";
    data: A;
};

export type Failed<A> = {
    type: "failed";
    data: A;
};

export const succeed = <A>(a: A): Succeeded<A> => ({
    type: <const>"succeeded",
    data: a
});

export const fail = <A>(a: A): Failed<A> => ({
    type: <const>"failed",
    data: a
});
