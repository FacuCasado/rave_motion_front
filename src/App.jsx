import { useEffect, useState } from "react";
// React Router Dom
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import { verifyToken } from "./redux/actions/usersActions";
import axios from "axios";

// Components
import Alert from "./components/Alert";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Success from "./components/Success";

// App views
import About from "./views/app-views/About";
import Home from "./views/app-views/Home";
import SearchResults from "./views/app-views/SearchResults";
import NotFound from "./views/app-views/NotFound";
import Reviews from "./views/app-views/Reviews";

// Events views
import EventCart from "./views/events-tickets-views/EventCart";
import EventCreate from "./views/events-tickets-views/EventCreate";
import TicketsCreate from "./views/events-tickets-views/TicketsCreate";
import EventDetail from "./views/events-tickets-views/EventDetail";

// User views
import ChangePassword from "./views/users-views/ChangePassword";
import EmailPassword from "./views/users-views/EmailPassword";
import ProducerDashboard from "./views/users-views/ProducerDashboard";
import SignIn from "./views/users-views/SignIn";
import SignUp from "./views/users-views/SignUp";
import UserTickets from "./views/users-views/UserTickets";

// Secure Routes
import RequireAuth from "./auth/RequireAuth";
import RequireLogin from "./auth/RequireLogin";
import RequireLogOut from "./auth/RequireLogOut";
import Loading from "./components/Loading";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const App = ({ verifyToken, isLogin, globalError, globalSuccess }) => {
    // Locations
    const location = useLocation().pathname;
    const showHeader =
        location !== "/signin" &&
        location !== "/signup" &&
        location.slice(0, 10) !== "/dashboard";
    const showFooter = location.slice(0, 10) !== "/dashboard";

    // Sign In by JSW
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        const loginJWT = async () => {
            const token = localStorage.getItem("token");
            const tokenGoogle = localStorage.getItem("tokenGoogle");
            if ((token || tokenGoogle) && !isLogin) {
                setLoading(true);
                try {
                    if (token && !isLogin) {
                        const response = await axios.post(
                            `${BACKEND_URL}/users/signinsession`,
                            {
                                token: token,
                            }
                        );
                        verifyToken(response.data);
                    }
                    if (tokenGoogle && !isLogin) {
                        const response = await axios.post(
                            `${BACKEND_URL}/users/signinsession`,
                            {
                                token: tokenGoogle,
                            }
                        );
                        verifyToken(response.data);
                    }
                } catch (error) {
                    console.log(error.message);
                } finally {
                    setLoading(false);
                }
            }
            if (isLogin) {
                setLoading(false);
            }
            if (!isLogin && !token && !tokenGoogle) {
                setLoading(false);
                navigate("/signin");
            }
        };
        loginJWT();
    }, []);

    return loading ? (
        <div className="w-screen h-screen bg-primary">
            <Loading />
        </div>
    ) : (
        <div className="bg-primary text-white antialiased overflow-hidden">
            {showHeader && <Header />}
            {globalError && <Alert />}
            {globalSuccess && <Success />}
            <Routes>
                {/* App views */}
                <Route exact path="/" element={<Home />} />
                <Route path="/reviews" element={<Reviews />} />
                <Route path="/about" element={<About />} />
                <Route path="/search" element={<SearchResults />} />

                {/* Events views */}

                <Route path="/event/:id" element={<EventDetail />} />
                {/* Secure Routes */}
                <Route
                    path="/create/:eventId?"
                    element={
                        <RequireAuth>
                            <EventCreate />
                        </RequireAuth>
                    }
                />
                <Route
                    path="/create/tickets/:eventId/"
                    element={
                        <RequireAuth>
                            <TicketsCreate />
                        </RequireAuth>
                    }
                />

                <Route
                    path="/cart/:eventId"
                    element={
                        <RequireLogin>
                            <EventCart />
                        </RequireLogin>
                    }
                />

                {/* User views */}

                <Route
                    path="/changepassword"
                    element={
                        <RequireLogOut>
                            <EmailPassword />
                        </RequireLogOut>
                    }
                />
                <Route
                    path="/changepassword/2"
                    element={
                        <RequireLogOut>
                            <ChangePassword />
                        </RequireLogOut>
                    }
                />
                <Route
                    path="/dashboard/:eventId?"
                    element={
                        <RequireAuth>
                            <ProducerDashboard />
                        </RequireAuth>
                    }
                />

                <Route
                    path="/signin"
                    element={
                        <RequireLogOut>
                            <SignIn />
                        </RequireLogOut>
                    }
                />
                <Route
                    path="/signup"
                    element={
                        <RequireLogOut>
                            <SignUp />
                        </RequireLogOut>
                    }
                />
                <Route
                    path="/tickets"
                    element={
                        <RequireLogin>
                            <UserTickets />
                        </RequireLogin>
                    }
                />

                {/* Not found Page */}
                <Route path="*" element={<NotFound />} />
            </Routes>
            {showFooter && <Footer />}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isLogin: state.isLogin,
        userData: state.userData,
        globalError: state.globalError,
        globalSuccess: state.globalSuccess,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        verifyToken: (token) => dispatch(verifyToken(token)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
