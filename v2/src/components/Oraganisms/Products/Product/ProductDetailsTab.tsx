"use client";

import React, { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Tab } from "@headlessui/react";
import { IProduct } from "@/types/product.type";
import { getUserInfo } from "@/store/user/users";
import { IReview } from "@/types/review.types";

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

    const handleReviewShowModal = () => {
        if (user && user?.email) {
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
        try {
            event.preventDefault();
            const reviewObject = {
                comment: comment,
                star: star,
            };
            // if (user && user.token) {
            //     productRating(user.token, _id, reviewObject)
            //         .then((res) => {
            //             refreshData();
            //         })
            //         .catch((error) => {
            //             console.log(error);
            //         });
            // }
            setComment("");
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            }
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
                                                ? "bg-white text-primary px-10 rounded-none py-3 border-2 border-primary sm:px-5"
                                                : "btn hover:bg-white hover:text-primary border-0 rounded-none text-white btn-primary px-10 sm:px-5"
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
                    productName={name}
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
