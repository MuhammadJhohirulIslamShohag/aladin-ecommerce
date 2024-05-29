import React from "react";
import ProductDetailLeft from "./ProductDetailLeft";
import ProductDetailRight from "./ProductDetailRight";

const ProductDetailsTop = () => {
    return (
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-3">
            <div>
                <ProductDetailLeft />
            </div>
            <div>
                <ProductDetailRight />
            </div>
        </div>
    );
};

export default ProductDetailsTop;
