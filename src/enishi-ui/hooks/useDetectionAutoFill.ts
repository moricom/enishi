import { useEffect } from "react";

/**
 * ブラウザのAutofillによってinput Elementに入力がされた場合、onChangeイベントが発火されないため、
 *  100msecごとに検知を行うcustom hooks
 */
export const useDetectionAutoFill = (
    inputRef: React.RefObject<HTMLInputElement | HTMLSelectElement>,
    func: (value: string) => void,
    interval = 100
): void => {
    useEffect(() => {
        const intervalID = window.setInterval(() => {
            if (!inputRef.current) {
                return;
            }
            if (inputRef.current.value !== "") {
                func(inputRef.current.value);
                window.clearInterval(intervalID);
            }
        }, interval);
        return () => {
            window.clearInterval(intervalID);
        };
    }, [func, inputRef, interval]);
};
