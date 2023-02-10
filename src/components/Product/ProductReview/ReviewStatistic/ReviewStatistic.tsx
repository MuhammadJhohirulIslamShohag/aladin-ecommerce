import React from "react";
import { AvgRating } from "@/lib/utils/avgRating";
import ReviewProgressBar from "./ReviewProgressBar";

const ReviewStatistic = ({ product }: any) => {
    return (
        <div className="grid grid-cols-4">
            <div className="mt-4">
                <AvgRating product={product} isTotalReviewRating={true} />
            </div>
            <div className="col-span-3 px-10 pt-5">
                <ReviewProgressBar starNumber={5} percentage={45} />
                <ReviewProgressBar starNumber={4} percentage={45} />
                <ReviewProgressBar starNumber={3} percentage={45} />
                <ReviewProgressBar starNumber={2} percentage={45} />
                <ReviewProgressBar starNumber={1} percentage={45} />
            </div>
        </div>
    );
};

export default ReviewStatistic;
