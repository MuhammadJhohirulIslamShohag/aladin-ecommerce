import React from "react";
import Banner from "../../Molecules/Carousel/Banner";
import EffectCardsSlider from "../../Molecules/Carousel/EffectCardsSlider";
import ComparisonProduct from "../../Molecules/Compare/ComparisonProduct";

import { IProduct } from "@/types/product.type";

interface IHeroProps {
    products: IProduct[];
}
const Hero: React.FC<IHeroProps> = ({ products }) => {
    return (
        <div className="container mx-auto px-6 lg:h-[550px] h-full mb-10">
            <div className="flex lg:flex-row flex-col gap-4">
                <div className="w-full xl:w-[75%] lg:w-[70%]">
                    <Banner />
                </div>
                <div className="flex lg:flex-col md:flex-row flex-col xl:w-[25%] lg:w-[30%]  w-full pt-3 lg:space-y-4 md:space-y-0 space-y-6">
                    <ComparisonProduct products={products} />
                    <EffectCardsSlider products={products} />
                </div>
            </div>
        </div>
    );
};

export default Hero;
