import React, { useCallback, useEffect, useRef, useState } from "react";

import { styled } from "styled-components";

import { FormItemContainer } from "@/enishi-ui/components/inputs/FormItemContainer";
import { FormItemLabel } from "@/enishi-ui/components/inputs/FormItemLabel";
import { FormItemLabelText } from "@/enishi-ui/components/inputs/FormItemLabelText";
import { InputField } from "@/enishi-ui/components/inputs/TextField/InputField";
import type { enishiUIProps } from "@/enishi-ui/components/type";
import { useUniqueId } from "@/enishi-ui/hooks/useUniqueId";
import { mergeRefs } from "@/enishi-ui/lib/mergeRefs";

import type { DefaultTheme } from "styled-components";

const Content = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    column-gap: 0.5rem;
    row-gap: 0.5rem;
    padding: 0.3rem 0.3rem;
`;

const Input = styled(InputField)`
    && {
        width: initial;
        flex-grow: 1;
        min-height: 1.8rem;
    }
`;

type Props = enishiUIProps<{
    name?: string;
    labelText?: string;
    placeholder?: string;
    value?: string;
    defaultValue?: string;
    pattern?: string;
    autoComplete?: string;
    disabled?: boolean;
    required?: boolean;
    fullWidth?: boolean;
    fullHeight?: boolean;
    minLength?: number;
    maxLength?: number;
    noMargin?: boolean;
    raised?: boolean;
    fontWeight?: keyof DefaultTheme["typography"]["fontWeight"];
    size?: React.ComponentPropsWithRef<typeof FormItemContainer>["size"];
    submitWith?:
        | false
        | {
              keys: string[];
          };
    errorMessage?: string;
    onSubmit?: (text: string) => void;
    onChange?: (text: string, event: React.FocusEvent<HTMLInputElement>) => void;
    onClick?: React.ComponentPropsWithRef<typeof FormItemContainer>["onClick"];
    onDelete?: () => void;
    onBlur?: (text: string, event: React.FocusEvent<HTMLInputElement>) => void;
    onFocus?: () => void;
    inputRef?: React.RefObject<HTMLInputElement>;
    formItemContainerProps?: Partial<React.ComponentPropsWithRef<typeof FormItemContainer>>;
    inputFieldProps?: {
        [property: `data-${string}`]: string;
        id?: string;
        style?: React.CSSProperties;
        className?: string;
    };
    autoFocus?: boolean;
}>;

const defaultSubmitWith = {
    keys: ["Enter"]
};
// eslint-disable-next-line max-statements
export const ChipsInput: React.FC<Props> = ({
    name,
    style,
    labelText,
    placeholder,
    value,
    colorTheme = "primary",
    defaultValue,
    pattern,
    autoComplete,
    disabled = false,
    required = false,
    fullWidth = false,
    fullHeight = false,
    minLength,
    maxLength,
    noMargin = false,
    raised = false,
    fontWeight = "light",
    size = "medium",
    errorMessage,
    onClick,
    onBlur,
    onFocus,
    onChange,
    onDelete,
    submitWith = defaultSubmitWith,
    onSubmit,
    inputRef: propsInputRef,
    children,
    formItemContainerProps,
    inputFieldProps,
    autoFocus = false,
    ...props
}) => {
    const id = useUniqueId().toString();
    const [focused, setFocused] = useState<boolean>(false);
    const [invalid, setInvalid] = useState<boolean>(Boolean(errorMessage));
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (errorMessage) {
            setInvalid(true);
        }
    }, [errorMessage]);

    const onInputTextBlur = useCallback<React.FocusEventHandler<HTMLInputElement>>(
        (e) => {
            onBlur?.(e.currentTarget.value, e);
            setFocused(false);
            setInvalid(!(e.target.validity.valid && !errorMessage));
        },
        [onBlur, errorMessage]
    );

    const onInputTextChange = useCallback<React.FocusEventHandler<HTMLInputElement>>(
        (e) => {
            onChange?.(e.currentTarget.value, e);
            if (invalid) {
                setInvalid(!(e.target.validity.valid && !errorMessage));
            }
        },
        [errorMessage, invalid, onChange]
    );
    const onInputTextFocus = useCallback<React.FocusEventHandler<HTMLInputElement>>(() => {
        onFocus?.();
        setFocused(true);
    }, [onFocus]);

    const onKeyDown = useCallback<React.KeyboardEventHandler<HTMLInputElement>>(
        // eslint-disable-next-line max-statements
        (e) => {
            if (e.currentTarget?.selectionStart === 0 && e.key === "Backspace") {
                onDelete?.();
            }
            if (!submitWith) {
                return;
            }

            if (!submitWith.keys.includes(e.key)) {
                return;
            }

            if (!inputRef.current) {
                console.warn("The inputRef is not bound");
                return;
            }

            e.preventDefault();
            onSubmit?.(inputRef.current.value);
        },
        [submitWith, onSubmit, onDelete]
    );

    return (
        <FormItemContainer
            colorTheme={colorTheme}
            empty={false}
            errorMessage={errorMessage}
            focused={focused}
            fullHeight={fullHeight}
            fullWidth={fullWidth}
            invalid={invalid}
            mode="edit"
            noMargin={noMargin}
            onClick={onClick}
            raised={raised}
            size={size}
            stopPropagation
            style={style}
            {...formItemContainerProps}
            {...props}
        >
            {labelText ? (
                <FormItemLabel htmlFor={id}>
                    <FormItemLabelText empty={false} focused={focused} invalid={invalid} withPlaceholder={Boolean(placeholder)}>
                        {labelText}
                    </FormItemLabelText>
                </FormItemLabel>
            ) : null}
            <Content>
                {children}
                {/* eslint-disable-next-line styled-components-a11y/no-autofocus */}
                <Input
                    $disabled={disabled}
                    $focused={focused}
                    $fontWeight={fontWeight}
                    $fullHeight={fullHeight}
                    $inputSize={size}
                    $multiline={false}
                    $resizableY={false}
                    $withLabel={Boolean(labelText)}
                    autoComplete={autoComplete}
                    // eslint-disable-next-line jsx-a11y/no-autofocus
                    autoFocus={autoFocus}
                    className={inputFieldProps?.className}
                    defaultValue={defaultValue}
                    id={id}
                    maxLength={maxLength}
                    minLength={minLength}
                    name={name}
                    onBlur={onInputTextBlur}
                    onChange={onInputTextChange}
                    onFocus={onInputTextFocus}
                    onKeyDown={onKeyDown}
                    pattern={pattern}
                    placeholder={placeholder}
                    ref={propsInputRef ? mergeRefs([inputRef, propsInputRef]) : inputRef}
                    required={required}
                    value={value}
                    {...inputFieldProps}
                />
            </Content>
        </FormItemContainer>
    );
};
