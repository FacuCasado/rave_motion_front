import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import Loading from "../../components/Loading";
import EventCardF from "../../components/EventCardFinalized";
import PaginadoReviews from "../../components/PaginadoReviews";

const images = [
    "https://wallpapercave.com/wp/wp1889483.jpg",
    "https://wallpapercave.com/wp/wp1889488.jpg",
];
import { getAllEventsFinalized } from "../../redux/actions/eventsActions";

import { connect } from "react-redux";

const Reviews = ({ allEvents, homeEvents, currentPage, eventsPerPage }) => {
    const dispatch = useDispatch();
    // Carousel
    const [currentImage, setCurrentImage] = useState(images[0]);

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

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    useEffect(() => {
        !paginatedEvents.length && dispatch(getAllEventsFinalized());
    }, []);
    return (
        <div className="w-full min-h-screen">
            {/* Carousel */}
            <div className="h-96 overflow-hidden relative">
                {/* Carousel images */}
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
            <div className="w-screen grid my-4">
                <div className="flex w-fit justify-self-end my-2 items-center gap-6 py-1 px-4 bg-secondaryLight dark:bg-secondary rounded-full border border-secondaryBorderLight dark:border-secondaryBorder mr-4">
                    <>{allEvents.length} Resultados</> | Página{" "}
                    {totalPages ? currentPage : "0"} / {totalPages}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-6 m-6 min-h-screen justify-items-center">
                {paginatedEvents.map((event) => (
                    <EventCardF
                        key={event.id}
                        id={event.id}
                        name={event.name}
                        producer={event.producer}
                        image={event.image}
                        hour={event.hour}
                        venue={event.venue}
                        date={event.date}
                    />
                ))}
            </div>
            <div className="flex items-center justify-center">
                {isLoading ? (
                    <Loading />
                ) : paginatedEvents.length === 0 ? (
                    <div className="flex flex-col w-full h-full items-center justify-center">
                        <h2 className="font-bold text-center text-4xl sm:text-5xl">
                            LO SENTIMOS
                        </h2>
                        <h3 className="text-white text-lg sm:text-xl text-center">
                            No se han encontrado resultados
                        </h3>
                    </div>
                ) : (
                    <div>
                        {isLoading ? null : (
                            <PaginadoReviews totalPages={totalPages} />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        allEvents: state.allEventsF,
        homeEvents: state.homeEventsF,
        currentPage: state.currentPageF,
        eventsPerPage: state.eventsPerPageF,
    };
};
export default connect(mapStateToProps, null)(Reviews);
