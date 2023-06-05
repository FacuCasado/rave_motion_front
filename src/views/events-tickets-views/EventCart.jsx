/* =======================================================
    VIEW EventCart - "/cart" - Vista a la que redirección al comprar un evento

    styles:
    evento y cantidad en el cart
    temporizador 10min
    iniciar sesion o registrarse en la misma view
    Seleccion medios de pago (Mercado Pago o Mercado Credito) 
    Boton comprar
    
*/

// Axios
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Mercado Pago
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
initMercadoPago("APP_USR-b57d9ae5-1007-4156-a282-4763ddd6afd1");

// Hooks
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

// Actions
import {
    getEventById,
    removeEventDetail,
} from "../../redux/actions/eventsActions";

// Components
import Timer from "../../components/Timer";
import Loading from "../../components/Loading";

// Consts
import { SECONDS_TO_PAY } from "../../const";

const EventCart = () => {
    // Global state
    const userData = useSelector((state) => state.userData);
    const selectedTickets = useSelector((state) => state.selectedTickets);
    const dispatch = useDispatch();
    // Get event
    const { eventId } = useParams();
    const event = useSelector((state) => state.eventDetail);

    useEffect(() => {
        dispatch(getEventById(eventId));

        return () => {
            dispatch(removeEventDetail());
        };
    }, [eventId]);

    const [ticketsToPay, setTicketsToPay] = useState([]);

    const [serviceFee, setServiceFee] = useState(0);
    const [totalToPay, setTotalToPay] = useState(0);

    useEffect(() => {
        let aux = [];
        for (let ticketId in selectedTickets) {
            aux.push({
                id: ticketId,
                price: selectedTickets[ticketId].price,
                quantity: selectedTickets[ticketId].quantity,
                name: event.Tickets?.find((ticket) => ticket.id === ticketId)
                    .name,
            });
        }
        setTimeout(() => {
            setTicketsToPay(aux);
        }, 1000);
    }, [selectedTickets, event]);

    useEffect(() => {
        let totalTickets = 0;
        for (let ticket of ticketsToPay) {
            totalTickets += ticket.price * ticket.quantity;
        }
        setTimeout(() => {
            setServiceFee(totalTickets * 0.15);
            setTotalToPay(totalTickets + totalTickets * 0.15);
        }, 1000);
    }, [ticketsToPay]);

    const handleTimerEnd = async () => {
        const response = await axios.get(`${BACKEND_URL}/events`);
    };

    //* Mercado Pago

    const [preferenceId, setPreferenceId] = useState(null);
    useEffect(() => {
        const bodyMPTemplateCreator = (selectedTickets, eventId, userData) => {
            let bodyMP = [];

            for (const key in selectedTickets) {
                for (let i = 1; i <= selectedTickets[key].quantity; i++) {
                    bodyMP.push({
                        eventId: eventId,
                        ticketId: key,
                        userId: userData.id,
                        email: userData.email,
                    });
                }
            }

            return bodyMP;
        };
        let MPbody = {
            name: event.name,
            price: totalToPay,
            tickets: bodyMPTemplateCreator(selectedTickets, eventId, userData),
        };
        if (totalToPay > 0) {
            axios
                .post(`${BACKEND_URL}/payments`, MPbody)
                .then((response) => {
                    setPreferenceId(response.data.preference_id);
                })
                .catch((error) => console.log({ MPerror: error }));
        }
    }, [totalToPay]);

    return (
        <div className="w-full">
            <div className="h-16"></div>

            <div className="my-auto min-h-[calc(100vh_-_4rem)] flex flex-col gap-6 mx-6 justify-center py-8">
                <div className="floatBox w-full md:w-2/3 h-fit mx-auto overflow-hidden font-sans bg-secondary">
                    <div className="flex flex-row w-full items-center justify-center pb-4 border-b border-secondaryBorder">
                        <h2 className="text-2xl lg:text-3xl align-center font-semibold">
                            {event.name}
                        </h2>
                    </div>
                    <div className="flex flex-row w-full items-center justify-center pb-4 border-b border-secondaryBorder">
                        <h2 className="lg:text-2xl align-center font-semibold">
                            Estas a punto de comprar los siguientes tickets:
                        </h2>
                    </div>
                    {ticketsToPay.length ? (
                        <>
                            {/* Tabla de tickets */}
                            <div className="flex flex-row w-full items-center justify-center pb-4 ">
                                <table className="w-full text-start ">
                                    <thead className="font-semibold border-b-4 border-fuchsia-600">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-2 py-3 text-start"
                                            >
                                                Ticket
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-2 py-3 text-start"
                                            >
                                                Precio
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-2 py-3 text-center"
                                            >
                                                Cantidad
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-2 py-3 text-center"
                                            >
                                                Subtotal
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ticketsToPay?.map((ticket) =>
                                            ticket.quantity ? (
                                                <tr
                                                    className="border-b"
                                                    key={ticket.id}
                                                >
                                                    <td className="px-2 py-4 text-start">
                                                        {ticket.name}
                                                    </td>
                                                    <td className="px-2 py-4 text-start">
                                                        ${" "}
                                                        {ticket.price.toLocaleString(
                                                            "es"
                                                        )}
                                                    </td>
                                                    <td className="px-2 py-4 text-center">
                                                        {ticket.quantity}
                                                    </td>
                                                    <td className="px-2 py-4 text-center">
                                                        ${" "}
                                                        {(
                                                            ticket.quantity *
                                                            ticket.price
                                                        ).toLocaleString("es")}
                                                    </td>
                                                </tr>
                                            ) : (
                                                <></>
                                            )
                                        )}
                                        <tr
                                            className="font-semibold border-t-4 border-fuchsia-600 rounded-md"
                                            key="sum"
                                        >
                                            <td className="px-2 py-4">Fee:</td>
                                            <td className="px-2 py-4 text-end">
                                                ${" "}
                                                {serviceFee.toLocaleString(
                                                    "es"
                                                )}
                                            </td>

                                            <td className="px-2 py-4 text-start">
                                                Total
                                            </td>
                                            <td className="px-2 py-4 text-center">
                                                ${" "}
                                                {totalToPay.toLocaleString(
                                                    "es"
                                                )}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </>
                    ) : (
                        <Loading />
                    )}
                </div>

                <div className="floatBox w-full md:w-2/3 h-fit mx-auto overflow-hidden font-sans bg-secondary">
                    <Timer
                        seconds={SECONDS_TO_PAY}
                        handleTimerEnd={handleTimerEnd}
                    />
                </div>
                <div className="floatBox w-full md:w-2/3 h-fit mx-auto overflow-hidden font-sans bg-secondary">
                    {preferenceId ? (
                        <Wallet
                            className="px-6"
                            initialization={{
                                preferenceId: preferenceId,
                            }}
                        />
                    ) : (
                        <Loading />
                    )}
                </div>
            </div>
        </div>
    );
};

export default EventCart;
