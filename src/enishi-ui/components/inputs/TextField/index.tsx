import React, { useCallback, useEffect, useRef, useState } from "react";

import { MdVisibility } from "@react-icons/all-files/md/MdVisibility";
import { MdVisibilityOff } from "@react-icons/all-files/md/MdVisibilityOff";
import { styled } from "styled-components";

import { FormItemContainer } from "@/enishi-ui/components/inputs/FormItemContainer";
import { FormItemLabel } from "@/enishi-ui/components/inputs/FormItemLabel";
import { FormItemLabelText } from "@/enishi-ui/components/inputs/FormItemLabelText";
import { IconButton } from "@/enishi-ui/components/inputs/IconButton";
import { InputField } from "@/enishi-ui/components/inputs/TextField/InputField";
import type { enishiUIProps } from "@/enishi-ui/components/type";
import { useBoolean } from "@/enishi-ui/hooks/useBoolean";
import { useDetectionAutoFill } from "@/enishi-ui/hooks/useDetectionAutoFill";
import { usePrevious } from "@/enishi-ui/hooks/usePrevious";
import { useUniqueId } from "@/enishi-ui/hooks/useUniqueId";
import { mergeRefs } from "@/enishi-ui/lib/mergeRefs";

import type { PromisableFunction } from "@/types/utils";
import type { DefaultTheme } from "styled-components";

const AutoWidthContainer = styled.div`
    letter-spacing: normal;
    padding-left: 0.6rem;
    padding-right: 0.6rem;
    height: 0px;
    overflow: hidden;
`;

const AutoHeightContainer = styled.div`
    letter-spacing: normal;
    min-height: 2.8rem;
    white-space: pre-wrap;
    margin-top: 1rem;
    z-index: -1;
    opacity: 0;
    pointer-events: none;
`;

const IconContainer = styled.div`
    position: absolute;
    right: 0;
    margin-right: 0.5rem;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

type Props = enishiUIProps<{
    name?: string;
    labelText?: string;
    placeholder?: string;
    value?: string;
    defaultValue?: string;
    pattern?: string;
    type?: "date" | "email" | "number" | "password" | "text" | "url";
    autoComplete?: string;
    disabled?: boolean;
    required?: boolean;
    fullWidth?: boolean;
    fullHeight?: boolean;
    minLength?: number;
    maxLength?: number;
    multiline?: boolean;
    resizableY?: boolean;
    noMargin?: boolean;
    raised?: boolean;
    fontWeight?: keyof DefaultTheme["typography"]["fontWeight"];
    mode?: "edit" | "view";
    size?: React.ComponentPropsWithRef<typeof FormItemContainer>["size"];
    submitWith?:
        | false
        | {
              enterKey?: boolean;
              metaKey?: boolean;
          };
    errorMessage?: string;
    onSubmit?: PromisableFunction<(text: string) => void>;
    onPaste?: React.ClipboardEventHandler;
    onChange?: PromisableFunction<(text: string, event: React.FocusEvent<HTMLInputElement>) => void>;
    onClick?: React.ComponentPropsWithRef<typeof FormItemContainer>["onClick"];
    onBlur?: (text: string, event: React.FocusEvent<HTMLInputElement>) => void;
    onFocus?: () => void;
    inputRef?: React.RefObject<HTMLInputElement>;
    formItemContainerProps?: Partial<React.ComponentPropsWithRef<typeof FormItemContainer>>;
    icon?: React.ReactNode | null;
    inputFieldProps?: {
        [property: `data-${string}`]: string;
        id?: string;
        style?: React.CSSProperties;
        className?: string;
    };
    autoFocus?: boolean;
    autoWidth?: boolean;
    autoHeight?: boolean;
}>;

const defaultSubmitWith = {
    enterKey: true,
    metaKey: true
};
// eslint-disable-next-line max-statements
export const TextField: React.FC<Props> = ({
    name,
    style,
    className,
    labelText,
    placeholder,
    value,
    colorTheme = "primary",
    defaultValue,
    pattern,
    type = "text",
    autoComplete,
    disabled = false,
    required = false,
    fullWidth = false,
    fullHeight = false,
    minLength,
    maxLength,
    multiline = false,
    resizableY = false,
    noMargin = false,
    raised = false,
    fontWeight = "light",
    mode = "edit",
    size = "medium",
    submitWith = defaultSubmitWith,
    errorMessage,
    onClick,
    onSubmit,
    onPaste,
    onBlur,
    onFocus,
    onChange,
    inputRef: propsInputRef,
    children,
    icon,
    formItemContainerProps,
    inputFieldProps,
    autoFocus = false,
    autoWidth = false,
    autoHeight = false,
    ...props
}) => {
    const id = useUniqueId().toString();
    const [empty, setEmpty] = useState<boolean>(type !== "date");
    const [focused, setFocused] = useState<boolean>(false);
    const [invalid, setInvalid] = useState<boolean>(Boolean(errorMessage));
    const { value: isInputting, setTrue: startInputting, setFalse: endInputting } = useBoolean(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(type !== "password");
    const togglePasswordVisibility = useCallback(() => {
        setIsPasswordVisible(!isPasswordVisible);
    }, [isPasswordVisible]);

    useEffect(() => {
        if (type === "date") {
            setEmpty(false);
        }
    }, [type]);

    useEffect(() => {
        if (errorMessage) {
            setInvalid(true);
        }
    }, [errorMessage]);

    const prevMode = usePrevious(mode);
    useEffect(() => {
        if (prevMode === "view" && mode === "edit") {
            inputRef.current?.focus();
        }
    }, [prevMode, mode]);

    const onInputTextBlur = useCallback<React.FocusEventHandler<HTMLInputElement>>(
        (e) => {
            onBlur?.(e.currentTarget.value, e);
            if (type !== "date") {
                setEmpty(e.target.value.length === 0);
            }
            setFocused(false);
            setInvalid(!(e.target.validity.valid && !errorMessage));
        },
        [onBlur, type, errorMessage]
    );

    const onInputTextFocus = useCallback<React.FocusEventHandler<HTMLInputElement>>(() => {
        onFocus?.();
        setFocused(true);
    }, [onFocus]);

    const onInputTextChange = useCallback<React.FocusEventHandler<HTMLInputElement>>(
        (e) => {
            void onChange?.(e.currentTarget.value, e);
            if (invalid) {
                setInvalid(!(e.target.validity.valid && !errorMessage));
            }
        },
        [errorMessage, invalid, onChange]
    );

    const onKeyDown = useCallback<React.KeyboardEventHandler<HTMLInputElement>>(
        (e) => {
            if (isInputting || submitWith === false) {
                return;
            }
            if (!inputRef.current) {
                console.warn("The inputRef is not bound");
                return;
            }
            if (submitWith.enterKey && e.key === "Enter") {
                void onSubmit?.(inputRef.current.value);
            }
            if (submitWith.metaKey && !(e.ctrlKey || e.metaKey)) {
                void onSubmit?.(inputRef.current.value);
            }
        },
        [submitWith, onSubmit, isInputting]
    );

    useDetectionAutoFill(inputRef, () => {
        setEmpty(false);
    });

    return (
        <FormItemContainer
            className={className}
            colorTheme={colorTheme}
            empty={empty}
            errorMessage={errorMessage}
            focused={focused}
            fullHeight={fullHeight}
            fullWidth={fullWidth}
            invalid={invalid}
            mode={mode}
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
                    <FormItemLabelText empty={empty} focused={focused} invalid={invalid} size={size} withPlaceholder={Boolean(placeholder)}>
                        {labelText}
                    </FormItemLabelText>
                </FormItemLabel>
            ) : null}
            <InputField
                $disabled={disabled}
                $focused={focused}
                $fontWeight={fontWeight}
                $fullHeight={fullHeight}
                $inputSize={size}
                $multiline={multiline}
                $resizableY={resizableY}
                $withLabel={Boolean(labelText)}
                as={mode === "view" ? "pre" : multiline ? "textarea" : "input"}
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
                onCompositionEnd={endInputting}
                onCompositionStart={startInputting}
                onFocus={onInputTextFocus}
                onKeyDown={onKeyDown}
                onPaste={onPaste}
                pattern={pattern}
                placeholder={placeholder}
                ref={propsInputRef ? mergeRefs([inputRef, propsInputRef]) : inputRef}
                required={required}
                style={{
                    ...(type === "password" ? { paddingRight: "3rem", ...inputFieldProps?.style } : inputFieldProps?.style),
                    ...(autoHeight ? { position: "absolute" } : {})
                }}
                type={type === "password" ? (isPasswordVisible ? "text" : "password") : type}
                value={value}
                {...inputFieldProps}
            >
                {mode === "view" ? value : null}
            </InputField>
            {autoWidth ? <AutoWidthContainer>{value}</AutoWidthContainer> : null}
            {autoHeight ? (
                <AutoHeightContainer>
                    {value}
                    {value?.endsWith("\n") ? <br /> : null}
                </AutoHeightContainer>
            ) : null}
            {type === "password" && (
                <IconContainer>
                    <IconButton
                        circle
                        colorTheme={colorTheme}
                        label={isPasswordVisible ? "パスワードを非表示" : "パスワードを表示"}
                        onClick={togglePasswordVisibility}
                    >
                        {isPasswordVisible ? <MdVisibilityOff /> : <MdVisibility />}
                    </IconButton>
                </IconContainer>
            )}
            {icon ? <IconContainer>{icon}</IconContainer> : null}
            {children}
        </FormItemContainer>
    );
};
