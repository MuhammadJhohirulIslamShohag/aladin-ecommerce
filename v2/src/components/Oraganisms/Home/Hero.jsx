import React from "react";
import HomeCarousel from "../../Molecules/Carousel/HomeCarousel";
import ComparisonProduct from "../../Molecules/Home/ComparisonProduct";
// import EffectCardsSlider from "../../Molecules/Carousel/EffectCardsSlider";

const Hero = () => {
    return (
        <div className="container mx-auto px-6 lg:h-[550px] h-full mb-10">
            <div className="flex lg:flex-row flex-col gap-4">
                <div className="w-full xl:w-[75%] lg:w-[70%]">
                    <HomeCarousel />
                </div>
                <div className="flex lg:flex-col md:flex-row flex-col xl:w-[25%] lg:w-[30%]  w-full pt-3 lg:space-y-4 md:space-y-0 space-y-6">
                    <ComparisonProduct />
                    {/* <EffectCardsSlider />  */}
                </div>
            </div>
        </div>
    );
};

export default Hero;
