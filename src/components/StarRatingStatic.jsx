import { FaStar } from "react-icons/fa";
const StarRatingStatic = ({ rating }) => {
    const stars = Math.round(rating);

    return (
        <div className="flex">
            {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;
                return (
                    <label key={i} className="flex items-center justify-center">
                        <input
                            type="radio"
                            name="rating"
                            value={ratingValue}
                            className="hidden"
                            checked={ratingValue <= stars}
                            readOnly
                        />
                        <FaStar
                            className="star"
                            color={ratingValue <= stars ? "#ffc107" : "#e4e5e9"}
                        />
                    </label>
                );
            })}
        </div>
    );
};

export default StarRatingStatic;
