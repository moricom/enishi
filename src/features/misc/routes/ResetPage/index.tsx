import React, { useCallback, useEffect, useMemo, useState } from "react";

const deleteAllCookies = () => {
    document.cookie.split(";").forEach((c) => {
        document.cookie = c.replace(/^ +/u, "").replace(/[=].*/u, `=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`);
    });
};

const unregisterAllServiceWorkers = async () => {
    const registrations = await navigator.serviceWorker.getRegistrations();
    await Promise.all(registrations.map(async (x) => x.unregister()));
};

const deleteCaches = async () => {
    const cacheNames = await caches.keys();
    await Promise.all(cacheNames.map(async (cacheName) => caches.delete(cacheName)));
};

export const ResetPage: React.FC = () => {
    const [isReset, setIsReset] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const reset = useCallback(() => {
        // eslint-disable-next-line max-statements
        void (async () => {
            try {
                localStorage.clear();
                sessionStorage.clear();
                deleteAllCookies();
                await unregisterAllServiceWorkers();
                await deleteCaches();
                setIsReset(true);
                setError(null);
            } catch (e) {
                console.error(e);
                if (e instanceof Error) {
                    setError(e.message);
                } else {
                    setError("Unknown error");
                }
            }
        })();
    }, []);

    const forceReset = useMemo(() => {
        const params = new URLSearchParams(location.search);
        return params.get("force") !== null;
    }, []);
    useEffect(() => {
        if (forceReset) {
            reset();
        }
    }, [forceReset, reset]);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%"
            }}
        >
            <button
                onClick={reset}
                style={{
                    width: "12rem",
                    height: "4rem",
                    fontSize: "1.5rem",
                    border: "1px solid #ccc",
                    borderRadius: "2px",
                    boxShadow: "0px 1px 3px 1px rgb(0 0 0 / 30%)",
                    cursor: "pointer"
                }}
                type="button"
            >
                Reset
            </button>
            <div style={{ marginTop: "1rem" }}>
                <div>Clear localStorage</div>
                <div>Clear sessionStorage</div>
                <div>Clear cookies</div>
            </div>
            <div style={{ marginTop: "1rem" }}>
                {isReset ? (
                    <div
                        style={{
                            color: "blue",
                            fontWeight: "bold",
                            fontSize: "1.5rem"
                        }}
                    >
                        Reset Done
                    </div>
                ) : null}
                {error ? (
                    <div>
                        <div style={{ color: "red", fontWeight: "bold", fontSize: "1.5rem" }}>Error</div>
                        <pre
                            style={{
                                color: "red",
                                maxWidth: "80vw",
                                whiteSpace: "pre-wrap",
                                margin: "auto"
                            }}
                        >
                            {error}
                        </pre>
                    </div>
                ) : null}
            </div>
        </div>
    );
};
