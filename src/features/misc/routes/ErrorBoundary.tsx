import React from "react";

import { ErrorPage } from "@/features/misc/routes/ErrorPage";

type Props = {
    readonly children?: React.ReactNode;
};

type State = {
    error?: Error;
    info?: React.ErrorInfo;
    hasError: boolean;
};

// eslint-disable-next-line react/require-optimization
export class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            hasError: false
        };
    }

    componentDidCatch(error: Error, info: React.ErrorInfo) {
        console.error(error, info);

        /*
         * Display fallback UI
         * You can also log the error to an error reporting service
         */
        this.setState({ error, info, hasError: true });
    }

    render() {
        const { hasError, error, info } = this.state;
        const { children } = this.props;

        if (hasError) {
            if (error) {
                console.error(error);
            }
            if (info) {
                console.info(info);
            }
            return <ErrorPage error={error} />;
        }
        return children;
    }
}
