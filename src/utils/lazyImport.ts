import { lazy } from "react";

// Named imports for React.lazy: https://github.com/facebook/react/issues/14603#issuecomment-726551598
/* eslint-disable @typescript-eslint/no-explicit-any */
export const lazyImport = <T extends React.ComponentType<any>, I extends { [K2 in K]: T }, K extends keyof I>(
    factory: () => Promise<I>,
    name: K
): I =>
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    Object.create({
        [name]: lazy(async () => factory().then((module) => ({ default: module[name] })))
    });

/*
 * Usage
 * const { Home } = lazyImport(() => import(/* webpackChunkName: "Home" *\/"./Home"), "Home");
 */
