"use client";

import SubCategory from "../Molecules/SubCategory";
import SectionTitle from "../Molecules/SectionTitle";

import { ISubCategory } from "@/types/sub-category.type";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const SubCategories = ({ data }: { data: ISubCategory[] }) => {
    let content = null;

    if (data.length) {
        content = (
            <Swiper
                slidesPerView={1}
                navigation={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                modules={[Navigation, Autoplay]}
                className="sm:h-64 h-[374px] md:h-[288px] sub_categories_swiper"
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 30,
                    },
                    1200: {
                        slidesPerView: 5,
                        spaceBetween: 30,
                    },
                }}
            >
                {data?.map((subCategory: ISubCategory) => (
                    <SwiperSlide
                        key={subCategory._id}
                        style={{ height: "366px" }}
                    >
                        <SubCategory subCategory={subCategory} />
                    </SwiperSlide>
                ))}
            </Swiper>
        );
    }

    if (!data.length) {
        content = <h1> There is no sub-category</h1>;
    }

    return (
        <section
            data-aos="fade-up"
            data-aos-offset="100"
            data-aos-delay="1"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            className="container py-24 md:py-20 sm:py-12 "
        >
            <SectionTitle title="Sub Category" />

            <div className="mt-10 sm:mt-5">{content}</div>
        </section>
    );
};

export default SubCategories;
