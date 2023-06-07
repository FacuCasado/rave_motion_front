// React Router Dom
import { Link, useNavigate } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import { signOut } from "../redux/actions/usersActions";

// Assets
import { TiHomeOutline } from "react-icons/ti";
import { BsCalendarPlus } from "react-icons/bs";
import { IoTicketOutline } from "react-icons/io5";
import { VscSignOut } from "react-icons/vsc";
import { GoLock } from "react-icons/go";
import {
    MdOutlineDashboardCustomize,
    MdInsertChartOutlined,
    MdArrowBackIos,
} from "react-icons/md";

// Components
import DarkModeSwitch from "./DarkModeSwitch";

const DashboardAside = ({
    userData,
    isLogin,
    signOut,
    showAside,
    setShowAside,
}) => {
    // SignOut

    const navigate = useNavigate();
    const handleSignOutClick = () => {
        isLogin && signOut();
        navigate("/");
    };

    return (
        <>
            {/* Aside */}
            <aside className="hidden lg:block w-1/6 bg-secondaryLight dark:bg-secondary border border-secondaryBorderLight dark:border-secondaryBorder py-4">
                {/* Section logo */}
                <div className="flex w-full px-4 py-2 items-center h-16 gap-2">
                    <div className="bg-slate-500 rounded-full w-12 h-12 flex justify-center items-center text-2xl font-semibold">
                        <span>
                            {userData?.firstName &&
                                userData.firstName[0].toUpperCase()}
                        </span>
                    </div>
                    <div className="flex justify-center items-center text-2xl font-semibold">
                        <span>{userData.firstName}</span>
                    </div>
                </div>

                {/* Section App */}
                <div className="dropDownItem mt-8">
                    <Link className="navLinkDropdown" to="/dashboard">
                        <div className="flex flex-row items-center gap-2">
                            <MdOutlineDashboardCustomize size="1.5rem" />
                            Dashboard
                        </div>
                    </Link>
                </div>
                <div className="dropDownItem ">
                    <Link className="navLinkDropdown" to="/">
                        <div className="flex flex-row items-center gap-2">
                            <TiHomeOutline size="1.5rem" />
                            Home
                        </div>
                    </Link>
                </div>
                <div className="dropDownItem">
                    <DarkModeSwitch blockType="true" />
                </div>

                {/* Section Producer */}
                <div className="dropDownItem mt-8">
                    <Link className="navLinkDropdown">
                        <div className="flex flex-row items-center gap-2">
                            <MdInsertChartOutlined size="1.5rem" />
                            Ventas
                        </div>
                    </Link>
                </div>
                <div className="dropDownItem ">
                    <Link className="navLinkDropdown" to="/create">
                        <div className="flex flex-row items-center gap-2">
                            <BsCalendarPlus size="1.5rem" />
                            Nuevo evento
                        </div>
                    </Link>
                </div>

                {/* Section User */}
                <div className="dropDownItem mt-8">
                    <Link className="navLinkDropdown" to="/tickets">
                        <div className="flex flex-row items-center gap-2">
                            <IoTicketOutline size="1.5rem" />
                            Tus tickets
                        </div>
                    </Link>
                </div>
                <div className="dropDownItem ">
                    <Link className="navLinkDropdown" to="/changepassword">
                        <div
                            className="flex flex-row items-center gap-2"
                            onClick={handleSignOutClick}
                        >
                            <GoLock size="1.5rem" />
                            Cambiar contraseña
                        </div>
                    </Link>
                </div>
                <div className="dropDownItem ">
                    <div className="navLinkDropdown">
                        <div
                            className="flex flex-row items-center gap-2"
                            onClick={handleSignOutClick}
                        >
                            <VscSignOut size="1.5rem" />
                            Cerrar sesión
                        </div>
                    </div>
                </div>
            </aside>

            {/* Aside responsive */}
            {showAside && (
                <aside className="lg:hidden fixed inset-0 z-50 flex bg-secondaryLight dark:bg-secondary bg-opacity-95">
                    <button
                        className="absolute left-4 top-4 flex flex-row btnPrimary items-center px-4 py-1 w-fit"
                        onClick={() => setShowAside(false)}
                    >
                        <MdArrowBackIos size="1.3rem" />
                        Volver
                    </button>
                    <div className="w-full flex flex-col mt-16 px-4 py-8">
                        {/* Section logo */}
                        <div className="flex w-full px-4 py-2 items-center h-16 gap-2">
                            <div className="bg-slate-500 rounded-full w-12 h-12 flex justify-center items-center text-2xl font-semibold">
                                <span>
                                    {userData?.firstName &&
                                        userData.firstName[0].toUpperCase()}
                                </span>
                            </div>
                            <div className="flex justify-center items-center text-2xl font-semibold">
                                <span>{userData.firstName}</span>
                            </div>
                        </div>

                        {/* Section App */}
                        <div className="dropDownItem mt-8">
                            <Link className="navLinkDropdown" to="/dashboard">
                                <div className="flex flex-row items-center gap-2">
                                    <MdOutlineDashboardCustomize size="1.5rem" />
                                    Dashboard
                                </div>
                            </Link>
                        </div>
                        <div className="dropDownItem ">
                            <Link className="navLinkDropdown" to="/">
                                <div className="flex flex-row items-center gap-2">
                                    <TiHomeOutline size="1.5rem" />
                                    Home
                                </div>
                            </Link>
                        </div>
                        <div className="dropDownItem">
                            <DarkModeSwitch blockType="true" />
                        </div>

                        {/* Section Producer */}
                        <div className="dropDownItem mt-8">
                            <Link className="navLinkDropdown">
                                <div className="flex flex-row items-center gap-2">
                                    <MdInsertChartOutlined size="1.5rem" />
                                    Ventas
                                </div>
                            </Link>
                        </div>
                        <div className="dropDownItem ">
                            <Link className="navLinkDropdown" to="/create">
                                <div className="flex flex-row items-center gap-2">
                                    <BsCalendarPlus size="1.5rem" />
                                    Nuevo evento
                                </div>
                            </Link>
                        </div>

                        {/* Section User */}
                        <div className="dropDownItem mt-8">
                            <Link className="navLinkDropdown" to="/tickets">
                                <div className="flex flex-row items-center gap-2">
                                    <IoTicketOutline size="1.5rem" />
                                    Tus tickets
                                </div>
                            </Link>
                        </div>
                        <div className="dropDownItem ">
                            <Link
                                className="navLinkDropdown"
                                to="/changepassword"
                            >
                                <div className="flex flex-row items-center gap-2">
                                    <GoLock size="1.5rem" />
                                    Cambiar contraseña
                                </div>
                            </Link>
                        </div>
                        <div className="dropDownItem ">
                            <div className="navLinkDropdown">
                                <div
                                    className="flex flex-row items-center gap-2"
                                    onClick={handleSignOutClick}
                                >
                                    <VscSignOut size="1.5rem" />
                                    Cerrar sesión
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>
            )}
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        userData: state.userData,
        isLogin: state.isLogin,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardAside);
