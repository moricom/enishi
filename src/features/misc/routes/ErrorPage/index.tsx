import React, { useCallback, useEffect } from "react";

export const ErrorPage: React.FC<{ readonly error?: Error }> = ({ error }) => {
    useEffect(() => {
        window.document.body.style.margin = "0";
    }, []);

    const reset = useCallback(() => {
        window.location.assign("/");
    }, []);
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                height: "100vh",
                width: "100vw",
                background: "#F3F5F8",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#0C1825" }}>エラーが発生しました</div>
            {error ? <div>{error.message}</div> : null}
            <button
                color="primary"
                onClick={reset}
                style={{
                    backgroundColor: "#5E78A6",
                    borderRadius: "2rem",
                    padding: "0.5rem 4rem",
                    color: "white",
                    fontWeight: "bold",
                    boxShadow: "0px 1px 2px 1px rgb(0 0 0 / 30%)",
                    border: "none",
                    cursor: "pointer"
                }}
                type="button"
            >
                再読み込みする
            </button>
            <div style={{ height: "2rem" }} />
            <div style={{ color: "#888888", fontWeight: "bold" }}>不具合が継続して発生する場合、担当者にご連絡ください。</div>
        </div>
    );
};
