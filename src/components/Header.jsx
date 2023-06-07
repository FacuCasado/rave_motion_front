// Hooks
import { useState, useEffect } from "react";

// React Router Dom
import { Link, useNavigate } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import {
    searchEvents,
    setAllEventsOnHomeEvents,
} from "../redux/actions/eventsActions";
import { signOut } from "../redux/actions/usersActions";

// Assets
import rave from "../assets/logo3.png";
import logo from "../assets/logo.svg";
import { GrMenu } from "react-icons/gr";

// Components
import DarkModeSwitch from "./DarkModeSwitch";

const Header = (props) => {
    const { isLogin, userData, signOut, searchBar } = props;
    const { searchEvents } = props;

    // Fondo opaco
    const [opacity, setOpacity] = useState(0);
    const handleScroll = () => {
        if (window.pageYOffset > window.innerHeight * 0.4) {
            setOpacity(0.7);
        } else {
            setOpacity(window.pageYOffset / (window.innerHeight * 0.4) / 1.42);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const headerStyle = {
        backgroundColor: document.documentElement.classList.contains("dark")
            ? `rgba(2, 6, 23, ${opacity})`
            : `rgba(250,250,250, ${opacity})`,
    };

    // Dropdown User
    const [showDropdown, setShowDropdown] = useState(false);
    let hideTimeout;

    const handleMouseEnter = () => {
        clearTimeout(hideTimeout);
        setShowDropdown(true);
    };

    const handleMouseLeave = () => {
        hideTimeout = setTimeout(() => {
            setShowDropdown(false);
        }, 100);
    };

    useEffect(() => {
        showDropdown && setShowDropdown(false);
    }, [location]);

    // Dropdown responsive
    const [showDropdownResponsive, setShowDropdownResponsive] = useState(false);

    let hideTimeoutResponsive;

    const handleMouseEnterResponsive = () => {
        clearTimeout(hideTimeoutResponsive);
        setShowDropdownResponsive(true);
    };

    const handleMouseLeaveResponsive = () => {
        hideTimeoutResponsive = setTimeout(() => {
            setShowDropdownResponsive(false);
        }, 100);
    };

    useEffect(() => {
        showDropdown && setShowDropdownResponsive(false);
    }, [location]);

    // Search events en tiempo real
    const handleInputChange = (event) => {
        //searchBar=event.target.value;
        searchEvents(event.target.value);
    };

    // Sign Out
    const navigate = useNavigate();
    const handleSignOut = () => {
        isLogin && signOut();

        navigate("/");
    };

    return (
        <div
            className="grid grid-cols-2 lg:grid-cols-3 w-screen h-16 fixed top-0 z-10 font-medium"
            style={headerStyle}
        >
            {/* Logo left */}
            <div className="flex justify-self-start items-center ml-4">
                <Link to="/">
                    <img
                        className="w-40 lg:w-48"
                        src={logo}
                        alt="Rave Motion Logo"
                    />
                </Link>
            </div>

            <div className="hidden lg:flex justify-self-center items-center">
                <input
                    className="w-64 xl:w-80 input"
                    type="text"
                    placeholder="Buscar evento"
                    onChange={handleInputChange}
                    value={searchBar}
                />
            </div>

            {/* NavMenu right */}
            <div className="hidden floatBox lg:flex flex-row w-fit justify-self-end justify-center my-2 items-center gap-6 py-2 px-4  rounded-full">
                <Link to="/" className="navLink">
                    Home
                </Link>

                <Link to="/reviews" className="navLink">
                    Reviews
                </Link>

                {isLogin ? (
                    <>
                        {/* Dropdown user  */}
                        <div className="inline-block relative">
                            <button
                                className="btnPrimary py-0 px-4 w-fit border-none"
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                Tu cuenta
                            </button>

                            <div
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                className={`"z-20 bg-secondaryLight dark:bg-secondary rounded-md w-40 left-[-2rem] top-[2rem] text-center" ${
                                    showDropdown ? "block" : "hidden"
                                }`}
                                style={{ position: "absolute" }}
                            >
                                <div className="dropDownItem border-b-2 border-secondaryBorderLight dark:border-secondaryBorder">
                                    <Link
                                        className="navLinkDropdown"
                                        to="/tickets"
                                    >
                                        Mis tickets
                                    </Link>
                                </div>
                                {userData.accessType === "producer" && (
                                    <>
                                        <div className="dropDownItem">
                                            <Link
                                                className="navLinkDropdown"
                                                to="/create"
                                            >
                                                Crear evento
                                            </Link>
                                        </div>
                                        <div className="dropDownItem border-b-2  border-secondaryBorderLight dark:border-secondaryBorder">
                                            <Link
                                                className="navLinkDropdown"
                                                to="/dashboard"
                                            >
                                                Dashboard
                                            </Link>
                                        </div>
                                    </>
                                )}

                                <div className="dropDownItem">
                                    <div
                                        onClick={handleSignOut}
                                        className="navLinkDropdown"
                                    >
                                        Cerrar Sesión
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <Link to="/signin" className="navLink ">
                            Iniciar Sesión
                        </Link>
                        <Link to="/signup" className="navLink">
                            Registrarse
                        </Link>
                    </>
                )}
                <DarkModeSwitch />
            </div>

            {/* Dropdown responsive right */}
            <div className="lg:hidden flex w-fit justify-self-end justify-center items-center mr-4">
                <div className="inline-block relative">
                    <button
                        className="btnPrimary py-2 px-4 w-fit border-none"
                        onMouseEnter={handleMouseEnterResponsive}
                        onMouseLeave={handleMouseLeaveResponsive}
                    >
                        <GrMenu size="2rem" />
                    </button>

                    <div
                        onMouseEnter={handleMouseEnterResponsive}
                        onMouseLeave={handleMouseLeaveResponsive}
                        className={`"z-20 bg-secondaryLight dark:bg-secondary border border-secondaryBorderLight dark:border-secondaryBorder rounded-md w-40 left-[-6rem] top-[3rem] text-center" ${
                            showDropdownResponsive ? "block" : "hidden"
                        }`}
                        style={{ position: "absolute" }}
                    >
                        <div className="dropDownItem ">
                            <Link to="/" className="navLinkDropdown">
                                Home
                            </Link>
                        </div>
                        <div className="dropDownItem">
                            <Link to="/reviews" className="navLink">
                                Reviews
                            </Link>
                        </div>
                        <div className="dropDownItem">
                            <Link to="/about" className="navLink">
                                Nosotros
                            </Link>
                        </div>
                        {isLogin ? (
                            <>
                                <div className="dropDownItem border-t-2  border-secondaryBorderLight dark:border-secondaryBorder">
                                    <Link
                                        className="navLinkDropdown"
                                        to="/tickets"
                                    >
                                        Mis tickets
                                    </Link>
                                </div>
                                {userData.accessType === "producer" && (
                                    <>
                                        <div className="dropDownItem">
                                            <Link
                                                className="navLinkDropdown"
                                                to="/create"
                                            >
                                                Crear evento
                                            </Link>
                                        </div>
                                        <div className="dropDownItem border-b-2  border-secondaryBorderLight dark:border-secondaryBorder">
                                            <Link
                                                className="navLinkDropdown"
                                                to="/dashboard"
                                            >
                                                Dashboard
                                            </Link>
                                        </div>
                                    </>
                                )}
                                <div className="dropDownItem">
                                    <div
                                        onClick={handleSignOut}
                                        className="navLinkDropdown"
                                    >
                                        Cerrar Sesión
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="dropDownItem border-t-2  border-secondaryBorderLight dark:border-secondaryBorder">
                                    <Link
                                        to="/signin"
                                        className="navLinkDropdown "
                                    >
                                        Iniciar Sesión
                                    </Link>
                                </div>
                                <div className="dropDownItem">
                                    <Link
                                        to="/signup"
                                        className="navLinkDropdown"
                                    >
                                        Registrarse
                                    </Link>
                                </div>
                            </>
                        )}
                        <div className="dropDownItem border-t-2  border-secondaryBorderLight dark:border-secondaryBorder">
                            <DarkModeSwitch
                                blockType="true"
                                size="1.3rem"
                                text="Modo"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isLogin: state.isLogin,
        userData: state.userData,
        searchBar: state.searchBar,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut()),
        searchEvents: (name) => dispatch(searchEvents(name)),
        setAllEventsOnHomeEvents: () => dispatch(setAllEventsOnHomeEvents()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
