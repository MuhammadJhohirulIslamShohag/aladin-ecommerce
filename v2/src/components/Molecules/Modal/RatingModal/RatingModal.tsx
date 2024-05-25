"use client";

import React from "react";
import StarRatings from "react-star-ratings";

import CustomModal from "../../../Atoms/Modal/CustomModal";

const RatingModal = ({
    productName,
    showReviewModal,
    handleReviewSubmit,
    setShowReviewModal,
    handleClickRating,
    setComment,
    comment,
    star,
}: any) => {
    return (
        <CustomModal onClose={() => setShowReviewModal(!showReviewModal)}>
            <div className="bg-white px-5 py-5 w-[300px]">
                <div className="modal-box relative">
                    <div className="flex justify-between ">
                    <h3 className="text-lg font-bold text-success text-center">
                        Review The {productName}
                    </h3>
                    <label
                        onClick={() => setShowReviewModal(!showReviewModal)}
                       
                        className="text-red-500 hover:text-red-700 text-lg "
                    >
                        ✕
                    </label>
                   
                    </div>
                    <form onSubmit={handleReviewSubmit} className="pb-5">
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
                            onChange={(e) => setComment(e.target.value)}
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
                </div>
            </div>
        </CustomModal>
    );
};

export default RatingModal;
