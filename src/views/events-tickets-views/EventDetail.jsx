/* =======================================================
VIEW EventDetail - "/event/:eventName" - Vista a la que redirección al tocar un evento
*/
// Axios
import axios from "axios";

// Backend URL
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Hooks
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import {
    getEventById,
    removeEventDetail,
} from "../../redux/actions/eventsActions";
import { fillCart } from "../../redux/actions/usersTicketsActions";

// Assets
import { AiOutlineCalendar } from "react-icons/ai";
import { ImLocation2 } from "react-icons/im";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

// Scroll
import { Link as ScrollLink } from "react-scroll";

// Components
import EventDate from "../../components/EventDate";
import Loading from "../../components/Loading";
import SelectTickets from "../../components/SelectTickets";

const EventDetail = (props) => {
    const { eventDetail, getEventById, fillCart, removeEventDetail, userData } =
        props;
    const { id } = useParams();

    const navigate = useNavigate();
    useEffect(() => {
        getEventById(id);

        return () => {
            removeEventDetail();
        };
    }, [getEventById, id, removeEventDetail]);

    // Disponibilidad y valor minimo
    const availability = () => {
        const tickets = eventDetail.Tickets;

        const ticketsSells = tickets?.filter((t) => t.sells < t.maxQuantity);

        if (!ticketsSells?.length) {
            return "No quedan más entradas para este evento.";
        } else {
            return "Entradas disponibles";
        }
    };

    const tickets = eventDetail.Tickets;
    const ticketsMinPrice = () => {
        const ticketsSells = tickets
            ?.filter((t) => t.sells < t.maxQuantity)
            ?.map((t) => t.price);

        const minPrice = Math.min.apply(null, ticketsSells);
        return minPrice !== Infinity
            ? ` desde $${minPrice.toLocaleString("es")}.`
            : null;
    };

    const disponibles = availability();
    const minPrice = ticketsMinPrice();

    // Carrito de compra del evento
    const [selectedTickets, setSelectedTickets] = useState({});
    const [error, setError] = useState("");

    const handleTicketSelect = (event) => {
        const { id, value } = event.target;

        setSelectedTickets((prevState) => ({
            ...prevState,
            [id]: {
                quantity: Number(value),
                price: tickets.find((ticket) => ticket.id === id).price,
            },
        }));
    };

    const buyTickets = () => {
        fillCart(selectedTickets);
        navigate(`/cart/${eventDetail.id}`);
    };

    // Calculo de totales
    const [total, setTotal] = useState(0);
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        let total = 0;
        let quantity = 0;
        for (const ticket in selectedTickets) {
            total +=
                selectedTickets[ticket].price *
                selectedTickets[ticket].quantity;
            quantity += selectedTickets[ticket].quantity;
        }
        setTotal(total);
        setQuantity(quantity);
        if (quantity > 4)
            setError("La cantidad máxima de compra es de 4 tickets.");
        else setError("");
    }, [selectedTickets]);

    return (
        <div className="w-screen">
            {/* Pantalla 1 -> Event Detail */}
            <div className="h-screen" id="event">
                {/* Separador del header */}
                <div className="h-16"></div>

                {/* Float Box con detalle y flecha */}
                <div className="my-auto min-h-[calc(100vh_-_4rem)] flex flex-col justify-center ">
                    {/* Detalle */}
                    <div className="floatBox w-full md:w-2/3 h-fit mx-auto overflow-hidden font-sans bg-secondary">
                        {eventDetail.name ? (
                            <div className="h-full w-full flex flex-col">
                                {/* Name */}
                                <div className="flex flex-row w-full items-center justify-center pb-4 border-b border-secondaryBorder">
                                    <h2 className="text-2xl md:text-4xl align-center font-semibold">
                                        {eventDetail.name}
                                    </h2>
                                </div>

                                {/* Image y data */}
                                <div className="flex flex-col md:flex-row w-full pt-4 items-center">
                                    {/* Image */}
                                    <div className=" w-4/5 md:w-2/5 aspect-square rounded-xl">
                                        <div
                                            className="h-full w-full rounded-xl bg-cover bg-bottom bg-no-repeat"
                                            style={{
                                                backgroundImage: `url(${eventDetail.image})`,
                                            }}
                                            loading="lazy"
                                        ></div>
                                    </div>

                                    <div className="w-full md:w-2/3 flex flex-col pl-4">
                                        <div className="flex flex-row items-center justify-start mt-4 md:mt-0 pb-4 gap-2 border-b border-secondaryBorder text-fuchsia-600 font-semibold text-xl">
                                            <AiOutlineCalendar size="1.75rem" />
                                            <span className="">
                                                <EventDate
                                                    date={eventDetail.date}
                                                    hour={eventDetail.hour}
                                                    hyphen="true"
                                                />
                                            </span>
                                        </div>
                                        <div className="flex flex-row items-center justify-start py-4 gap-2 border-b border-secondaryBorder">
                                            <ImLocation2 size="1.3rem" />
                                            <span>
                                                <span className="font-semibold">
                                                    {eventDetail.producer}
                                                </span>{" "}
                                                - {eventDetail.venue}
                                            </span>
                                        </div>
                                        <div className="flex flex-col items-center justify-start py-4 gap-2  border-b border-secondaryBorder">
                                            <span className="w-full font-semibold">
                                                DESCRIPCIÓN
                                            </span>
                                            <span className="w-full ">
                                                {eventDetail.description}
                                            </span>
                                        </div>
                                        <div className="flex flex-row items-center justify-start py-4 gap-2  border-b border-secondaryBorder">
                                            {disponibles}
                                            {minPrice}
                                        </div>
                                        <div className="flex flex-row items-center justify-start pt-4 px-8">
                                            <ScrollLink
                                                to="tickets"
                                                smooth={true}
                                                duration={200}
                                                className="w-full"
                                            >
                                                <button className="btnPrimary">
                                                    Comprar
                                                </button>
                                            </ScrollLink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Loading />
                        )}
                    </div>

                    {/* Flecha abajo */}
                    <div className="flex flex-row w-full items-center justify-center py-4 gap-2 lg:gap-6 text-2xl text-fuchsia-600 font-semibold">
                        <ScrollLink to="tickets" smooth={true} duration={500}>
                            <FaArrowDown size="3rem" className="" />
                        </ScrollLink>
                        <ScrollLink to="tickets" smooth={true} duration={500}>
                            <span>TICKETS DEL EVENTO</span>
                        </ScrollLink>
                    </div>
                </div>
            </div>

            {/* Pantalla 2 -> Event Tickets*/}
            <div className="min-h-[calc(100vh_-_7rem)]" id="tickets">
                {/* Separador del header */}
                <div className="h-16"></div>

                {/* Flecha arriba */}
                <div className="flex flex-row w-full items-center justify-center py-4 gap-2 text-2xl text-fuchsia-600 font-semibold">
                    <ScrollLink to="event" smooth={true} duration={500}>
                        <span>DETALLE DEL EVENTO</span>
                    </ScrollLink>
                    <ScrollLink to="event" smooth={true} duration={500}>
                        <FaArrowUp size="3rem" className="" />
                    </ScrollLink>
                </div>

                {/* Float Box con tickets */}
                <div className="my-auto  flex flex-col justify-center ">
                    {/* Header tickets */}
                    <div className="floatBox md:w-2/3 h-fit mx-auto overflow-hidden font-sans bg-secondary">
                        {tickets?.length ? (
                            <>
                                <div className="flex flex-row w-full items-center justify-center pb-4 border-b border-secondaryBorder">
                                    <h2 className="text-4xl align-center font-semibold">
                                        Tickets:
                                    </h2>
                                </div>
                                {/* Tabla de tickets */}
                                <div className="flex flex-col w-full items-center justify-center pb-4 ">
                                    <table className="w-full text-start table-fixed">
                                        <thead className="font-semibold border-b-4 border-fuchsia-600">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="px-2 py-3 text-start"
                                                >
                                                    Nombre
                                                </th>

                                                <th
                                                    scope="col"
                                                    className="px-2 py-3 text-center"
                                                >
                                                    Tipo de acceso
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-2 py-3 text-center"
                                                >
                                                    Precio
                                                </th>
                                                {userData.id ===
                                                    eventDetail.userId ||
                                                !eventDetail.current ? (
                                                    <></>
                                                ) : (
                                                    <th
                                                        scope="col"
                                                        className="px-2 py-3 text-center"
                                                    >
                                                        Cantidad
                                                    </th>
                                                )}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {tickets?.map((ticket) => (
                                                <tr
                                                    className="border-b"
                                                    key={ticket.id}
                                                >
                                                    <td className="px-2 py-4">
                                                        {ticket.name}
                                                    </td>
                                                    <td className="px-2 py-4 text-center">
                                                        {ticket.accessType}
                                                    </td>

                                                    <td className="px-2 py-4 text-center">
                                                        $
                                                        {ticket.price.toLocaleString(
                                                            "es"
                                                        )}
                                                    </td>
                                                    {userData.id ===
                                                        eventDetail.userId ||
                                                    !eventDetail.current ? (
                                                        <></>
                                                    ) : (
                                                        <td className="px-2 py-4 text-center">
                                                            <SelectTickets
                                                                ticket={ticket}
                                                                handleTicketSelect={
                                                                    handleTicketSelect
                                                                }
                                                                selectedTickets={
                                                                    selectedTickets
                                                                }
                                                            />
                                                        </td>
                                                    )}
                                                </tr>
                                            ))}
                                            {userData.id ===
                                                eventDetail.userId ||
                                            !eventDetail.current ? (
                                                <></>
                                            ) : (
                                                <tr
                                                    className="font-semibold border-t-4 border-fuchsia-600 rounded-md"
                                                    key="sum"
                                                >
                                                    <td className="px-2 py-4">
                                                        <button
                                                            className="btnPrimary"
                                                            onClick={buyTickets}
                                                            disabled={
                                                                error ||
                                                                userData.id ===
                                                                    eventDetail.userId ||
                                                                total === 0
                                                            }
                                                        >
                                                            Comprar
                                                        </button>
                                                    </td>
                                                    <td className="px-2 py-4 text-end">
                                                        Total:
                                                    </td>

                                                    <td className="px-2 py-4 text-center">
                                                        ${" "}
                                                        {total.toLocaleString(
                                                            "es"
                                                        )}
                                                    </td>
                                                    <td className="px-2 py-4 text-center">
                                                        {quantity}
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                    {error && (
                                        <div className="block text-center">
                                            <span className="errorMessage text-lg">
                                                {error}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <Loading />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        userData: state.userData,
        eventDetail: state.eventDetail,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getEventById: (eventId) => dispatch(getEventById(eventId)),
        removeEventDetail: () => dispatch(removeEventDetail()),
        fillCart: (tickets) => dispatch(fillCart(tickets)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventDetail);
