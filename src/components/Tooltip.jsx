import { ReactNode, useRef } from "react";

const Tooltip = ({ children, tooltip, x }) => {
    const tooltipRef = useRef(null);
    const container = useRef(null);

    const position = Number(x) || 30;

    return (
        <div
            ref={container}
            onMouseEnter={({ clientX }) => {
                if (!tooltipRef.current || !container.current) return;
                const { left } = container.current.getBoundingClientRect();

                tooltipRef.current.style.left =
                    clientX - left - position + "px";
            }}
            className="group relative inline-block"
        >
            {children}
            {tooltip ? (
                <span
                    ref={tooltipRef}
                    className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition bg-secondaryLight dark:bg-secondary border border-secondaryBorderLight dark:border-secondaryBorder dark:text-white p-1 rounded absolute top-full mt-2 whitespace-nowrap"
                >
                    {tooltip}
                </span>
            ) : null}
        </div>
    );
};

export default Tooltip;
