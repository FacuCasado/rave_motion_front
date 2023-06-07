const EventTickets = ({ tickets }) => {
    // Show ticketsSolds / ticketsAll de un event
    const tickets1 = tickets?.map((t) => t.maxQuantity);
    const ticketsMax = tickets1?.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
    );

    const tickets2 = tickets?.map((t) => t.sells);
    const ticketsSolds = tickets2?.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
    );

    return (
        <span
            className={`${
                ticketsMax === ticketsSolds &&
                "text-green-700 dark:text-green-500 font-semibold"
            }`}
        >
            <span className="font-semibold">{ticketsSolds}</span> / {ticketsMax}
        </span>
    );
};

export default EventTickets;
