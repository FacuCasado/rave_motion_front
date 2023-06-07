/* =======================================================
    VIEW ProducerEventDetail - "/dashboard/:eventName" - Vista de eventos para producers (detalle de ventas, etc)

    styles:
    Detalle de ventas de tickets y graficos 
    
*/

// Hooks
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Redux
import { connect } from "react-redux";

// React Router Dom
import { Link } from "react-router-dom";

// Components
import EventDate from "../../components/EventDate";
import Loading from "../../components/Loading";
import ProducerEventKeys from "../../components/ProducerEventKeys";
import Tooltip from "../../components/Tooltip";

// Assets
import { AiOutlineCalendar } from "react-icons/ai";
import {
    MdDeleteOutline,
    MdArrowBackIos,
    MdOutlineDashboardCustomize,
} from "react-icons/md";
import { HiMenu } from "react-icons/hi";

// Axios
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const ProducerEventDetail = ({ eventId, userData, setShowAside }) => {
    // Get event dashboard detail
    const [event, setEvent] = useState({});

    const navigate = useNavigate();
    useEffect(() => {
        const getEventsDetail = async () => {
            const response = await axios.get(
                `${BACKEND_URL}/tickets/sellstickets/${userData.id}`
            );

            const dataFiltered = response.data.filter(
                (event) => event.eventId === eventId
            );

            if (dataFiltered[0].eventId !== eventId) {
                navigate("/dashboard");
            } else {
                setEvent(dataFiltered[0]);
            }
        };
        getEventsDetail();
    }, [eventId]);

    // Tickets y sort
    const [sortedTickets, setSortedTickets] = useState([]);
    const [sort, setSort] = useState("priceLower");

    const handleTicketsSort = (event) => {
        const sortBy = event.target.value;
        const sortedArray = [...sortedTickets];
        setSort(sortBy);
        switch (sortBy) {
            case "priceLower":
                sortedArray.sort((a, b) => a.price - b.price);
                break;
            case "priceHigher":
                sortedArray.sort((a, b) => b.price - a.price);
                break;
            case "sellsLower":
                sortedArray.sort((a, b) => a.sells - b.sells);
                break;
            case "sellsHigher":
                sortedArray.sort((a, b) => b.sells - a.sells);
                break;
            case "alphabeticalAsc":
                sortedArray.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "alphabeticalDesc":
                sortedArray.sort((a, b) => b.name.localeCompare(a.name));
                break;
            default:
                break;
        }
        setSortedTickets(sortedArray);
    };

    // Keys del event calculos
    const [maxTickets, setMaxTickets] = useState(0);
    const [daysToDate, setDaysToDate] = useState(null);

    useEffect(() => {
        // Seteo de tickets
        setSortedTickets(event?.tickets?.sort((a, b) => a.price - b.price));

        // Calculo max tickets
        let sum = 0;
        for (let i = 0; i < event?.tickets?.length; i++) {
            sum += event.tickets[i].maxq;
        }
        setMaxTickets(sum);

        // Calculo dias para el evento
        let dateHour = new Date(
            `${event?.date?.slice(0, 10)}T${event?.hour}.000Z`
        );
        dateHour.setHours(dateHour.getHours() + 3);

        const daysToEvent = Math.floor(
            (dateHour - new Date()) / (1000 * 60 * 60 * 24)
        );
        setDaysToDate(daysToEvent);
    }, [event]);

    return (
        <section className="flex flex-col w-full lg:w-5/6 px-4 lg:px-8 lg:py-4">
            {event.events ? (
                <>
                    {/* Seccion nombre y fecha */}
                    <>
                        {/* Nav  */}
                        <nav className="hidden lg:flex flex-row place-content-between w-full h-16 ">
                            <div className="flex justify-self-start items-center">
                                <span className="text-4xl font-semibold">
                                    {event.events}
                                </span>
                            </div>

                            <div className="flex justify-self-end items-center">
                                <Tooltip tooltip="Ir al dashboard">
                                    <Link
                                        to="/dashboard"
                                        className="flex flex-row btnPrimary items-center px-4 py-1 w-fit"
                                    >
                                        <MdArrowBackIos size="1.8rem" />
                                        <MdOutlineDashboardCustomize size="2rem" />
                                    </Link>
                                </Tooltip>
                            </div>
                        </nav>

                        {/* Nav Responsive */}
                        <nav className="grid grid-cols-2 w-full h-16 items-center lg:hidden my-4">
                            <div className="flex lg:hidden justify-self-start items-center">
                                <button
                                    className="block lg:hidden px-4 py-0 w-fit"
                                    onClick={() => setShowAside(true)}
                                >
                                    <HiMenu size="3rem" />
                                </button>
                            </div>

                            <div className="flex justify-self-end items-center">
                                <Link
                                    to="/dashboard"
                                    className="flex flex-row btnPrimary items-center px-4 py-1 w-fit"
                                >
                                    <MdArrowBackIos size="1.8rem" />
                                    <MdOutlineDashboardCustomize size="2rem" />
                                </Link>
                            </div>
                        </nav>

                        <div className="flex lg:hidden justify-self-start items-center my-4">
                            <span className="text-2xl font-semibold">
                                {event.events}
                            </span>
                        </div>

                        <div className="flex flex-row w-full items-center justify-start gap-2 text-fuchsia-600 dark:text-fuchsia-400 font-semibold my-2">
                            <AiOutlineCalendar size="1.2rem" />
                            <span className="text-base">
                                <EventDate
                                    date={event.date}
                                    hour={event.hour}
                                    hyphen={true}
                                />
                            </span>
                        </div>
                    </>

                    {/* Indicadores evento */}
                    <ProducerEventKeys
                        totalSeLLs={event.totalAmount}
                        totalTicketsSells={event.totalTicketSells}
                        maxTickets={maxTickets}
                        daysToDate={daysToDate}
                    />

                    {/* NavBar tickets */}
                    <nav className="flex flex-row place-content-between w-full h-16 mt-8 items-center">
                        <div className="flex justify-self-start items-center">
                            <span className="text-2xl lg:text-4xl font-semibold">
                                Tickets
                            </span>
                        </div>

                        <div className="flex justify-self-end items-center gap-2">
                            <label
                                htmlFor="sort"
                                className="font-semibold text-lg"
                            >
                                Ordenar:
                            </label>
                            <select
                                className="inputSelect bg-secondaryLight dark:bg-secondary border-secondaryBorderLight dark:border-secondaryBorder dark:text-text w-fit"
                                onChange={handleTicketsSort}
                                value={sort}
                                name="sort"
                            >
                                <option value="priceLower">Menor precio</option>
                                <option value="priceHigher">
                                    Mayor precio
                                </option>
                                <option value="sellsLower">
                                    Menores ventas
                                </option>
                                <option value="sellsHigher">
                                    Mayores ventas
                                </option>
                                <option value="alphabeticalAsc">
                                    Nombre A-Z
                                </option>
                                <option value="alphabeticalDesc">
                                    Nombre Z-A
                                </option>
                            </select>
                        </div>
                    </nav>

                    {/* Tickets */}
                    <div className="overflow-y-auto overflow-x-hidden mt-4 s">
                        <table className="w-full text-start border bg-secondaryLight dark:bg-secondary border-secondaryBorderLight dark:border-secondaryBorder mx-2 my-4 mb-8">
                            <thead className="sticky top-0 z-40 bg-secondaryLight dark:bg-secondary font-semibold">
                                <tr className="relative">
                                    <th
                                        scope="col"
                                        className="px-2 py-6 text-start"
                                    >
                                        Nombre
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-2 py-6 text-start"
                                    >
                                        Precio
                                    </th>

                                    <th
                                        scope="col"
                                        className="px-2 py-6 text-center hidden lg:table-cell"
                                    >
                                        Ventas
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-2 py-6 text-center hidden lg:table-cell"
                                    >
                                        Facturación
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-2 py-6 text-center"
                                    >
                                        Disponibles
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-2 py-6 text-center"
                                    >
                                        Opciones
                                    </th>
                                </tr>
                                <th className="absolute bottom-0 left-0 w-full h-1 bg-fuchsia-600"></th>
                            </thead>
                            <tbody className="">
                                {sortedTickets?.length ? (
                                    sortedTickets.map((ticket) => (
                                        <tr
                                            className="border-b"
                                            key={ticket.id}
                                        >
                                            <td
                                                scope="row"
                                                className={`px-2 py-4 font-semibold`}
                                            >
                                                {ticket.name}
                                            </td>
                                            <td className={`px-2 py-4 `}>
                                                $
                                                {ticket.price.toLocaleString(
                                                    "es"
                                                )}
                                            </td>

                                            <td
                                                className={`px-2 py-4 text-center hidden lg:table-cell`}
                                            >
                                                {ticket.sells}
                                            </td>

                                            <td className="px-2 py-4 text-center hidden lg:table-cell">
                                                $
                                                {ticket.totalAmount.toLocaleString(
                                                    "es"
                                                )}
                                            </td>

                                            <td className="px-2 py-4 text-center">
                                                <span className="font-semibold">
                                                    {ticket.maxq - ticket.sells}
                                                </span>{" "}
                                                / {ticket.maxq}
                                            </td>

                                            <td className="px-2 py-4">
                                                <div className="flex flex-row gap-6 justify-center items-center">
                                                    <Tooltip
                                                        tooltip={
                                                            ticket.sells
                                                                ? "El ticket ya tiene ventas"
                                                                : "Borrar ticket (Proximamente)"
                                                        }
                                                        x={
                                                            ticket.sells
                                                                ? "150"
                                                                : "150"
                                                        }
                                                    >
                                                        <button
                                                            disabled={
                                                                ticket.sells
                                                            }
                                                            className="cursor-not-allowed"
                                                        >
                                                            <MdDeleteOutline
                                                                size="1.5rem"
                                                                className="text-red-600"
                                                            />
                                                        </button>
                                                    </Tooltip>
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
                </>
            ) : (
                <div className="flex flex-col h-screen">
                    <Loading />
                </div>
            )}
        </section>
    );
};

const mapStateToProps = (state) => {
    return {
        userData: state.userData,
    };
};

export default connect(mapStateToProps, null)(ProducerEventDetail);
