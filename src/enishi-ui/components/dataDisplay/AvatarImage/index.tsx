import React, { useEffect, useState } from "react";

import { keyframes, styled } from "styled-components";

import { Ripple } from "@/enishi-ui/components/effect/Ripple";
import { Skeleton } from "@/enishi-ui/components/feedback/Skeleton";
import type { enishiUIProps } from "@/enishi-ui/components/type";
import { useHandleEnterKeyDown } from "@/enishi-ui/hooks/useHandleEnterKeyDown";

const sizes = {
    "x-small": {
        height: "1.5rem",
        width: "1.5rem",
        margin: "0.1rem"
    },
    "small": {
        height: "2rem",
        width: "2rem",
        margin: "0.2rem"
    },
    "medium": {
        height: "2.5rem",
        width: "2.5rem",
        margin: "0.5rem"
    },
    "large": {
        height: "4rem",
        width: "4rem",
        margin: "0.5rem"
    },
    "x-large": {
        height: "7rem",
        width: "7rem",
        margin: "0.5rem"
    }
};

const Host = styled.div<{
    $circle: boolean;
    $size: NonNullable<enishiUIProps["size"]>;
    $raised: boolean;
    $noMargin: boolean;
}>`
    min-width: ${({ $size }) => sizes[$size].width};
    width: ${({ $size }) => sizes[$size].width};
    max-width: ${({ $size }) => sizes[$size].width};
    min-height: ${({ $size }) => sizes[$size].height};
    height: ${({ $size }) => sizes[$size].height};
    max-height: ${({ $size }) => sizes[$size].height};
    vertical-align: super;
    border-radius: ${({ $circle }) => ($circle ? "50%" : "6px")};
    box-shadow: ${({ theme, $raised }) => ($raised ? theme.shadows["2"] : "none")};
    margin: ${({ $size, $noMargin }) => ($noMargin ? "0" : sizes[$size].margin)};
    background: ${({ theme }) => theme.palette.background[10]};
`;

const rippleKeyframes = keyframes`
    0% {
        transform: scale(1.2);
    }
    100% {
        transform: scale(1.15);
    }
`;

const ButtonHost = styled(Host)<{ $circle: boolean; $colorTheme: NonNullable<enishiUIProps["colorTheme"]> }>`
    cursor: pointer;
    position: relative;
    box-sizing: border-box;
    background: ${({ theme }) => theme.palette.background[10]};
    border-radius: ${({ $circle }) => ($circle ? "50%" : "6px")};
    transition: all ${({ theme: { transitions } }) => `${transitions.duration.standard} ${transitions.easing.easeOut}`};
    &:hover {
        box-shadow: ${({ theme }) => theme.shadows["3"]};
    }
    /* RippleCircle Styles */
    &:hover > :nth-child(2) {
        transform: scale(1.2);
        animation: ${rippleKeyframes} 0.6s ease-in-out 1.6s infinite alternate;
        background-color: ${({ theme, $colorTheme }) => theme.palette[$colorTheme][100]};
    }
`;

const RippleCircle = styled.div<{ $circle: boolean }>`
    background-color: transparent;
    position: absolute;
    border-radius: ${({ $circle }) => ($circle ? "50%" : "6px")};
    width: 100%;
    height: 100%;
    inset: 0;
    transition:
        transform ${({ theme: { transitions } }) => `${transitions.duration.standard} ${transitions.easing.easeOut}`},
        background-color ${({ theme: { transitions } }) => `${transitions.duration.standard} ${transitions.easing.easeOut}`};
    transform: scale(1.1);
    animation: none;
    z-index: -1;
`;

const Image = styled.img<{ $circle: boolean }>`
    width: 100%;
    height: 100%;
    opacity: 1;
    object-fit: cover;
    border-radius: ${({ $circle }) => ($circle ? "50%" : "6px")};
    overflow: hidden;
`;

type Props = enishiUIProps<{
    raised?: boolean;
    imageSource?: File | string | null;
    button?: boolean;
    noMargin?: boolean;
    circle?: boolean;
    loading?: boolean;
}>;

const personDefaultIcon = "https://storage.googleapis.com/enishi-common/images/user/person_default_icon.png";

const AvatarImageHost = (
    {
        size = "medium",
        colorTheme = "primary",
        raised = false,
        button = false,
        imageSource,
        onClick,
        noMargin = false,
        circle = true,
        loading: loadingParent = false,
        ...props
    }: Props,
    ref: React.ForwardedRef<HTMLDivElement>
) => {
    const handleEnterKeyDown = useHandleEnterKeyDown(onClick);
    const [objectUrlCreating, setObjectUrlCreating] = useState(false);
    const [src, setSrc] = useState(typeof imageSource === "string" ? imageSource : undefined);
    useEffect(() => {
        let newSrc: string | undefined;
        if (imageSource instanceof File) {
            newSrc = URL.createObjectURL(imageSource);
            setObjectUrlCreating(false);
            setSrc(newSrc);
        } else {
            setSrc(imageSource ?? undefined);
        }
        return () => {
            if (newSrc) {
                URL.revokeObjectURL(newSrc);
            }
        };
    }, [imageSource]);
    const loading = loadingParent || objectUrlCreating;

    if (!loading && button) {
        return (
            <Ripple
                colorTheme={colorTheme}
                component={
                    <ButtonHost
                        $circle={circle}
                        $colorTheme={colorTheme}
                        $noMargin={noMargin}
                        $raised={raised}
                        $size={size}
                        onClick={onClick}
                        onKeyDown={handleEnterKeyDown}
                        ref={ref}
                        role="button"
                        tabIndex={0}
                        {...props}
                    >
                        <Image $circle={circle} alt="" referrerPolicy="no-referrer" src={src ?? personDefaultIcon} />
                        <RippleCircle $circle={circle} />
                    </ButtonHost>
                }
            />
        );
    }
    return (
        <Host $circle={circle} $noMargin={noMargin} $raised={raised} $size={size} ref={ref} {...props}>
            {loading ? (
                <Skeleton circle={circle} colorTheme={colorTheme} fullHeight fullWidth noPadding />
            ) : (
                <Image $circle={circle} alt="" referrerPolicy="no-referrer" src={src ?? personDefaultIcon} />
            )}
        </Host>
    );
};

export const AvatarImage = React.forwardRef<HTMLDivElement, Props>(AvatarImageHost);
