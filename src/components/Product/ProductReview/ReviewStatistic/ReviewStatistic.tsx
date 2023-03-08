import React from "react";
import { AvgRating } from "@/lib/utils/avgRating";
import ReviewProgressBar from "./ReviewProgressBar";
import { IProduct } from "types/product.type";

const ReviewStatistic = ({ product }: { product: IProduct }) => {
    return (
        <div className="grid grid-cols-4 sm:grid-cols-1">
            <div className="mt-4 sm:mt-3">
                <AvgRating product={product} isTotalReviewRating={true} />
            </div>
            <div className="col-span-3 px-10 sm:px-5 pt-5">
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
