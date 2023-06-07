import useDarkMode from "../hooks/useDarkMode";

// Icons
import { MdOutlineDarkMode, MdOutlineWbSunny } from "react-icons/md";

const DarkModeSwitch = ({ blockType, size, text }) => {
    const [theme, setTheme] = useDarkMode();

    const handleChange = () => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    };

    return blockType ? (
        <button
            onClick={handleChange}
            className="w-full gap-2 items-center flex flex-row text-lg"
        >
            {theme === "dark" ? (
                <MdOutlineDarkMode
                    className="text-text"
                    size={size ? size : "1.5rem"}
                />
            ) : (
                <MdOutlineWbSunny
                    className="text-textLight"
                    size={size ? size : "1.5rem"}
                />
            )}
            {text ? text : "Cambiar modo"}
        </button>
    ) : (
        <button onClick={handleChange}>
            {theme === "dark" ? (
                <MdOutlineDarkMode className="text-fuchsia-600" size="1.8rem" />
            ) : (
                <MdOutlineWbSunny className="text-fuchsia-600" size="1.8rem" />
            )}
        </button>
    );
};

export default DarkModeSwitch;
