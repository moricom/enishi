import React, { useCallback } from "react";

import type { enishiUIProps } from "@/enishi-ui/components/type";

import type { PromisableFunction } from "@/types/utils";

type Props = enishiUIProps<{
    onSubmit: PromisableFunction<() => void>;
}>;

export const Form: React.FC<Props> = ({ onSubmit, children, ...props }) => {
    const handleSubmit = useCallback<React.FormEventHandler<HTMLFormElement>>(
        (e) => {
            e.preventDefault();
            void onSubmit();
        },
        [onSubmit]
    );
    return (
        <form onSubmit={handleSubmit} {...props}>
            {children}
        </form>
    );
};
