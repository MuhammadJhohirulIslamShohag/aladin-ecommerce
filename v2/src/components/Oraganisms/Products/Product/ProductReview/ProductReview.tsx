import React from "react";
import { Tab } from "@headlessui/react";

import ReviewLists from "./ReviewLists/ReviewLists";
import ReviewStatistic from "../../../../Molecules/Products/Product/ProductReview/ReviewStatistic/ReviewStatistic";

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
