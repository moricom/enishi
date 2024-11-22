import React, { useCallback, useEffect, useState } from "react";

import { css, styled } from "styled-components";

import { Skeleton } from "@/enishi-ui/components/feedback/Skeleton";
import { TextField } from "@/enishi-ui/components/inputs/TextField";

const viewStyle = css`
    background-color: transparent;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`;

const StyledTextField = styled(TextField)`
    && {
        ${({ mode }) => mode === "view" && viewStyle};
    }
`;

type Props = Omit<React.ComponentPropsWithRef<typeof TextField>, "onChange" | "onSubmit" | "value"> & {
    readonly loading?: boolean;
    readonly value?: string;
    readonly onSubmit: (value: string) => void;
    readonly displayValue?: string;
};

export const WYSIWYGTextField: React.FC<Props> = ({ displayValue, colorTheme, loading, value, onSubmit, onClick, multiline, ...props }) => {
    const [editingValue, setEditingValue] = useState(value);
    const [isEditing, setIsEditing] = useState(false);
    useEffect(() => {
        setEditingValue(value);
    }, [value]);
    const handleSubmit = useCallback(() => {
        if (value !== undefined && editingValue && value !== editingValue) onSubmit(editingValue);
        setIsEditing(false);
    }, [editingValue, onSubmit, value]);
    const handleClick = useCallback<NonNullable<React.ComponentPropsWithRef<typeof TextField>["onClick"]>>(
        ({ source }) => {
            onClick?.({ source });
            if (isEditing && source === "onKeyDown") {
                return;
            }
            setIsEditing(true);
        },
        [isEditing, onClick]
    );

    if (loading) {
        return <Skeleton colorTheme={colorTheme} fullHeight fullWidth minHeight="initial" />;
    }

    return (
        <StyledTextField
            colorTheme={colorTheme}
            fontWeight="regular"
            fullHeight
            fullWidth
            mode={isEditing ? "edit" : "view"}
            multiline={multiline}
            noMargin
            onBlur={handleSubmit}
            onChange={setEditingValue}
            onClick={handleClick}
            onSubmit={handleSubmit}
            submitWith={multiline ? { metaKey: true, enterKey: true } : { enterKey: true }}
            value={isEditing ? editingValue : (displayValue ?? editingValue)}
            {...props}
        />
    );
};
