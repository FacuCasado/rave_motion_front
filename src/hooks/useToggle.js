import { useState, useCallback } from "react";

export const useToggle = (initialState = false) => {
    const [value, setState] = useState(initialState);

    const toggle = useCallback(() => {
        setState((state) => !state);
    }, []);

    return [value, toggle];
};
