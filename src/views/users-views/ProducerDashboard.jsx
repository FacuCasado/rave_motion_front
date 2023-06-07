/* =======================================================
VIEW ProducerDashboard - "/dashboard" - Vista para producers

styles:
listado de events con acciones (edit, remove, detail)

* editar lleva a /create con los campos actuales en props
* remove hace borrado logico con el backend
* detail lleva a "/dashboard/:eventName"
*/

// Hooks
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import {
    getUserEventsByUserId,
    searchUserEvents,
    filterEventsByCurrent,
} from "../../redux/actions/usersActions";

// React Router Dom
import { Link } from "react-router-dom";

// Assets

import { FaRegEye } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { HiMenu } from "react-icons/hi";

// Components
import DashboardAside from "../../components/DashboardAside";
import EventDate from "../../components/EventDate";
import EventDelete from "../../components/EventDelete";
import EventTickets from "../../components/EventTickets";
import ProducerKeys from "../../components/ProducerKeys";
import Tooltip from "../../components/Tooltip";

// Views
import ProducerEventDetail from "./ProducerEventDetail";

// Const
import { FILTER_EVENTS_BY_DATE, DASHBOARD_VIEWS } from "../../const";
const { ACTIVES, PASS, ALL } = FILTER_EVENTS_BY_DATE;

// Axios
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const ProducerDashboard = (props) => {
    // Props
    const { userData, userEvents } = props;
    const { getUserEventsByUserId, searchUserEvents, filterEventsByCurrent } =
        props;

    // Seteo de view dependiendo la url
    const [view, setView] = useState(DASHBOARD_VIEWS.DASHBOARD);

    const { eventId } = useParams();
    useEffect(() => {
        const getParamAndSearchEvent = async () => {
            if (eventId) {
                try {
                    const response = await axios.get(
                        `${BACKEND_URL}/events/${eventId}`
                    );

                    const eventExist =
                        response.data.name &&
                        response.data.userId === userData.id;
                    if (eventExist) {
                        setView(DASHBOARD_VIEWS.EVENT_DETAIL);
                    } else {
                        setView(DASHBOARD_VIEWS.EVENT_NOT_FOUND);
                    }
                } catch (error) {
                    setView(DASHBOARD_VIEWS.EVENT_NOT_FOUND);
                }
            } else {
                setView(DASHBOARD_VIEWS.DASHBOARD);
            }
        };
        getParamAndSearchEvent();
    }, [eventId, userData]);

    // Events by UserId
    useEffect(() => {
        userData?.id && getUserEventsByUserId(userData.id);
        setFilterByDate(filterByDate);
    }, [userData, getUserEventsByUserId]);

    // Search on dashboard
    const [search, setSeach] = useState("");

    // Busca eventos
    const handleInputChange = (event) => {
        setSeach(event.target.value);
        searchUserEvents(event.target.value);
        event.target.value === "" && getUserEventsByUserId(userData.id);
    };

    // Filter events
    const [filterByDate, setFilterByDate] = useState(ACTIVES);

    const handleFilter = (event) => {
        setFilterByDate(event.target.value);
        filterEventsByCurrent(event.target.value);
    };

    // Responsive
    // Responsive
    const [showAside, setShowAside] = useState(false);

    useEffect(() => {
        if (showAside) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [showAside]);

    return (
        <div className="w-screen min-h-screen lg:h-screen flex flex-col lg:flex-row overflow-scroll">
            {/* Aside Menu */}
            <DashboardAside showAside={showAside} setShowAside={setShowAside} />

            {/* Content */}
            {view === DASHBOARD_VIEWS.DASHBOARD ? (
                <section className="flex flex-col w-full lg:w-5/6 px-4 lg:px-8 py-4">
                    {/* NavBar */}
                    <nav className="grid grid-cols-3 w-full h-16 items-center">
                        <div className="flex lg:hidden justify-self-start items-center">
                            <button
                                className="block lg:hidden px-4 py-0 w-fit"
                                onClick={() => setShowAside(true)}
                            >
                                <HiMenu size="3rem" />
                            </button>
                        </div>

                        <div className="flex justify-self-center lg:justify-self-start items-center">
                            <span className="text-4xl font-semibold">
                                Overview
                            </span>
                        </div>
                        <div className="hidden lg:flex justify-self-center items-center">
                            <input
                                className="input w-96 bg-secondaryLight dark:bg-secondary border-secondaryBorderLight dark:border-secondaryBorder dark:text-text"
                                type="text"
                                placeholder="Buscar evento"
                                onChange={handleInputChange}
                                value={search}
                            />
                        </div>
                        <div className="flex justify-self-end items-center">
                            <button
                                disabled={true}
                                className="disabled:cursor-not-allowed"
                            >
                                <MdOutlineNotificationsNone size="2.5rem" />
                            </button>
                        </div>
                    </nav>

                    {/* Search Responsive */}
                    <div className="flex lg:hidden w-full justify-self-center items-center my-4">
                        <input
                            className="input w-full bg-secondaryLight dark:bg-secondary border-secondaryBorderLight dark:border-secondaryBorder dark:text-text"
                            type="text"
                            placeholder="Buscar evento"
                            onChange={handleInputChange}
                            value={search}
                        />
                    </div>

                    {/* Indicadores */}
                    <ProducerKeys userId={userData.id} />

                    {/* Eventos */}
                    {/* Navbar eventos */}
                    <nav className="grid grid-cols-2 w-full h-16 mt-8">
                        <div className="flex justify-self-start items-center">
                            <span className="text-2xl lg:text-4xl font-semibold">
                                Tus eventos
                            </span>
                        </div>

                        <div className="flex justify-self-end items-center">
                            <select
                                className="inputSelect bg-secondaryLight dark:bg-secondary border-secondaryBorderLight dark:border-secondaryBorder dark:text-text w-fit"
                                onChange={handleFilter}
                                value={filterByDate}
                            >
                                <option value={ACTIVES}>Eventos activos</option>
                                <option value={PASS}>Eventos pasados</option>
                                <option value={ALL}>Todos los eventos</option>
                            </select>
                        </div>
                    </nav>
                    {/* Events */}
                    <div className="overflow-hidden overflow-y-auto mt-4">
                        <table className="w-full mx-0 table-fixed text-start bg-secondaryLight dark:bg-secondary border-secondaryBorderLight dark:border-secondaryBorder lg:mx-2 my-4 mb-8">
                            <thead className="font-semibold border-b-4 border-fuchsia-600">
                                <tr className="">
                                    <th
                                        scope="col"
                                        className="px-2 py-6 text-start"
                                    >
                                        Nombre
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-2 py-6 text-center hidden lg:table-cell"
                                    >
                                        Fecha
                                    </th>

                                    <th
                                        scope="col"
                                        className="px-2 py-6 text-center"
                                    >
                                        Tickets vendidos
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-2 py-6 text-center hidden lg:table-cell"
                                    >
                                        Opciones tickets
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-2 py-6 text-center"
                                    >
                                        Opciones evento
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {userEvents ? (
                                    userEvents.map((event) => (
                                        <tr className="border-b" key={event.id}>
                                            <td
                                                scope="row"
                                                className="px-2 py-4 font-semibold text-start"
                                            >
                                                <Link
                                                    to={`/dashboard/${event.id}`}
                                                    className="link"
                                                >
                                                    <Tooltip tooltip="Ver detalle de ventas">
                                                        {event.name}
                                                    </Tooltip>
                                                </Link>
                                            </td>
                                            <td className="px-2 py-4 text-center hidden lg:table-cell">
                                                <EventDate
                                                    date={event.date}
                                                    hour={event.hour}
                                                />
                                            </td>

                                            <td className="px-2 py-4 text-center">
                                                <EventTickets
                                                    tickets={event.Tickets}
                                                />
                                            </td>

                                            <td className="px-2 py-4 justify-center hidden lg:table-cell">
                                                <div className="flex flex-row gap-6 items-center justify-center">
                                                    <Tooltip tooltip="Proximamente">
                                                        <span className="link cursor-not-allowed">
                                                            Modificar tickets
                                                        </span>
                                                    </Tooltip>
                                                </div>
                                            </td>

                                            <td className="px-2 py-4">
                                                <div className="flex flex-row gap-6 justify-center items-center">
                                                    <Link
                                                        to={`/create/${event.id}`}
                                                        className="link"
                                                    >
                                                        <Tooltip tooltip="Modificar evento">
                                                            <FiSettings size="1.5rem" />
                                                        </Tooltip>
                                                    </Link>
                                                    <Link
                                                        to={`/event/${event.id}`}
                                                        className="link"
                                                    >
                                                        <Tooltip tooltip="Ver evento">
                                                            <FaRegEye size="1.5rem" />
                                                        </Tooltip>
                                                    </Link>
                                                    <EventDelete
                                                        tickets={event.Tickets}
                                                        eventId={event.id}
                                                        eventName={event.name}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            ) : view === DASHBOARD_VIEWS.EVENT_DETAIL ? (
                <ProducerEventDetail
                    eventId={eventId}
                    setShowAside={setShowAside}
                />
            ) : (
                <div className="flex flex-col w-full lg:w-5/6 px-4 lg:px-8 lg:py-4">
                    <div className="flex flex-col w-full h-full items-center justify-center">
                        <h2 className="font-bold text-center text-6xl">
                            LO SENTIMOS
                        </h2>
                        <h3 className="text-2xl text-center ">
                            No se a encontrado el evento.
                        </h3>
                        <div className="text-center flex-row text-2xl mt-4 ">
                            Volver al{" "}
                            <Link className="link" to="/dashboard">
                                dashboard.
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        userData: state.userData,
        userEvents: state.userEvents,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUserEventsByUserId: (userId) =>
            dispatch(getUserEventsByUserId(userId)),
        searchUserEvents: (name) => dispatch(searchUserEvents(name)),
        filterEventsByCurrent: (filter) =>
            dispatch(filterEventsByCurrent(filter)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProducerDashboard);
