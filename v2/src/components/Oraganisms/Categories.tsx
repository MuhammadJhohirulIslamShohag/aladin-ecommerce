"use client";

import Category from "../Molecules/Category";
import Empty from "../Molecules/Empty";

import { ICategory } from "@/types/category.type";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
// Import Swiper styles
import "swiper/css";

const Categories = ({ data }: { data: ICategory[] }) => {
    let content = null;

    if (data.length) {
        content = (
            <Swiper
                slidesPerView={4}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                spaceBetween={20}
                modules={[Autoplay]}
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                    },
                    640: {
                        slidesPerView: 1,
                    },
                    768: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                    1200: {
                        slidesPerView: 4,
                    },
                }}
                className="h-[463px] categories"
            >
                {data.map((category: ICategory) => (
                    <SwiperSlide key={category?._id}>
                        <Category key={category._id} category={category} />
                    </SwiperSlide>
                ))}
            </Swiper>
        );
    }

    if (!data.length) {
        content = <Empty description="No Category Data" />;
    }

    return (
        <>
            <div
                data-aos="fade-up"
                data-aos-delay="1"
                className="lg:pb-24 md:pb-16 pb-10"
            >
                {content}
            </div>
        </>
    );
};

export default Categories;
