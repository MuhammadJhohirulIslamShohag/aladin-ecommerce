"use client"

import React from "react";
import ProductCard from "../../Molecules/Products/ProductCard";
import SectionTitle from "../../Molecules/SectionTitle";

import { IProduct } from "@/types/product.type";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

interface FeaturedProductsProps {
    products: IProduct[];
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
    products = [],
}) => {
    return (
        <div>
            <SectionTitle title={"Feature Products"} />
            <Swiper
                slidesPerView={1}
                spaceBetween={15}
                navigation={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                modules={[Navigation, Autoplay]}
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 15,
                    },
                    1024: {
                        slidesPerView: 5,
                        spaceBetween: 16,
                    },
                    1200: {
                        slidesPerView: 5,
                        spaceBetween: 16,
                    },
                }}
                className="featured_products lg:h-[477px] md:h-[478px] h-[462px]"
            >
                {products?.map((product: IProduct) => (
                    <SwiperSlide key={product._id}>
                        <ProductCard key={product._id} product={product} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default FeaturedProducts;
