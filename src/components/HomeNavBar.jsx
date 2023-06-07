// Assets
import { FaSync } from "react-icons/fa";
import { MdArrowBackIos } from "react-icons/md";

// Hooks
import { useState, useEffect } from "react";

// React Redux
import { connect } from "react-redux";
import {
    setAllEventsOnHomeEvents,
    filterEventsByDate,
    filterEventsByProducer,
    sortEvents,
    setStartDateToFilter,
    setEndDateToFilter,
} from "../redux/actions/eventsActions";

// Functions
import setProducer from "../functions/setProducer";
import getSixMonthDate from "../functions/getSixMonthDate";

// Const
import { FILTER_TYPES, SORT_TYPES } from "../const";

// Components
import Tooltip from "../components/Tooltip";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const HomeNavBar = (props) => {
    // Props
    const { totalPages } = props;

    // Global State
    const {
        allEvents,
        homeEvents,
        homeFilterByProducer,
        homeFilterByDate,
        homeSort,
        currentPage,
    } = props;

    // Actions
    const {
        setAllEventsOnHomeEvents,
        setStartDateToFilter,
        setEndDateToFilter,
        filterEventsByDate,
        filterEventsByProducer,
        sortEvents,
    } = props;

    const handleSubmitFilterEvents = () => {
        filterEventsByDate();
    };

    const handleSubmitFilterEventsResponsive = () => {
        filterEventsByDate();
        setShowNavBar(false);
    };

    // Filter by Producer
    const handleFilterByProducer = (event) => {
        filterEventsByProducer(event.target.value);
    };

    const handleFilterByProducerResponsive = (event) => {
        filterEventsByProducer(event.target.value);
        setShowNavBar(false);
    };

    // Sort
    const handleSortEvents = (event) => {
        sortEvents(event.target.value);
    };

    const handleSortEventsResponsive = (event) => {
        sortEvents(event.target.value);
        setShowNavBar(false);
    };

    // Reset
    function handleResetFilters() {
        setAllEventsOnHomeEvents();
    }

    // Responsive
    const [showNavBar, setShowNavBar] = useState(false);

    useEffect(() => {
        if (showNavBar) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [showNavBar]);

    return (
        <>
            {/* NavBar lg */}
            <div className="hidden lg:flex flex-row place-content-between w-screen h-16 mt-4">
                <div className="flex w-fit justify-self-start my-2 items-center gap-6 py-1 px-4 bg-secondaryLight dark:bg-secondary border-secondaryBorderLight dark:border-secondaryBorder rounded-full border ml-4 shadow-sm">
                    {/* Filter by producer */}
                    <div className="flex flex-row gap-2 items-center">
                        <select
                            className="inputSelect w-fit"
                            onChange={handleFilterByProducer}
                            value={homeFilterByProducer}
                        >
                            {" "}
                            <option value={FILTER_TYPES.BY_PRODUCER.ALL}>
                                Todas las productoras
                            </option>
                            {setProducer(allEvents).map((c) => {
                                return (
                                    <option id={c} value={c} key={c}>
                                        {c}
                                    </option>
                                );
                            })}
                        </select>
                    </div>

                    {/* Filter by Date */}
                    <div className="flex flex-row gap-2 items-center">
                        <label htmlFor="startDate">Desde:</label>
                        <DatePicker
                            className="input"
                            selected={homeFilterByDate.startDate}
                            onSelect={(date) => setStartDateToFilter(date)}
                            onChange={filterEventsByDate}
                            minDate={new Date()}
                            dateFormat="dd/MM/yyyy"
                        />

                        <label htmlFor="endDate">Hasta:</label>
                        <DatePicker
                            className="input"
                            selected={homeFilterByDate.endDate}
                            onSelect={(date) => setEndDateToFilter(date)}
                            onChange={filterEventsByDate}
                            minDate={new Date()}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="dd/mm/yyyy"
                        />

                        <button
                            className="btnPrimary items-center px-2 w-fit py-0"
                            onClick={handleSubmitFilterEvents}
                        >
                            Filtrar
                        </button>
                    </div>

                    {/* Sort */}
                    <div className="flex flex-row gap-2 items-center">
                        <label htmlFor="sort">Ordenar:</label>

                        <select
                            value={homeSort}
                            onChange={handleSortEvents}
                            className="inputSelect w-fit"
                            name="sort"
                        >
                            <option value={SORT_TYPES.DEFAULT}>Default</option>
                            <option value={SORT_TYPES.BY_ALPHABETIC.ASC}>
                                A-Z
                            </option>
                            <option value={SORT_TYPES.BY_ALPHABETIC.DESC}>
                                Z-A
                            </option>
                            <option value={SORT_TYPES.BY_DATE.FIRST}>
                                Próximos
                            </option>
                            <option value={SORT_TYPES.BY_DATE.LAST}>
                                Últimos
                            </option>
                        </select>
                    </div>

                    {/* Reset All */}
                    <Tooltip tooltip="Limpiar filtros y ordenamientos">
                        <button
                            className="btnPrimary items-center px-4 py-1"
                            onClick={handleResetFilters}
                        >
                            <FaSync />
                        </button>
                    </Tooltip>
                </div>

                {/* Info paginado */}
                <div className="flex w-fit justify-self-end my-2 items-center gap-6 py-1 px-4 bg-secondaryLight dark:bg-secondary border-secondaryBorderLight dark:border-secondaryBorder rounded-full border mr-4 shadow-sm">
                    {homeEvents.length} Resultados | Página{" "}
                    {totalPages ? currentPage : "0"} / {totalPages}
                </div>
            </div>

            {/* NavBar Responsive */}
            <div className="lg:hidden flex flex-row place-content-between w-screen h-16 mt-4">
                <div className="flex w-fit justify-self-start my-2 items-center ml-4">
                    <button
                        className="btnPrimary px-4 py-2"
                        onClick={() => setShowNavBar(true)}
                    >
                        Filtrar eventos
                    </button>
                </div>

                {/* Info paginado */}
                <div className="flex w-fit justify-self-end my-2 items-center gap-6 py-1 px-4 bg-secondaryLight dark:bg-secondary border-secondaryBorderLight dark:border-secondaryBorder rounded-full border mr-4 shadow-sm">
                    {homeEvents.length} Resultados | Página{" "}
                    {totalPages ? currentPage : "0"} / {totalPages}
                </div>
            </div>

            {showNavBar && (
                <div className="lg:hidden fixed inset-0 z-50 flex bg-secondaryLight dark:bg-secondary border-secondaryBorderLight dark:border-secondaryBorder bg-opacity-95">
                    <button
                        className="absolute left-4 top-4 flex flex-row btnPrimary items-center px-4 py-1 w-fit"
                        onClick={() => setShowNavBar(false)}
                    >
                        <MdArrowBackIos size="1.3rem" />
                        Volver
                    </button>

                    <button
                        className="absolute right-4 top-4 flex flex-row btnPrimary items-center px-4 w-fit"
                        onClick={handleResetFilters}
                    >
                        <FaSync />
                    </button>
                    <div className="w-full flex flex-col mt-16 px-4 py-8">
                        <div className="flex flex-col gap-2 mb-12">
                            <span className="font-medium text-xl ml-1">
                                Filtro por productora:
                            </span>
                            <select
                                className="inputSelect w-full"
                                onChange={handleFilterByProducerResponsive}
                                value={homeFilterByProducer}
                            >
                                <option value={FILTER_TYPES.BY_PRODUCER.ALL}>
                                    Todas las productoras
                                </option>
                                {setProducer(allEvents).map((c) => {
                                    return (
                                        <option id={c} value={c} key={c}>
                                            {c}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="flex flex-col gap-2 mb-12">
                            <span className="font-medium text-xl ml-1">
                                Filtro por fecha:
                            </span>
                            <label htmlFor="startDate" className="font-medium">
                                Desde:
                            </label>
                            <DatePicker
                                className="input"
                                selected={homeFilterByDate.startDate}
                                onSelect={(date) => setStartDateToFilter(date)}
                                onChange={filterEventsByDate}
                                minDate={new Date()}
                                dateFormat="dd/MM/yyyy"
                            />

                            <label htmlFor="endDate" className="font-medium">
                                Hasta:
                            </label>
                            <DatePicker
                                className="input"
                                selected={homeFilterByDate.endDate}
                                onSelect={(date) => setEndDateToFilter(date)}
                                onChange={filterEventsByDate}
                                minDate={new Date()}
                                maxDate={getSixMonthDate()}
                                dateFormat="dd/MM/yyyy"
                            />
                            <button
                                className="btnPrimary items-center px-2 w-full mt-2 py-0"
                                onClick={handleSubmitFilterEventsResponsive}
                            >
                                Filtrar por fecha
                            </button>
                        </div>
                        <div className="flex flex-col gap-2 mb-12">
                            <label
                                htmlFor="sort"
                                className="font-medium text-xl ml-1"
                            >
                                Ordenar:
                            </label>

                            <select
                                value={homeSort}
                                onChange={handleSortEventsResponsive}
                                className="inputSelect w-full"
                                name="sort"
                            >
                                <option value={SORT_TYPES.DEFAULT}>
                                    Default
                                </option>
                                <option value={SORT_TYPES.BY_ALPHABETIC.ASC}>
                                    A-Z
                                </option>
                                <option value={SORT_TYPES.BY_ALPHABETIC.DESC}>
                                    Z-A
                                </option>
                                <option value={SORT_TYPES.BY_DATE.FIRST}>
                                    Próximos
                                </option>
                                <option value={SORT_TYPES.BY_DATE.LAST}>
                                    Últimos
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        allEvents: state.allEvents,
        homeEvents: state.homeEvents,
        homeFilterByProducer: state.homeFilterByProducer,
        homeFilterByDate: state.homeFilterByDate,
        homeSort: state.homeSort,
        currentPage: state.currentPage,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setAllEventsOnHomeEvents: () => dispatch(setAllEventsOnHomeEvents()),
        setStartDateToFilter: (startDate) =>
            dispatch(setStartDateToFilter(startDate)),
        setEndDateToFilter: (endDate) => dispatch(setEndDateToFilter(endDate)),
        filterEventsByDate: () => dispatch(filterEventsByDate()),
        filterEventsByProducer: (producer) =>
            dispatch(filterEventsByProducer(producer)),
        sortEvents: (sort) => dispatch(sortEvents(sort)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeNavBar);
