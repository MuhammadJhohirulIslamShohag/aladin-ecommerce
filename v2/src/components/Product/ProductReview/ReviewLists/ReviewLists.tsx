"use client";

import React, { useState } from "react";
import ReviewList from "./ReviewList";
import LocalSearch from "@/components/Form/LocalSearch/LocalSearch";
import { IReview } from "@/types/review.types";

type ReviewListsPropType = {
    reviewProducts: IReview[];
    handleReviewShowModal: () => void;
};
const ReviewLists = ({
    reviewProducts,
    handleReviewShowModal,
}: ReviewListsPropType) => {
    const [keyword, setKeyword] = useState<string>("");

    // search filter
    const searched = (keyword: string) => (c: IReview) =>
        c.comment.toLowerCase().includes(keyword);

    return (
        <div className="p-10 sm:p-5">
            <div className="flex">
                <div className="flex-initial w-2/5 sm:w-1/2">
                    <h2 className="text-3xl sm:text-xl font-bold text-gray-900 ">
                        Reviews
                    </h2>
                </div>
                <div className="flex-initial sm:w-1/2">
                    <label
                        className="text-xl sm:text-sm ml-5 cursor-pointer font-bold text-orange-400"
                        onClick={handleReviewShowModal}
                        htmlFor="my-modal"
                    >
                        Write a Review
                    </label>
                </div>
            </div>
            <div className="flex items-center lg:flex-row md:flex-row flex-col space-x-4 md:mt-12 mt-8">
                <div className="flex-initial md:w-2/5 w-full">
                    <LocalSearch
                        keyword={keyword}
                        setKeyword={setKeyword}
                        placeholder={"Search Review"}
                    />
                </div>
            </div>
            <div className="mt-10">
                {reviewProducts?.filter(searched(keyword)).length ? (
                    reviewProducts
                        ?.filter(searched(keyword))
                        ?.map((pRating: IReview) => (
                            <ReviewList
                                key={pRating._id}
                                reviewProduct={pRating}
                            />
                        ))
                ) : (
                    <span className="text-gray-500 ml-4">No Review Found</span>
                )}
            </div>
        </div>
    );
};

export default ReviewLists;
