// React Router Dom
import { Link } from "react-router-dom";

// Assets
import { AiOutlineCalendar } from "react-icons/ai";

export const EventCard = ({ id, name, image, date, venue, hour }) => {
    const formatDate = date.slice(0, 10).split("-").reverse().join("-");

    return (
        <div className="h-fit w-full floatBox p-0 block">
            <div className="w-full aspect-square rounded-t-xl">
                <Link to={`/event/${id}`}>
                    <img
                        src={image}
                        alt={name}
                        loading="lazy"
                        className="rounded-t-xl h-full w-full object-cover"
                    />
                </Link>
            </div>
            <div className="mx-2 my-2">
                <div className="flex flex-row h-16 lg:h-20 pb-2 border-b border-secondaryBorderLight dark:border-secondaryBorder">
                    <h2 className="text-sm lg:text-lg font-semibold">{name}</h2>
                </div>
                <div className="flex flex-row p-2 gap-2 text-sm lg:text-base mb-2 border-b border-secondaryBorderLight dark:border-secondaryBorder">
                    <AiOutlineCalendar
                        size="1rem"
                        className="inline-block lg:hidden"
                    />
                    <AiOutlineCalendar
                        size="1.3rem"
                        className="lg:inline-block hidden"
                    />
                    {formatDate}
                </div>
                <div className="flex">
                    <Link
                        className="btnPrimary py-0 w-full text-sm lg:text-base text-center"
                        to={`/event/${id}`}
                    >
                        Comprar
                    </Link>
                </div>
            </div>
        </div>
    );
};
export default EventCard;
