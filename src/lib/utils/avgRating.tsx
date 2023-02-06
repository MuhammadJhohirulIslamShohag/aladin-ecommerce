import StarRatings from "react-star-ratings";
import { BsFillStarFill } from "react-icons/bs";

export const AvgRating = ({product}:any) => {
    let avgRating: number;
    let length;
    if (product && product.ratings) {
        let total: number[] = [];
        product.ratings.forEach((rating: any) => total.push(rating.star));
        const highest = product.ratings.length * 5;
        const totalReducer = total.reduce((acc, cur) => acc + cur, 0);
        avgRating = (totalReducer * 5) / highest;
        length = product.ratings.length;
    }


    return (
        <div className="mt-6">
            <h3 className="sr-only">Reviews</h3>
            <div className="flex items-center">
                <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating: number) => (
                        <BsFillStarFill
                            key={rating}
                            className={`${
                                avgRating > rating
                                    ? "text-red-700"
                                    : "text-gray-200"
                            }
                        h-5 w-5 flex-shrink-0 `}
                        />
                    ))}
                </div>
                {length} reviews
            </div>
        </div>
    );
};
