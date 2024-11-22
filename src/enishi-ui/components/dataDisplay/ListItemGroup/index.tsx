import React, { useCallback } from "react";

import { styled } from "styled-components";

import { Badge } from "@/enishi-ui/components/dataDisplay/Badge";
import { List } from "@/enishi-ui/components/dataDisplay/List";
import { ListItem } from "@/enishi-ui/components/dataDisplay/ListItem";
import { Arrow } from "@/enishi-ui/components/dataDisplay/ListItemGroup/Arrow";
import { Typography } from "@/enishi-ui/components/dataDisplay/Typography";
import { IconButton } from "@/enishi-ui/components/inputs/IconButton";
import { LinearLayout } from "@/enishi-ui/components/layout/LinearLayout";
import type { EnishiUIProps } from "@/enishi-ui/components/type";

const Label = styled.div`
    padding-left: 0.2rem;
    flex-grow: 1;
    overflow: hidden;
`;

const LabelText = styled(Typography)`
    && {
        display: block;
        text-overflow: ellipsis;
        overflow: hidden;
    }
`;

const NestedList = styled(List)``;

type Props = EnishiUIProps<{
    label: string;
    indent?: number;
    open?: boolean;
    selected?: boolean;
    onOpen?: () => void;
    onClose?: () => void;
    fontWeight?: React.ComponentPropsWithRef<typeof Typography>["fontWeight"];
    listItemAction?: React.ReactNode;
    typographyProps?: React.ComponentPropsWithRef<typeof Typography>;
    expansionIcon?: React.ReactNode | null;
    withBatch?: boolean;
    rounded?: boolean;
    gap?: string;
    batchProps?: React.ComponentPropsWithRef<typeof Badge>;
}>;

const ListItemGroupHost = (
    {
        label,
        indent = 0,
        open = false,
        selected = false,
        rounded = false,
        onOpen,
        onClose,
        onClick,
        size,
        fontWeight,
        listItemAction,
        children,
        colorTheme = "primary",
        typographyProps,
        expansionIcon,
        withBatch,
        batchProps,
        gap,
        ...props
    }: Props,
    ref: React.ForwardedRef<HTMLDivElement>
) => {
    const toggleOpen = useCallback(() => {
        if (open) {
            onClose?.();
        } else {
            onOpen?.();
        }
    }, [onClose, onOpen, open]);
    const disablePropagation = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
    }, []);
    return (
        <LinearLayout colorTheme={colorTheme} fullWidth orientation="vertical" ref={ref} {...props}>
            <ListItem button colorTheme={colorTheme} indent={indent} onClick={onClick} rounded={rounded} selected={selected} size={size}>
                <IconButton circle colorTheme={colorTheme} noMargin onClick={toggleOpen} size={size} stopPropagation type="button">
                    {expansionIcon ?? <Arrow open={open} size={size} />}
                </IconButton>
                <Label>
                    <LabelText fontWeight={fontWeight} variant="caption" {...typographyProps}>
                        {label}
                    </LabelText>
                </Label>
                <div onClick={disablePropagation} role="none">
                    {listItemAction}
                </div>
            </ListItem>
            {withBatch ? <Badge left="1.6rem" top="0.4rem" {...batchProps} /> : null}
            {open ? (
                <NestedList colorTheme={colorTheme} gap={gap}>
                    {children}
                </NestedList>
            ) : null}
        </LinearLayout>
    );
};

export const ListItemGroup = React.forwardRef<HTMLDivElement, Props>(ListItemGroupHost);
