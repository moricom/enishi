import React from "react";

import { styled } from "styled-components";

import { Skeleton } from "@/enishi-ui/components/feedback/Skeleton";
import type { enishiUIProps } from "@/enishi-ui/components/type";

const Host = styled.div<{ width?: string; height?: string }>`
    min-width: ${({ width }) => width ?? "initial"};
    min-height: ${({ height }) => height ?? "initial"};
    width: ${({ width }) => width ?? "initial"};
    height: ${({ height }) => height ?? "initial"};
    vertical-align: super;
`;

const Img = styled.img`
    width: 100%;
    height: 100%;
    opacity: 1;
    object-fit: cover;
    overflow: hidden;
`;

type Props = enishiUIProps<{
    width?: string;
    height?: string;
    imageSource?: string;
    imageProps?: React.ImgHTMLAttributes<HTMLImageElement>;
    loading?: boolean;
    alt?: string;
}>;

export const Image: React.FC<Props> = ({ width, height, imageSource, imageProps, alt, loading, colorTheme: _, ...props }) => (
    <Host height={height} width={width} {...props}>
        {loading ? <Skeleton fullHeight fullWidth noPadding /> : <Img alt={alt} src={imageSource} {...imageProps} />}
    </Host>
);
