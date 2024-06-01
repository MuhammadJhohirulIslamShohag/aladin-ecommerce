"use client";

import Blog from "../../Molecules/Blog";
import SectionTitle from "../../Molecules/SectionTitle";

import { IBlog } from "@/types/blog.types";

// Import Swiper React components
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import Empty from "@/components/Molecules/Empty";

const Blogs = ({ blogs }: { blogs: IBlog[] }) => {
    let content = null;

    if (blogs.length) {
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
                className="h-[610px] sm:h-[570px] blog_swiper"
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
                {blogs?.map((blog) => (
                    <SwiperSlide key={blog._id}>
                        <Blog key={blog._id} blog={blog} />
                    </SwiperSlide>
                ))}
            </Swiper>
        );
    }

    if (!blogs.length) {
        content = <Empty description="No Blog Data" />;
    }

    return (
        <div
            data-aos="fade-up"
            data-aos-offset="200"
            data-aos-delay="1"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            className="container lg:py-16 md:py-12 py-2"
            id="blogs"
        >
            <SectionTitle title="Popular Blogs" />
            {content}
        </div>
    );
};

export default Blogs;
