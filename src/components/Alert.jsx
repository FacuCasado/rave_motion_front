// Hooks
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import { removeGlobalError } from "../redux/actions/appActions";

const Alert = ({ globalError, removeGlobalError }) => {
    // Cierre auto
    useEffect(() => {
        const timer = setTimeout(() => {
            removeGlobalError();
        }, 7000);
        return () => clearTimeout(timer);
    }, [globalError, removeGlobalError]);

    // Cierre user
    const handleCloseAlert = () => {
        removeGlobalError();
    };

    // Styles por ruta
    const location = useLocation().pathname;

    const [ubicStyle, setUbicStyle] = useState("hidden");

    const style1 = "flex justify-center absolute z-10 w-screen mt-20";
    const style2 = "flex justify-center absolute z-10 w-screen mt-48";
    const style3 = "flex justify-center w-screen pt-20";
    const style4 = "flex justify-center absolute top-10 z-40 w-screen";
    useEffect(() => {
        if (location.slice(0, 7) === "/create") setUbicStyle(style1);

        if (location === "/") setUbicStyle(style2);

        if (location.slice(0, 6) === "/event") setUbicStyle(style3);

        if (location.slice(0, 11) === "/dashboard") setUbicStyle(style4);
    }, [location]);

    return (
        <div className={ubicStyle}>
            <div className="relative py-5 px-16 floatBox border-errorTextLight dark:bg-errorText text-errorTextLight dark:text-errorText">
                <button
                    type="button"
                    className="absolute top-0 right-2 p-1"
                    onClick={handleCloseAlert}
                >
                    <span aria-hidden="true" className="text-2xl">
                        &times;
                    </span>
                </button>
                <p className="font-medium">{globalError}</p>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        globalError: state.globalError,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        removeGlobalError: () => dispatch(removeGlobalError()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
