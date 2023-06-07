/* =======================================================
VIEW EventTicketsCreate - "/create/tickets" - Vista para crear y modificar tickets de un evento

* View solo habilitada para user logeado como producer
* Si es evento para modificar carga los values del form desde props

styles:
form 
*/

// Hooks
import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

// Redux
import { connect } from "react-redux";
import {
    getEventById,
    removeEventDetail,
} from "../../redux/actions/eventsActions";
import {
    setGlobalError,
    setGlobalSuccess,
} from "../../redux/actions/appActions";

// Formik, Yup
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Axios
import axios from "axios";

// Assets
import { MdOutlineDashboardCustomize, MdArrowBackIos } from "react-icons/md";

// Components
import Tooltip from "../../components/Tooltip";

const createImage = "https://wallpapercave.com/wp/wp12143405.jpg";

// *********************** Componente ***********************
const TicketsCreate = (props) => {
    // Props y Params =================
    const {
        getEventById,
        removeEventDetail,
        setGlobalError,
        setGlobalSuccess,
    } = props; // Actions
    const { eventDetail } = props; // Global state
    const { eventId } = useParams();

    // Event ==========================
    useEffect(() => {
        // Get Event

        getEventById(eventId);

        return () => {
            removeEventDetail();
        };
    }, []);

    // Tickets ========================
    const [ticketsArray, setTicketsArray] = useState([]);

    // Set Event Tickets ==============
    useEffect(() => {
        setTicketsArray(eventDetail.Tickets);
    }, [eventDetail]);

    // Manejo del form ================
    const initialValues = {
        name: "",
        description: "",
        accessType: "",
        price: "",
        maxQuantity: "",
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .max(50, "Debe ser hasta 50 caracteres.")
            .required("Este campo es requerido.")
            .test(
                // Verifica si name ya existe en algún ticket del array
                "uniqueName",
                "Debe ser único para el evento.",
                function (value) {
                    return !ticketsArray.some(
                        (ticket) => ticket.name === value
                    );
                }
            ),
        description: Yup.string()
            .max(50, "Debe ser hasta 50 caracteres.")
            .required("Este campo es requerido."),
        accessType: Yup.string()
            .max(20, "Debe ser hasta 20 caracteres.")
            .required("Este campo es requerido."),
        price: Yup.number()
            .positive("Debe ser mayor a 0.")
            .required("Este campo es requerido."),
        maxQuantity: Yup.number()
            .integer("Debe ser un número entero")
            .positive("Debe ser mayor a 0.")
            .required("Este campo es requerido."),
    });

    const handleSubmitTicket = async (values, { setSubmitting, resetForm }) => {
        setTicketsArray([...ticketsArray, { ...values, eventId: eventId }]);
        setSubmitting(false);
        resetForm();
    };

    // Create tickets on Event
    const navigate = useNavigate();
    const handleSubmitTicketsSyncToDB = async () => {
        const eventTickets = { tickets: [...ticketsArray] };
        try {
            await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/tickets/createtickets`,
                eventTickets
            );
            setGlobalSuccess(
                `Los tickets del evento "${eventDetail.name}" se han creado correctamente.`
            );
            navigate(`/event/${eventId}`);
        } catch (error) {
            setGlobalError(error.response.data.error);
        }
    };

    return (
        <div className="w-screen">
            {/* Background image top */}
            <div className="h-60 relative overflow-hidden">
                <div
                    className="h-full w-full absolute top-0 left-0 bg-cover bg-bottom bg-no-repeat "
                    style={{
                        backgroundImage: `url(${createImage})`,
                    }}
                ></div>
            </div>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmitTicket}
                validationSchema={validationSchema}
            >
                {({ isSubmitting, touched, errors }) => (
                    <div className="flex flex-col lg:grid lg:grid-cols-2  h-fit">
                        <div className="flex flex-col place-content-center h-full">
                            <Form className="floatBox my-6 mx-6 flex flex-col h-full justify-center">
                                <div className="flex flex-col items-center justify-center ">
                                    <div className="mb-4 w-full">
                                        <Tooltip tooltip="Ir al dashboard">
                                            <Link
                                                to="/dashboard"
                                                className="flex flex-row gap-2 btnPrimary items-center px-4 py-1 w-fit"
                                            >
                                                <MdArrowBackIos size="1.2rem" />
                                                <MdOutlineDashboardCustomize size="1.2rem" />
                                            </Link>
                                        </Tooltip>
                                    </div>
                                    <h2 className="block text-2xl text-center align-center font-semibold">
                                        Evento: {eventDetail.name}
                                    </h2>
                                </div>

                                {/* Divider */}

                                {/* name */}
                                <div className="flex flex-col my-2">
                                    <label
                                        htmlFor="name"
                                        className="block my-1 font-semibold"
                                    >
                                        Nombre del ticket:
                                    </label>
                                    <Field
                                        className={
                                            touched.name && errors.name
                                                ? "inputError"
                                                : touched.name && !errors.name
                                                ? "inputSuccess"
                                                : "input"
                                        }
                                        type="text"
                                        placeholder="Nombre"
                                        name="name"
                                        autoComplete="false"
                                    />
                                    <ErrorMessage
                                        name="name"
                                        component="span"
                                        className="errorMessage"
                                    />
                                </div>

                                {/* accessType */}
                                <div className="flex flex-col my-2">
                                    <label
                                        htmlFor="accessType"
                                        className="block my-1 font-semibold"
                                    >
                                        Tipo de acceso:
                                    </label>
                                    <Field
                                        className={
                                            touched.name && errors.name
                                                ? "inputError"
                                                : touched.name && !errors.name
                                                ? "inputSuccess"
                                                : "input"
                                        }
                                        type="text"
                                        placeholder="Vip / BackStage / Acceso general "
                                        name="accessType"
                                        autoComplete="false"
                                    />
                                    <ErrorMessage
                                        name="accessType"
                                        component="span"
                                        className="errorMessage"
                                    />
                                </div>

                                {/* Description */}
                                <div className="flex flex-col my-2">
                                    <label
                                        htmlFor="description"
                                        className="block my-1 font-semibold"
                                    >
                                        Description:
                                    </label>
                                    <Field
                                        className={
                                            touched.description &&
                                            errors.description
                                                ? "inputError"
                                                : touched.description &&
                                                  !errors.description
                                                ? "inputSuccess"
                                                : "input"
                                        }
                                        type="text"
                                        placeholder="Descripción"
                                        name="description"
                                        autoComplete="false"
                                    />
                                    <ErrorMessage
                                        name="description"
                                        component="span"
                                        className="errorMessage"
                                    />
                                </div>

                                {/* Row price y maxQ */}
                                <div className="grid grid-cols-2">
                                    {/* Price */}
                                    <div className="flex flex-col my-2 mr-2">
                                        <label
                                            htmlFor="price"
                                            className="block my-1 font-semibold"
                                        >
                                            Precio:
                                        </label>
                                        <Field
                                            className={
                                                touched.price && errors.price
                                                    ? "inputError"
                                                    : touched.price &&
                                                      !errors.price
                                                    ? "inputSuccess"
                                                    : "input"
                                            }
                                            type="number"
                                            name="price"
                                            autoComplete="false"
                                        />
                                        <ErrorMessage
                                            name="price"
                                            component="span"
                                            className="errorMessage"
                                        />
                                    </div>
                                    {/* maxQuantity */}
                                    <div className="flex flex-col my-2 mr-2">
                                        <label
                                            htmlFor="maxQuantity"
                                            className="block my-1 font-semibold"
                                        >
                                            Cantidad de tickets:
                                        </label>
                                        <Field
                                            className={
                                                touched.maxQuantity &&
                                                errors.maxQuantity
                                                    ? "inputError"
                                                    : touched.maxQuantity &&
                                                      !errors.maxQuantity
                                                    ? "inputSuccess"
                                                    : "input"
                                            }
                                            type="number"
                                            name="maxQuantity"
                                            autoComplete="false"
                                        />
                                        <ErrorMessage
                                            name="maxQuantity"
                                            component="span"
                                            className="errorMessage"
                                        />
                                    </div>
                                </div>

                                {/* Submit */}
                                <div className="flex flex-col mt-6">
                                    <button
                                        type="submit"
                                        className="btnPrimary"
                                        disabled={isSubmitting}
                                    >
                                        Agregar
                                    </button>
                                </div>
                            </Form>
                        </div>
                        <div className="flex flex-col justify-content-center place-content-center ">
                            <div className="floatBox my-6 mx-6 justify-center">
                                <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                                    <p className="mx-4 mb-0 text-center font-semibold">
                                        Tickets del evento: (
                                        {ticketsArray?.length || "0"})
                                    </p>
                                </div>
                                {ticketsArray?.length && (
                                    <>
                                        <table className="w-full text-sm text-center">
                                            <thead className="text-xs">
                                                <tr>
                                                    <th
                                                        scope="col"
                                                        className="px-2 py-3"
                                                    >
                                                        Nro
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-2 py-3"
                                                    >
                                                        Nombre
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-2 py-3"
                                                    >
                                                        Tipo de acceso
                                                    </th>

                                                    <th
                                                        scope="col"
                                                        className="px-2 py-3"
                                                    >
                                                        Precio
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-2 py-3"
                                                    >
                                                        Cantidad
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {ticketsArray.map(
                                                    (tanda, index) => (
                                                        <tr
                                                            className="border-b"
                                                            key={
                                                                tanda?.id
                                                                    ? tanda.id
                                                                    : index
                                                            }
                                                        >
                                                            <td
                                                                scope="row"
                                                                className="px-2 py-4 font-medium"
                                                            >
                                                                {index + 1}
                                                            </td>
                                                            <td className="px-2 py-4">
                                                                {tanda.name}
                                                            </td>
                                                            <td className="px-2 py-4">
                                                                {
                                                                    tanda.accessType
                                                                }
                                                            </td>

                                                            <td className="px-2 py-4">
                                                                ${" "}
                                                                {tanda.price.toLocaleString(
                                                                    "es"
                                                                )}
                                                            </td>
                                                            <td className="px-2 py-4">
                                                                {
                                                                    tanda.maxQuantity
                                                                }
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        </table>
                                    </>
                                )}
                            </div>
                            <div className="floatBox py-2 mb-6 mx-6 justify-center">
                                <button
                                    type="submit"
                                    className="btnPrimary"
                                    onClick={handleSubmitTicketsSyncToDB}
                                    disabled={!ticketsArray?.length}
                                >
                                    Crear tickets
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </Formik>
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
        setGlobalError: (error) => dispatch(setGlobalError(error)),
        setGlobalSuccess: (message) => dispatch(setGlobalSuccess(message)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TicketsCreate);
