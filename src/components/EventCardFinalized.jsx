// Hooks
import { useState, useEffect } from "react";

// Assets
import { ImLocation2 } from "react-icons/im";
import { AiOutlineCalendar } from "react-icons/ai";

// Components
import StarRatingStatic from "./StarRatingStatic";
import StarRating from "./StarRating";

// Modal
import Modal from "react-modal";

// Axios
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Redux
import { connect } from "react-redux";
Modal.setAppElement("#root");

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "#1F2937",
        borderRadius: "10px",
        width: "33.33%",
        padding: "20px",
        color: "#F5F5F5",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        zIndex: "50",
        position: "fixed",
    },
};

export const EventCardF = (props) => {
    const { id, name, image, date, venue, hour, userData } = props;
    const formatDate = date.slice(0, 10).split("-").reverse().join("-");

    const [rating, setRating] = useState(0);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [averageRating, setAverageRating] = useState(null);
    const [totalCritics, setTotalCritics] = useState(null);

    const [disable, setDisable] = useState(true);
    let cont = 0;
    useEffect(() => {
        axios
            .get(`${BACKEND_URL}/userTickets/ticketsByUser/${userData.id}`)
            .then((response) => {
                response.data.map((ticket) => {
                    if (ticket.eventId === id) {
                        cont++;
                    }
                });
                if (cont !== 0) {
                    setDisable(false);
                }
            });
    }, [userData.id]);

    useEffect(() => {
        axios
            .get(`${BACKEND_URL}/events/rating/${id}`)
            .then((response) => {
                setAverageRating(response.data.averageRating);
                setTotalCritics(response.data.critics);
            })
            .catch((error) => {
                console.error("Failed to fetch event rating:", error);
            });
    }, [id]);

    const handleRateClick = () => {
        // Verificar en el almacenamiento local si el usuario ya ha calificado
        const ratedEvents =
            JSON.parse(localStorage.getItem("ratedEvents")) || {};
        if (!ratedEvents[id]) {
            setIsOpen(true);
        } else {
            alert("Ya has calificado este evento.");
        }
    };

    const updateRating = async (id, rating, userId) => {
        try {
            const response = await axios.put(`${BACKEND_URL}/events/rating`, {
                id,
                rating,
                userId,
            });
            return response.data;
        } catch (err) {
            console.error(err);
            return err;
        }
    };
    const onStarClick = (nextValue, prevValue, name) => {
        setRating(nextValue);
    };
    const closeModal = async () => {
        setIsOpen(false);
        const userId = userData.id;
        try {
            const ratingP = await updateRating(id, rating, userId);
            const ratedEvents =
                JSON.parse(localStorage.getItem("ratedEvents")) || {};
            ratedEvents[id] = true;
            localStorage.setItem("ratedEvents", JSON.stringify(ratedEvents));
            // Almacenar en el almacenamiento local que el usuario ha calificado este evento
        } catch (error) {
            console.error("Failed to update rating:", error);
        }
    };
    return (
        <div className="h-fit w-full bg-secondary rounded-xl border border-secondaryBorder">
            <div className="w-full aspect-square rounded-t-xl">
                <img
                    src={image}
                    alt={name}
                    loading="lazy"
                    className="rounded-t-xl h-full w-full object-cover"
                />
            </div>
            <div className="mx-2 my-2">
                <div className="flex flex-row h-16 lg:h-20 pb-2 border-b border-secondaryBorder">
                    <h2 className="text-sm lg:text-lg font-semibold">{name}</h2>
                </div>
                <div className="flex flex-row p-2 gap-2 text-sm lg:text-base mb-2 border-b border-secondaryBorder">
                    <AiOutlineCalendar
                        size="1rem"
                        className="inline-block lg:hidden"
                    />
                    <AiOutlineCalendar
                        size="1.3rem"
                        className="lg:inline-block hidden"
                    />
                    {formatDate}
                    <span className="text-fuchsia-600">Finalizado</span>
                </div>
                <div className="flex items-center justify-center">
                    <div className="flex items-center gap-2">
                        <StarRatingStatic rating={averageRating} />
                        {totalCritics && `(${totalCritics})`}
                    </div>
                    <button
                        className="btnPrimary py-0 w-full ml-6 text-sm lg:text-base text-center"
                        onClick={handleRateClick}
                        disabled={disable}
                    >
                        Calificar
                    </button>
                </div>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Rate Modal"
                style={customStyles}
            >
                <div className="text-center text-xl font-semibold mb-4">
                    Por favor, selecciona la cantidad de estrellas para
                    calificar.
                </div>
                <StarRating rating={rating} onStarClick={onStarClick} />
                <div className="text-center text-md mt-4">
                    Tu valoración nos ayuda a mejorar nuestro servicio. ¡Gracias
                    por tu tiempo!
                </div>
                <button
                    onClick={closeModal}
                    className="mt-4 px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none transition-colors duration-300"
                >
                    Cerrar
                </button>
            </Modal>
        </div>
    );
};
const mapStateToProps = (state) => {
    return {
        userData: state.userData,
    };
};
export default connect(mapStateToProps, null)(EventCardF);
