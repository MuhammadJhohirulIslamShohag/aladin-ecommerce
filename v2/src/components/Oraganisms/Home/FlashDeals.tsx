"use client";
import React from "react";
import { MdFlashOn } from "react-icons/md";

import FlashDeal from "@/components/Molecules/Products/FlashDeal";
import CountDown from "@/components/Molecules/CountDown";
import SectionTitle from "../../Molecules/SectionTitle";

import { IProduct } from "@/types/product.type";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

type FlashDealsPropsType = {
    products: IProduct[];
};
const FlashDeals = ({ products }: FlashDealsPropsType) => {
    let content = null;

    if (products.length) {
        content = (
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
                        slidesPerView: 2,
                        spaceBetween: 15,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 16,
                    },
                    1200: {
                        slidesPerView: 5,
                        spaceBetween: 16,
                    },
                }}
                className="surprising_sales lg:h-[505px] md:h-[478px] h-[462px]"
            >
                <div className="flex flex-wrap pl-1 justify-center">
                    {products?.map((product: IProduct) => (
                        <SwiperSlide key={product._id}>
                            <FlashDeal product={product} />
                        </SwiperSlide>
                    ))}
                </div>
            </Swiper>
        );
    }

    if (!products.length) {
        content = <h1> There is no products</h1>;
    }

    return (
        <div
            data-aos="fade-up"
            data-aos-offset="200"
            data-aos-delay="1"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            className="container mb-12"
        >
            <div className="flex items-center justify-between lg:mb-3 md:mb-7 mb-7">
                <SectionTitle title={'Surprising Sells'} className="lg:mb-6 mb-0" />
                <CountDown date={new Date(2024, 11, 30)} />
            </div>
            <div>{content}</div>
        </div>
    );
};

export default FlashDeals;
