import { FILTER_TYPES, SORT_TYPES } from "../../const";
import getSixMonthDate from "../../functions/getSixMonthDate";

const initialState = {
    // All events y finalized events
    allEvents: [],
    allEventsF: [],
    // Home events
    homeEvents: [],
    homeEventsF: [],

    eventsPerPage: 10,
    currentPage: 1,
    currentPageF: 1,
    eventsPerPageF: 10,

    homeFilterByProducer: FILTER_TYPES.BY_PRODUCER.ALL,
    homeFilterByDate: {
        startDate: new Date().setHours(0, 0, 0, 0),
        endDate: "",
    },
    homeSort: SORT_TYPES.DEFAULT,

    searchBar: "",

    // Detail event
    eventDetail: {},

    // Tickets states
    allTickets: [],
    allTicketsByEvents: [],

    // User states
    isLogin: false,
    userData: {},
    userSignError: "",
    signUpStep: 1,

    // Producer Events
    userEvents: [],
    allUserEvents: [],

    // User tickets
    userTickets: [],
    allUserTickets: [],

    // Global states
    globalError: "",
    globalSuccess: "",

    // Cart
    selectedTickets: {},

    // Reservaciones
    reservas: 0,
};

export default initialState;
