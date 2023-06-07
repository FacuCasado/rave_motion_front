import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    const date = new Date();
    const currentYear = date.getFullYear();

    const handleEmailClick = () => {
        window.location.href =
            "mailto:info@ravemotion.com?subject=Quiero%20ser%20promotor";
    };

    return (
        <div className="w-full">
            <hr className="bg-gradient-to-r from-pink-600 to-fuchsia-700 dark:from-pink-600 dark:to-fuchsia-900 h-0.5 border-0 my-4 mx-auto w-3/4 sm:w-2/4 md:w-3/4 lg:w-3/4 xl:w-3/4 mb-8 md:mb-10 mt-10" />

            <div className="flex justify-center">
                <div className="flex flex-col items-start">
                    <ul className="flex flex-col gap-4">
                        <li>
                            <Link to="/about" className="link text-xl">
                                Nosotros
                            </Link>
                        </li>
                        <li>
                            <button
                                className="link text-xl"
                                onClick={handleEmailClick}
                            >
                                Vende con nosotros
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="flex justify-center items-center mt-16">
                <p className="text-center mb-8 text-sm">
                    © 2023 RaveMotion, todos los derechos reservados.
                </p>
            </div>
        </div>
    );
};

export default Footer;
