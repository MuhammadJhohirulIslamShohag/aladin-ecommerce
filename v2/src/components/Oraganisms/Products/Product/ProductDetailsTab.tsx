"use client";

import React, { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Tab } from "@headlessui/react";
import { IProduct } from "@/types/product.type";
import { getUserInfo } from "@/store/user/users";
import { IReview } from "@/types/review.types";
import {
    useAddReviewMutation,
    useUpdateReviewMutation,
} from "@/redux/services/review/reviewApiService";

import ProductDescription from "./ProductDescription/ProductDescription";
import ProductReview from "./ProductReview/ProductReview";
import RatingModal from "../../../Molecules/Modal/RatingModal/RatingModal";

const ProductDetailsTab = ({
    product,
    reviewProducts,
}: {
    product: IProduct;
    reviewProducts: IReview[];
}) => {
    const [comment, setComment] = useState<string>("");
    const [star, setStar] = useState<number>(0);
    const [showReviewModal, setShowReviewModal] = useState<boolean>(false);

    const user = getUserInfo();
    const router = useRouter();

    const [addReview] = useAddReviewMutation();
    const [updateReview] = useUpdateReviewMutation();

    const handleReviewShowModal = () => {
        if (user && user?.user?.email) {
            const existingUserRatingObject = reviewProducts?.find(
                (rating) => rating?.userId === user?.user?._id
            );
            if (existingUserRatingObject) {
                setStar(existingUserRatingObject?.rating);
                setComment(existingUserRatingObject?.comment);
            }
            setShowReviewModal((prev) => !prev);
            return;
        }
        return router.push(`/auth/login?redirect=/products/${product?.slug}`);
    };

    const handleClickRating = (newRating: number) => {
        setStar(newRating);
    };

    const handleReviewSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();
        const existingUserRatingObject = reviewProducts?.find(
            (rating) => rating?.userId === user?.user?._id
        );
        if (existingUserRatingObject) {
            const updateReviewObject = {
                payload: {
                    comment: comment,
                    productId: product?._id,
                    userId: user?.user?._id,
                    rating: star,
                },
                id: existingUserRatingObject?._id,
            };
            updateReview(updateReviewObject)
                .then((res) => {
                    if ("data" in res && res.data && res.data?.success) {
                        toast.success("Update Review Successfully!");
                        setShowReviewModal((prev) => !prev);
                        setComment("");
                        setStar(0);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            const reviewObject = {
                comment: comment,
                productId: product?._id,
                userId: user?.user?._id,
                rating: star,
            };
            addReview(reviewObject)
                .then((res) => {
                    if ("data" in res && res.data && res.data?.success) {
                        toast.success("Added Review Successfully!");
                        setShowReviewModal((prev) => !prev);
                        setComment("");
                        setStar(0);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
      
    };

    return (
        <>
            <Tab.Group>
                <Tab.List className="bg-primary">
                    {["Description", "Show Reviews"].map(
                        (tabList: string, i: number) => (
                            <Tab key={i} as={Fragment}>
                                {({ selected }) => (
                                    <button
                                        className={
                                            selected
                                                ? "bg-white text-primary md:px-10 rounded-none py-3 border-2 border-primary px-5 transition-all"
                                                : " hover:bg-white hover:text-primary border-0 rounded-none text-white  md:px-10 px-5 transition-all"
                                        }
                                    >
                                        {tabList}
                                    </button>
                                )}
                            </Tab>
                        )
                    )}
                </Tab.List>
                <Tab.Panels className="border-x-2 border-b-2 border-gray-400">
                    <ProductDescription product={product} />
                    <ProductReview
                        handleReviewShowModal={handleReviewShowModal}
                        reviewProducts={reviewProducts}
                    />
                </Tab.Panels>
            </Tab.Group>

            {/*Show Rating Modal */}
            {showReviewModal && (
                <RatingModal
                    productName={product?.name}
                    handleReviewSubmit={handleReviewSubmit}
                    setShowReviewModal={setShowReviewModal}
                    showReviewModal={showReviewModal}
                    handleClickRating={handleClickRating}
                    setComment={setComment}
                    comment={comment}
                    star={star}
                />
            )}
        </>
    );
};

export default ProductDetailsTab;
