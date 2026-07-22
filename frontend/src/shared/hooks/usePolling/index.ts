import { useEffect, useRef } from "react";

export function usePolling(
    callback: () => void,
    intervalMs: number,
    active: boolean,
): void {
    const savedCallback = useRef(callback);
    savedCallback.current = callback;

    useEffect(() => {
        if (typeof window === "undefined") {
            return;
        }
        if (!active) {
            return;
        }

        const id = setInterval(() => savedCallback.current(), intervalMs);
        return () => clearInterval(id);
    }, [intervalMs, active]);
}
