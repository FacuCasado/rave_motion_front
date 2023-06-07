import { useEffect, useState } from "react";

const useDarkMode = () => {
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        const localTheme = localStorage.getItem("theme");
        console.log("localTheme: ", localTheme);
        if (localTheme === "dark") {
            setTheme("dark");
        }
        console.log("new theme seted:", theme);
    }, []);

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        console.log("theme:", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    return [theme, setTheme];
};

export default useDarkMode;
