"use client";

import Blog from "../../Molecules/Blog";
import SectionTitle from "../../Molecules/SectionTitle";
import Empty from "@/components/Molecules/Empty";

// Import Swiper React components
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { blogsData } from "@/data/blogs";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

const Blogs = () => {
    let content = null;

    if (blogsData.length) {
        content = (
            <Swiper
                slidesPerView={1}
                navigation={true}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                modules={[Navigation, Autoplay]}
                className="md:h-[600px] h-[555px] blog_swiper"
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 15,
                    },
                    1024: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    1200: {
                        slidesPerView: 3,
                        spaceBetween: 25,
                    },
                }}
            >
                {blogsData?.map((blog) => (
                    <SwiperSlide key={blog._id}>
                        <Blog key={blog._id} blog={blog} />
                    </SwiperSlide>
                ))}
            </Swiper>
        );
    }

    if (!blogsData.length) {
        content = <Empty description="No Blog Data" />;
    }

    return (
        <div
            data-aos="fade-up"
            data-aos-offset="200"
            data-aos-delay="1"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            className="container lg:pt-16 md:pt-12 pt-2"
            id="blogs"
        >
            <SectionTitle title="Popular Blogs" />
            {content}
        </div>
    );
};

export default Blogs;
