"use client";

import React, { FC, ChangeEvent, FormEvent } from "react";
import StarRatings from "react-star-ratings";
import CustomModal from "../CustomModal";

interface RatingModalProps {
    productName: string;
    showReviewModal: boolean;
    handleReviewSubmit: (event: FormEvent<HTMLFormElement>) => void;
    setShowReviewModal: (show: boolean) => void;
    handleClickRating: (rating: number) => void;
    setComment: (comment: string) => void;
    comment: string;
    star: number;
}

const RatingModal: FC<RatingModalProps> = ({
    productName,
    showReviewModal,
    handleReviewSubmit,
    setShowReviewModal,
    handleClickRating,
    setComment,
    comment,
    star,
}) => {
    return (
        <CustomModal
            title={`Review The ${productName}`}
            isModalOpen={showReviewModal}
            onClose={() => setShowReviewModal(!showReviewModal)}
        >
            <form onSubmit={handleReviewSubmit} className="p-3">
                <label
                    htmlFor="message"
                    className="block mb-2 text-sm font-medium text-primary"
                >
                    Your Comment
                </label>
                <textarea
                    id="message"
                    rows={4}
                    className="block p-2.5 w-full text-sm text-primary bg-gray-50 rounded-lg border border-success focus:ring-green-500 focus:border-green-500 focus:outline focus:outline-offset-2 focus:outline-green-600"
                    name="comment"
                    value={comment}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                        setComment(e.target.value)
                    }
                    placeholder="Leave a comment here"
                ></textarea>
                <h6 className="mt-5 mb-2 text-primary">Rating</h6>
                <StarRatings
                    rating={star}
                    starRatedColor="red"
                    changeRating={handleClickRating}
                    numberOfStars={5}
                    starDimension="30px"
                    name={productName}
                />
                <div className="mt-5">
                    <input
                        type="submit"
                        value="Review Submit"
                        className="border-2 px-5 py-2 border-black hover:bg-primary font-semibold hover:text-white rounded-md transition-all duration-500 w-full disabled:opacity-75 disabled:border-2 disabled:border-primary mt-5 "
                    />
                </div>
            </form>
        </CustomModal>
    );
};

export default RatingModal;
