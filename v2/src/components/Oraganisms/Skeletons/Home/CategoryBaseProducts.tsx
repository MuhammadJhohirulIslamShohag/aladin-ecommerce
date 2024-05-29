import React from "react";
import PlainProducts from "../Products/PlainProducts";
import SectionTitle from "../../../Molecules/Skeletons/SectionTitle";

const CategoryBaseProducts = () => {
    return (
        <div className="container">
            <div>
                <SectionTitle />
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
                <PlainProducts />
                <PlainProducts />
                <PlainProducts />
            </div>
        </div>
    );
};

export default CategoryBaseProducts;
