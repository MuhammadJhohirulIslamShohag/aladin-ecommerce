"use client";

import React from "react";
import { AvgRating } from "@/lib/utils/avgRating";
import { IReview } from "@/types/review.types";
import ReviewProgressBar from "./ReviewProgressBar";

const ReviewStatistic = ({ reviewProducts }: { reviewProducts: IReview[] }) => {

    const calculatePercentage = (number: number) => {
        const percentage = reviewProducts?.reduce((acc, cur) => {
            acc += Number(
                cur.rating == Number(number) || cur.rating == Number(number) + 0.5
            );
            return acc;
        }, 0);
        return (percentage * 100) / reviewProducts.length;
    };
    const ratingsWithPercentageArray = [
        {
            id: "1",
            star: 5,
            percentage: calculatePercentage(5),
        },
        {
            id: "2",
            star: 4,
            percentage: calculatePercentage(4),
        },
        { id: "3", star: 3, percentage: calculatePercentage(3) },
        { id: "4", star: 2, percentage: calculatePercentage(2) },
        { id: "5", star: 1, percentage: calculatePercentage(1) },
    ];

    return (
        <div className="grid grid-cols-4 sm:grid-cols-1">
            <div className="mt-4 sm:mt-3">
                <AvgRating product={reviewProducts} isTotalReviewRating={true} />
            </div>
            <div className="col-span-3 px-10 sm:px-5 pt-5">
                {ratingsWithPercentageArray.length &&
                    ratingsWithPercentageArray.map((rp) => (
                        <ReviewProgressBar
                            key={rp.id}
                            starNumber={rp.star}
                            percentage={rp.percentage}
                        />
                    ))}
            </div>
        </div>
    );
};

export default ReviewStatistic;
