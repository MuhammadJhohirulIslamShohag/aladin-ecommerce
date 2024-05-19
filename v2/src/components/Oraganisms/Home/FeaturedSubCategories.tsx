"use client";

import SectionTitle from "../../Molecules/SectionTitle";
import featuredCategoryData from "./../../../data/featuredCategoryData";
import FeaturedSubCategory from "../../Molecules/Home/FeaturedSubCategory";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
// Import Swiper styles
import "swiper/css";

const FeaturedSubCategories = () => {
    return (
        <div className="my-10">
            <Swiper
                slidesPerView={8}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                modules={[Autoplay]}
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                    },
                    640: {
                        slidesPerView: 1,
                    },
                    768: {
                        slidesPerView: 3,
                    },
                    1024: {
                        slidesPerView: 6,
                    },
                    1200: {
                        slidesPerView: 8,
                    },
                }}
                className="featured_sub_categories"
            >
                {featuredCategoryData.map((featuredItem) => (
                    <SwiperSlide key={featuredItem?.id}>
                        <FeaturedSubCategory data={featuredItem} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default FeaturedSubCategories;
