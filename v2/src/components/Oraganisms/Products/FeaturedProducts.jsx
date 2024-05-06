import React from "react";
import ProductCard from "../../Molecules/Products/ProductCard";
import SectionTitle from "../../Molecules/SectionTitle";
import FeaturedProductCardSkeleton from "../../Skeleton/Home/FeaturedProductCardSkeleton";

const FeaturedProducts = ({ products = [], isLoading }) => {
    return (
        <div>
            <SectionTitle title={"Feature Products"} />
            <div className="grid grid-cols-2 md:grid-cols-3  lg:grid-cols-5 my-8 gap-4 px-2 lg:px-0 ">
                {isLoading ? (
                    <FeaturedProductCardSkeleton count={10} />
                ) : (
                    <>
                        {products?.slice(0, 8)?.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};

export default FeaturedProducts;
