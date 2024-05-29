import React from "react";
import Product from "../../../Molecules/Skeletons/Product/Product";

const ShopProductsSkeleton = ({ numbers = 8 }) => {
    const skeleton = () => {
        let skeletonCard: JSX.Element[] = [];
        for (let i = 0; i < numbers; i++) {
            skeletonCard.push(<Product />);
        }
        return skeletonCard;
    };

    return <>{skeleton()}</>;
};

export default ShopProductsSkeleton;
