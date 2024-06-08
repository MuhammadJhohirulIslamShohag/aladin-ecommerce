"use client";

import FeaturedSubCategory from "../../Molecules/Home/FeaturedSubCategory";
import Empty from "../../Molecules/Empty";

import { ISubCategory } from "@/types/sub-category.type";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
// Import Swiper styles
import "swiper/css";

interface FeaturedSubCategoryProps {
    subCategories: ISubCategory[];
}

const FeaturedSubCategories: React.FC<FeaturedSubCategoryProps> = ({
    subCategories,
}) => {
    let content = null;

    if (subCategories?.length) {
        content = (
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
                {subCategories.map((subCategory) => (
                    <SwiperSlide key={subCategory?._id}>
                        <FeaturedSubCategory data={subCategory} />
                    </SwiperSlide>
                ))}
            </Swiper>
        );
    }

    if (!subCategories?.length) {
        content = <Empty description="No Product Data" />;
    }
    return <div className="lg:pb-10 md:pb-7 pb-5">{content}</div>;
};

export default FeaturedSubCategories;
