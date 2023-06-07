/* =======================================================
    VIEW UserTickets - "/tickets" - Vista con los tickets del user logeado

    * Vista solo para user logeado

    styles:
    filtro (todos los eventos, eventos pasados, eventos activos) + orden 
    lista de tickets con acciones (detalle de compra, eTicket, reenviar a usuario) 
    
    * Las acciones hacen que aparezcan alerts con el detalle de la accion
    
*/
// Redux
import { connect } from "react-redux";
import {
    getUserTickets,
    filterUserTicketsByCurrent,
} from "../../redux/actions/usersTicketsActions";

// Hooks
import { useEffect, useState } from "react";

// PDF
import { PDFDownloadLink } from "@react-pdf/renderer";

// Components
import EventDate from "../../components/EventDate";
import TicketPdf from "../../components/TicketPdf";

// Assets
import { BsDownload } from "react-icons/bs";
import { EOS_BUBBLE_LOADING_ANIMATED } from "eos-icons-react";

// Const
import { FILTER_EVENTS_BY_DATE } from "../../const";
const { ACTIVES, PASS, ALL } = FILTER_EVENTS_BY_DATE;

const UserTickets = (props) => {
    // Props
    const { userData, userTickets } = props;
    const { getUserTickets, filterUserTicketsByCurrent } = props;

    // Get User Tickets by UserId
    useEffect(() => {
        userData.id && getUserTickets(userData.id);
    }, [userData, getUserTickets]);

    // Filter events
    const [filterByDate, setFilterByDate] = useState(ACTIVES);

    const handleFilter = (event) => {
        setFilterByDate(event.target.value);
        filterUserTicketsByCurrent(event.target.value);
    };

    return (
        <div className="w-screen min-h-[calc(100vh_-_3rem)]">
            <div className="h-16 w-screen block"></div>
            <section className="flex flex-col px-4 lg:px-8 py-4 my-4">
                {/* NavBar */}
                <nav className="grid grid-cols-2 w-full h-16 ">
                    <div className="flex justify-self-start items-center">
                        <span className="text-2xl lg:text-4xl font-semibold pl-1">
                            Tus tickets
                        </span>
                    </div>

                    <div className="flex justify-self-end items-center gap-6">
                        <select
                            className="inputSelect bg-secondaryLight dark:bg-secondary border-secondaryBorderLight dark:border-secondaryBorder dark:text-text w-fit"
                            onChange={handleFilter}
                            value={filterByDate}
                        >
                            <option value={ACTIVES}>Eventos activos</option>
                            <option value={PASS}>Eventos pasados</option>
                            <option value={ALL}>Todos los eventos</option>
                        </select>
                        <div className="bg-slate-500 rounded-full w-12 h-12 flex justify-center items-center text-2xl font-semibold">
                            <span>
                                {userData?.firstName &&
                                    userData.firstName[0].toUpperCase()}
                            </span>
                        </div>
                    </div>
                </nav>

                {/* Tickets */}

                <div className="overflow-auto mt-4 ">
                    <table className="w-full text-start bg-secondaryLight dark:bg-secondary border border-secondaryBorderLight dark:border-secondaryBorder mx-2 my-4 mb-8">
                        <thead className="font-semibold border-b-4 border-fuchsia-600">
                            <tr className="">
                                <th
                                    scope="col"
                                    className="px-2 py-3 text-start"
                                >
                                    Evento
                                </th>
                                <th
                                    scope="col"
                                    className="px-2 py-3 text-start"
                                >
                                    Fecha
                                </th>

                                <th
                                    scope="col"
                                    className="px-2 py-3 text-center"
                                >
                                    Tickets
                                </th>
                                <th
                                    scope="col"
                                    className="px-2 py-3 text-center"
                                >
                                    Descargar
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {userTickets?.length ? (
                                userTickets.map((ticket) => (
                                    <tr className="border-b" key={ticket.id}>
                                        <td
                                            scope="row"
                                            className="px-2 py-4 font-semibold"
                                        >
                                            {ticket.Event.name}
                                        </td>
                                        <td className="px-2 py-4">
                                            <EventDate
                                                date={ticket.Event.date}
                                                hour={"23:59:00"}
                                            />
                                        </td>
                                        <td className="px-2 py-4 text-center">
                                            {ticket.Ticket.name} -{" "}
                                            {ticket.Ticket.accessType}
                                        </td>
                                        <td className="px-2 py-4 justify-center">
                                            <div className="flex flex-row gap-6 items-center justify-center">
                                                <button className="btnPrimary px-2 w-fit">
                                                    <PDFDownloadLink
                                                        document={
                                                            <TicketPdf
                                                                ticket={ticket}
                                                            />
                                                        }
                                                        fileName={ticket.id}
                                                    >
                                                        {({
                                                            blob,
                                                            url,
                                                            loading,
                                                            error,
                                                        }) =>
                                                            loading ? (
                                                                <EOS_BUBBLE_LOADING_ANIMATED color="white" />
                                                            ) : (
                                                                <BsDownload />
                                                            )
                                                        }
                                                    </PDFDownloadLink>
                                                </button>
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
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        userData: state.userData,
        userTickets: state.userTickets,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUserTickets: (userId) => dispatch(getUserTickets(userId)),
        filterUserTicketsByCurrent: (filter) =>
            dispatch(filterUserTicketsByCurrent(filter)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserTickets);
