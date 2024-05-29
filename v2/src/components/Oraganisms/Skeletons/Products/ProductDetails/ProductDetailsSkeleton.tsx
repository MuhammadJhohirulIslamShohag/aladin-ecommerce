import React from "react";
import ProductDetailsTop from "../../../../Molecules/Skeletons/Product/ProductDetails/ProductDetailsTop/ProductDetailsTop";
import ProductDetailsBottom from "../../../../Molecules/Skeletons/Product/ProductDetails/ProductDetailsBottom/ProductDetailsBottom";

const ProductDetailsSkeleton = () => {
    return (
        <div className="container py-9">
            <div>
                <ProductDetailsTop />
            </div>
            <div className="mt-3">
                <ProductDetailsBottom />
            </div>
        </div>
    );
};

export default ProductDetailsSkeleton;
