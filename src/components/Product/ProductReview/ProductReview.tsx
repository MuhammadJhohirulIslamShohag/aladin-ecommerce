import React from "react";
import { Tab } from "@headlessui/react";
import ReviewStatistic from "./ReviewStatistic/ReviewStatistic";
import CreateReview from "./CreateReview";
import ReviewLists from "./ReviewLists";

const ProductReview = ({ product }: any) => {
    return (
        <Tab.Panel>
            <ReviewStatistic product={product}/>
            <CreateReview />
            <ReviewLists />
        </Tab.Panel>
    );
};

export default ProductReview;
