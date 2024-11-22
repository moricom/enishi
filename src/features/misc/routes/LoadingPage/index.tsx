import React, { useEffect, useState } from "react";

import { keyframes, styled } from "styled-components";

import { Typography } from "@/enishi-ui/components/dataDisplay/Typography";
import { Indicator } from "@/enishi-ui/components/feedback/Indicator";
import { LinearLayout } from "@/enishi-ui/components/layout/LinearLayout";

import { LoadingPageHost } from "@/features/misc/routes/LoadingPage/Host";

const dotAnimation = keyframes`
    0%  {box-shadow: 0.5rem 0 #555,  -0.5rem 0 #5552;background: #555 }
    33% {box-shadow: 0.5rem 0 #555,  -0.5rem 0 #5552;background: #5552}
    66% {box-shadow: 0.5rem 0 #5552, -0.5rem 0 #555; background: #5552}
    100%{box-shadow: 0.5rem 0 #5552, -0.5rem 0 #555; background: #555 }
`;

const LoadingText = styled(Typography)`
    && {
        position: relative;
        width: 15px;
        aspect-ratio: 1;
        border-radius: 50%;
        margin-right: 5rem;
        &::after {
            content: "";
            position: absolute;
            right: -5rem;
            bottom: 0.2rem;
            min-width: 0.3rem;
            width: 0.3rem;
            min-height: 0.3rem;
            height: 0.3rem;
            border-radius: 50%;
            animation: ${dotAnimation} 1s infinite linear alternate;
        }
    }
`;

export const LoadingPage: React.FC = () => {
    const [loadingViewIsVisible, setLoadingViewIsVisible] = useState(false);

    useEffect(() => {
        const interval = 200;
        const id = setTimeout(() => {
            setLoadingViewIsVisible(true);
        }, interval);
        return () => {
            clearTimeout(id);
        };
    }, []);

    return (
        <LoadingPageHost>
            {loadingViewIsVisible ? (
                <LinearLayout fullWidth gravity="center" orientation="horizontal">
                    <Indicator size="medium" style={{ marginRight: "1rem" }} />
                    <LoadingText colorTheme="secondary" variant="h3">
                        Loading
                    </LoadingText>
                </LinearLayout>
            ) : null}
        </LoadingPageHost>
    );
};
