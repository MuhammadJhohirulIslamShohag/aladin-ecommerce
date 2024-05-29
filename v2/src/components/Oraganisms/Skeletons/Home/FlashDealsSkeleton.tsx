import React from "react";
import FlashDeal from "../../../Molecules/Skeletons/Product/FlashDeal";
import SectionTitleFlashDeal from "../../../Molecules/Skeletons/SectionTitleFlashDeal";

const FlashDealsSkeleton = () => {
    return (
        <div className="container">
            <SectionTitleFlashDeal />
            <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5">
                <FlashDeal />
                <FlashDeal />
                <FlashDeal />
                <FlashDeal />
                <FlashDeal />
            </div>
        </div>
    );
};

export default FlashDealsSkeleton;
