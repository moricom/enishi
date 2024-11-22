import React, { useEffect, useMemo } from "react";

import { createPortal } from "react-dom";
import { css, styled } from "styled-components";

import type { enishiUIProps } from "@/enishi-ui/components/type";

import { config } from "@/config";
import { down } from "@/utils/css/mediaQuery/down";

const Host = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    transition: all ${({ theme: { transitions } }) => `${transitions.duration.standard} ${transitions.easing.easeOut}`};
    display: flex;
    justify-content: center;
    align-items: center;
`;

const DialogHost = styled.div<{ width?: string; height?: string; $autoScrollable: boolean }>`
    display: flex;
    flex-direction: column;
    background-color: ${({ theme }) => theme.palette.background[50]};
    box-shadow: ${({ theme }) => theme.shadows["3"]};
    min-height: 12rem;
    min-width: 20rem;
    max-height: 80vh;
    max-width: 80vw;
    width: ${({ width }) => width ?? "fit-content"};
    height: ${({ height }) => height ?? "fit-content"};
    border-radius: 6px;
    overflow: ${({ $autoScrollable }) => ($autoScrollable ? "auto" : "initial")};
    ${({
        theme: {
            breakpoints: {
                sizes: { tablet }
            }
        }
    }) => css`
        ${down(tablet)} {
            min-height: 7rem;
        }
    `}
`;

type Props = enishiUIProps<{
    open: boolean;
    onClose?: () => void;
    width?: string;
    height?: string;
    autoScrollable?: boolean;
    children?: React.ReactNode;
    className?: string;
}>;

// eslint-disable-next-line @typescript-eslint/no-magic-numbers
let globalDialogIndex = 1000;

export const Dialog: React.FC<Props> = ({ open, onClose, autoScrollable = false, width, height, children, ...props }) => {
    const dialogRootElement = useMemo(() => document.getElementById(config.DIALOG_ROOT_ELEMENT_ID), []);
    const dialogIndex = useMemo(() => {
        if (open) {
            globalDialogIndex += 1;
        }
        return globalDialogIndex;
    }, [open]);
    useEffect(() => {
        if (!open) {
            return () => undefined;
        }
        const handleKeydown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                const targetDialog = dialogRootElement?.childNodes[dialogRootElement?.childNodes.length - 1];
                if (targetDialog instanceof HTMLElement) {
                    if (dialogIndex === parseInt(targetDialog.dataset.dialogIndex ?? "0", 10)) {
                        onClose?.();
                    }
                }
            }
        };
        window.addEventListener("keydown", handleKeydown);
        return () => {
            window.removeEventListener("keydown", handleKeydown);
        };
    }, [onClose, open, dialogRootElement, dialogIndex]);

    const stopPropagationClickHandler = useMemo<React.MouseEventHandler<HTMLElement>>(
        () => (e) => {
            e.stopPropagation();
        },
        []
    );

    if (!dialogRootElement) {
        console.warn("The dialog root element not found");
        return null;
    }

    if (!open) {
        return null;
    }

    return createPortal(
        <Host aria-hidden="true" data-dialog-index={dialogIndex} onClick={onClose} style={{ zIndex: dialogIndex }}>
            <DialogHost
                $autoScrollable={autoScrollable}
                aria-hidden="true"
                height={height}
                onClick={stopPropagationClickHandler}
                role="dialog"
                width={width}
                {...props}
            >
                {children}
            </DialogHost>
        </Host>,
        dialogRootElement
    );
};
