import React from "react";
import { Tab } from "@headlessui/react";
import ReviewStatistic from "./ReviewStatistic/ReviewStatistic";
import ReviewLists from "./ReviewLists/ReviewLists";

const ProductReview = ({ reviewProducts, handleReviewShowModal }: any) => {
    return (
        <Tab.Panel>
            <ReviewStatistic reviewProducts={reviewProducts} />
            <ReviewLists
                reviewProducts={reviewProducts}
                handleReviewShowModal={handleReviewShowModal}
            />
        </Tab.Panel>
    );
};

export default ProductReview;
