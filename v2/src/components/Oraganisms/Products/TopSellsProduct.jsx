import React from "react";

import PlainProductCard from "../../Molecules/Products/PlainProductCard";
import SectionTitle from "../../Molecules/SectionTitle";

const TopSellsProduct = ({ products }) => {
    return (
        <div>
            <SectionTitle title={"Top Sells"} />
            <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-5">
                <div className="">
                    {products?.slice(0, 5)?.map((product) => (
                        <PlainProductCard key={product.id} data={product} />
                    ))}
                </div>

                <div className="lg:block hidden">
                    {products?.slice(5, 10)?.map((product) => (
                        <PlainProductCard key={product.id} data={product} />
                    ))}
                </div>
                <div className="lg:block hidden">
                    {products?.slice(10, 15)?.map((product) => (
                        <PlainProductCard key={product.id} data={product} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TopSellsProduct;
