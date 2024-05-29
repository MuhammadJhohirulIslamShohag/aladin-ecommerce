import React from "react";
import Product from "../../../Molecules/Skeletons/Product/Product";
import SectionTitle from "../../../Molecules/Skeletons/SectionTitle";

const ProductsSkeleton = () => {
    return (
        <div className="container">
            <div>
                <SectionTitle />
            </div>
            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5">
                <Product />
                <Product />
                <Product />
                <Product />
            </div>
        </div>
    );
};

export default ProductsSkeleton;
