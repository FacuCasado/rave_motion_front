/* =======================================================
    VIEW Home - "/" - Vista principal de la página

    styles:
    carrousel con imagenes de fiestas
    sección eventos destacados: filtros (por provincia, por productora) +
     orden (por fecha) + lista de eventos destacados 
    info de la pagina con link a about
    preguntas frecuentes
*/

// Assets
import { images } from "../../const";

// Components
import EventContainer from "../../components/EventContainer";
import HomeNavBar from "../../components/HomeNavBar";
import Paginado from "../../components/Paginado";
import Loading from "../../components/Loading";

// Hooks
import { useState, useEffect } from "react";

// React Redux
import { connect } from "react-redux";

// Actions
import {
    getAllEvents,
    setAllEventsOnHomeEvents,
} from "../../redux/actions/eventsActions";

const Home = (props) => {
    // Global State
    const { homeEvents, currentPage, eventsPerPage } = props;

    // Actions
    const { getAllEvents } = props;

    useEffect(() => {
        getAllEvents();
    }, [getAllEvents]);

    // Carousel
    const [currentImage, setCurrentImage] = useState(images[0]);
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevImage) => {
                if (prevImage === images[0]) {
                    return images[1];
                } else {
                    return images[0];
                }
            });
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    // Paginado
    const totalPages = Math.ceil(homeEvents.length / eventsPerPage);
    const [pages, setPages] = useState([]);
    useEffect(() => {
        const prePages = [];
        for (let i = 1; i <= totalPages; i++) {
            prePages.push(i);
        }
        setPages(prePages);
    }, [totalPages]);

    const paginatedEvents = homeEvents.slice(
        (currentPage - 1) * eventsPerPage,
        currentPage * eventsPerPage
    );

    // Loading
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
    }, []);

    return (
        <div className="w-full min-h-screen">
            {/* Carrousel */}
            <div className="h-96 overflow-hidden relative">
                <div
                    className="h-full w-full absolute top-0 left-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 transform"
                    style={{
                        backgroundImage: `url(${currentImage})`,
                        transform: "translateX(0%)",
                    }}
                ></div>
                <div
                    className="h-full w-full absolute top-0 left-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 transform"
                    style={{
                        backgroundImage: `url(${
                            currentImage === images[0] ? images[1] : images[0]
                        })`,
                        transform: "translateX(100%)",
                    }}
                ></div>
            </div>

            {/* NavBar (Filters - Orders - info resultados) */}
            <HomeNavBar totalPages={totalPages} />

            <div className="flex flex-col">
                {isLoading ? (
                    <div className="h-[50vh]">
                        <Loading />
                    </div>
                ) : !homeEvents.length ? (
                    <div className="flex flex-col h-[50vh] w-full items-center justify-center">
                        <h2 className="font-bold text-center text-5xl">
                            LO SENTIMOS
                        </h2>
                        <h3 className="text-xl text-center">
                            No se han encontrado resultados
                        </h3>
                    </div>
                ) : (
                    <EventContainer paginatedEvents={paginatedEvents} />
                )}
            </div>
            <Paginado totalPages={totalPages} />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        allEvents: state.allEvents,
        homeEvents: state.homeEvents,
        currentPage: state.currentPage,
        eventsPerPage: state.eventsPerPage,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllEvents: () => dispatch(getAllEvents()),
        setAllEventsOnHomeEvents: () => dispatch(setAllEventsOnHomeEvents()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
