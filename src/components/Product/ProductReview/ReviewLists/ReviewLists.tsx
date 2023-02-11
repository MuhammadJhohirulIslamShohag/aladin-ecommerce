import React, { useState } from "react";
import SearchForm from "@/components/UI/SearchForm/SearchForm";
import ReviewList from "./ReviewList";

const ReviewLists = ({ product, handleReviewShowModal }: any) => {
    return (
        <div className="p-10">
            <div className="flex">
                <div className="flex-initial w-2/5">
                    <h2 className="text-3xl font-bold text-gray-900 ">
                        Reviews
                    </h2>
                </div>
                <div className="flex-initial">
                    <label
                        className="text-xl ml-5 cursor-pointer font-bold text-orange-400"
                        onClick={handleReviewShowModal}
                        htmlFor="my-modal"
                    >
                        Write a Review
                    </label>
                </div>
            </div>
            <div className="flex items-center space-x-4  mt-12">
                <div className="flex-initial w-2/5">
                    <SearchForm
                        className={"w-full"}
                        placeholder={"Search Reviews"}
                    />
                </div>
                <div className="flex-initial relative -top-4">
                    <label
                        htmlFor="ratings"
                        className="block mb-2 text-md font-medium text-gray-900 "
                    >
                        Filter Ratings
                    </label>
                    <select
                        id="ratings"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    >
                        <option selected>Choose a Rating</option>
                        <option value="5">Five starts</option>
                        <option value="4">Four starts</option>
                        <option value="3">Three starts</option>
                        <option value="2">Two starts</option>
                        <option value="1">One start</option>
                    </select>
                </div>
            </div>
            <div className="mt-10">
                {product.ratings.map((rating: any) => (
                    <ReviewList key={rating._id} ratings={rating} />
                ))}
            </div>
        </div>
    );
};

export default ReviewLists;
