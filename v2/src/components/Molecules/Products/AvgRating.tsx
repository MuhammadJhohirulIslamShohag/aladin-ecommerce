"use client";

import { IReview } from "@/types/review.types";
import { BsFillStarFill } from "react-icons/bs";

type AvgRatingPropType = {
    product: IReview[];
    isTotalReviewRating?: boolean;
    isHomeReviewShow?: boolean;
    avgReview?: number;
    reviewLen?: number;
};
export const AvgRating = ({
    product,
    isTotalReviewRating = false,
    isHomeReviewShow = false,
    avgReview = 0,
    reviewLen = 0,
}: AvgRatingPropType) => {
    let avgRating: number | undefined = avgReview;
    let length: number | undefined = reviewLen;
    if (product && product?.length) {
        let total: number[] = [];
        product?.forEach((rating: any) => total.push(rating.rating));
        const highest = product?.length * 5;
        const totalReducer = total?.reduce((acc, cur) => acc + cur, 0);
        avgRating = (totalReducer * 5) / highest;
        length = product?.length;
    } else {
        avgRating = avgReview;
        length = reviewLen;
    }

    return (
        <>
            {isHomeReviewShow ? (
                <div className="mt-1">
                    <div className="flex items-center flex-col">
                        <div className="flex items-center relative">
                            {avgRating ? (
                                [0, 1, 2, 3, 4].map((rating: number) => (
                                    <BsFillStarFill
                                        key={rating}
                                        className={`h-3.5 w-3.5 ${
                                            avgRating! > rating
                                                ? "text-rose-600"
                                                : "text-gray-200"
                                        }
         h-4 w-4 flex-shrink-0`}
                                    />
                                ))
                            ) : (
                                <span className="text-rose-600 text-sm font-semibold">
                                    No Review Yet
                                </span>
                            )}
                            <span className=" text-red-700 text-[15px] font-medium ml-1 -mt-[5px]">
                                ({length})
                            </span>
                        </div>
                    </div>
                </div>
            ) : !isTotalReviewRating ? (
                <div className="mt-1">
                    <h3 className="sr-only">Reviews</h3>
                    <div className="flex items-center">
                        <div className="flex items-center mr-3">
                            {avgRating ? (
                                [0, 1, 2, 3, 4].map((rating: number) => (
                                    <BsFillStarFill
                                        key={rating}
                                        className={`${
                                            avgRating! > rating
                                                ? "text-rose-600"
                                                : "text-gray-200"
                                        }
             h-4 w-4 flex-shrink-0`}
                                    />
                                ))
                            ) : (
                                <span className="text-rose-600 text-sm">
                                    No Review Yet
                                </span>
                            )}
                        </div>
                        <span className="text-rose-600 text-sm">
                            {length === 1 || length === 0
                                ? `${length} Review`
                                : `${length} reviews`}{" "}
                        </span>
                    </div>
                </div>
            ) : (
                <div className="mt-1">
                    <div className="flex items-center flex-col">
                        <h3 className="text-orange-400 text-7xl font-extrabold">
                            {avgRating && avgRating}
                        </h3>
                        <div className="flex items-center mr-3">
                            {avgRating &&
                                [0, 1, 2, 3, 4].map((rating: number) => (
                                    <BsFillStarFill
                                        key={rating}
                                        className={`${
                                            avgRating! > rating
                                                ? "text-orange-400"
                                                : "text-gray-200"
                                        }
                                    h-4 w-4 flex-shrink-0 mr-1`}
                                    />
                                ))}
                        </div>
                        <p className="text-orange-400 text-md mr-3">
                            Product Rating
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};

export default AvgRating;
