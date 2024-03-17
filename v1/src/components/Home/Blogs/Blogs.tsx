/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper";
import Blog from "@/components/Blog/Blog";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import { IBlog } from "types/blog.types";
import { getListOfBlogs } from "@/api/blog";
import Loader from "@/components/Loader/Loader";

const Blogs = () => {
    const [blogsData, setBlogsData] = useState<IBlog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadingBlogs();
    }, []);

    const loadingBlogs = () => {
        setLoading(true)
        getListOfBlogs()
            .then((res) => {
                setBlogsData(res.data);
                setLoading(false)
            })
            .catch((error) => {
                console.log(error);
                setLoading(false)
            });
    };


    return (
        <div
            data-aos="fade-up"
            data-aos-offset="200"
            data-aos-delay="1"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            className="container py-16 md:py-12 sm:py-2"
            id="blogs"
        >
            <SectionTitle title="Popular Blogs" />
            {loading ? (
                <Loader height={"h-[450px]"} />
            ) : (
                <Swiper
                    slidesPerView={1}
                    navigation={true}
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true
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
                    {blogsData?.map((blog) => (
                        <SwiperSlide key={blog._id}>
                            <Blog key={blog._id} blog={blog} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}

        </div>
    );
};

export default Blogs;
