// Components
import { useEffect, useState } from "react";
import Tooltip from "./Tooltip";

// Assets
import { MdDeleteOutline } from "react-icons/md";

// Axios
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Redux
import { connect } from "react-redux";
import { setGlobalError, setGlobalSuccess } from "../redux/actions/appActions";
import { getUserEventsByUserId } from "../redux/actions/usersActions";

const EventDelete = (props) => {
    // Props
    const {
        tickets,
        eventId,
        eventName,
        setGlobalError,
        setGlobalSuccess,
        getUserEventsByUserId,
        userData,
    } = props;

    // Can Delete
    const [canDelete, setCanDelete] = useState(true);

    useEffect(() => {
        const sells = tickets?.map((t) => t.sells);
        const ticketsSolds = sells?.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0
        );
        if (ticketsSolds) setCanDelete(false);
    }, [tickets]);

    // Delete proccess
    const [deleteStep, setDeleteStep] = useState(0);

    // 1
    const handleDeleteClick = () => {
        setDeleteStep(1);
    };

    const handleCancelClick = () => {
        setDeleteStep(0);
    };

    const handleAllowDelete = () => {
        setDeleteStep(2);
    };

    // 2
    const [confirmText, setConfirmText] = useState("");
    const [textToConfirm, setTextToConfirm] = useState(
        `Eliminar mi evento ${eventName.slice(0, 10)}`
    );

    const handleConfirmTextChange = (event) => {
        setConfirmText(event.target.value);
    };

    const deleteEvent = () => {
        setConfirmText("");
        const asyncDeleteEvent = async (id) => {
            try {
                const response = await axios.delete(
                    `${BACKEND_URL}/events/eventsdelete/${id}`
                );
                setGlobalSuccess("El evento ha sido eliminado exitoxamente.");
                getUserEventsByUserId(userData.id);
            } catch (error) {
                setGlobalError(error.response.data.error);
            }
            setDeleteStep(0);
        };

        asyncDeleteEvent(eventId);
    };

    return (
        <>
            {deleteStep === 1 ? (
                <>
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-primaryLight dark:bg-primary bg-opacity-80 dark:bg-opacity-90">
                        <div className="floatBox p-8 w-full lg:w-2/6">
                            <div className="mb-4 text-2xl font-semibold">
                                Eliminar evento
                            </div>
                            <div className="text-normal mb-6">
                                Estas seguro que queres eliminar el evento
                                seleccionado? Esta acción es permanente.
                            </div>
                            <div className="flex flex-row gap-6 justify-end">
                                <div className="flex flex-row gap-6 justify-end">
                                    <button
                                        onClick={handleCancelClick}
                                        className="w-32 px-4 text-lg py-2 rounded-xl bg-slate-300 dark:bg-primary hover:bg-slate-500 dark:hover:bg-slate-800 focus:outline-none transition-colors duration-300"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        onClick={handleAllowDelete}
                                        className="w-32 px-4 text-lg py-2 rounded-xl bg-red-600 hover:bg-red-500 focus:outline-none transition-colors duration-300"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : deleteStep === 2 ? (
                <>
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-primaryLight dark:bg-primary bg-opacity-80 dark:bg-opacity-90">
                        <div className="floatBox p-8 w-full lg:w-2/6">
                            <div className="mb-4 text-2xl font-semibold w-full">
                                Eliminar evento
                            </div>
                            <div className="text-normal mb-6 w-full">
                                Para confirmar tipea "
                                <span className="font-semibold">
                                    {textToConfirm}
                                </span>
                                " en la caja de abajo
                            </div>
                            <div className="mb-6 w-full">
                                <input
                                    type="text"
                                    className={`${
                                        confirmText !== textToConfirm
                                            ? "input"
                                            : "inputSuccess"
                                    }`}
                                    value={confirmText}
                                    onChange={handleConfirmTextChange}
                                />
                            </div>
                            <div className="flex flex-row gap-6 justify-end">
                                <div className="flex flex-row gap-6 justify-end">
                                    <button
                                        onClick={handleCancelClick}
                                        className="w-32 px-4 text-lg py-2 rounded-xl  bg-slate-300 dark:bg-primary hover:bg-slate-500 dark:hover:bg-slate-800 focus:outline-none transition-colors duration-300"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        onClick={deleteEvent}
                                        disabled={confirmText !== textToConfirm}
                                        className="w-32 px-4 text-lg py-2 rounded-xl bg-red-600 hover:bg-red-500 focus:outline-none transition-colors duration-300 disabled:cursor-not-allowed disabled:bg-red-600 disabled:opacity-50"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <Tooltip
                    tooltip={
                        !canDelete
                            ? "El evento ya tiene ventas"
                            : "Borrar evento"
                    }
                    x={!canDelete ? "150" : "70"}
                >
                    <button
                        disabled={!canDelete}
                        className="disabled:cursor-not-allowed"
                        onClick={handleDeleteClick}
                    >
                        <MdDeleteOutline
                            size="1.5rem"
                            className="text-red-600"
                        />
                    </button>
                </Tooltip>
            )}
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        userData: state.userData,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setGlobalError: (error) => dispatch(setGlobalError(error)),
        setGlobalSuccess: (message) => dispatch(setGlobalSuccess(message)),
        getUserEventsByUserId: (userId) =>
            dispatch(getUserEventsByUserId(userId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventDelete);
