import React from "react";
import { IProduct } from "./../../../../types/product.type";
import Product from "./../../Product/Product";
import SectionTitle from "./../../SectionTitle/SectionTitle";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper";

type PropsType = {
    products: IProduct[];
};
const NewArrivals = ({ products }: PropsType) => {

    return (
        <div
            data-aos="fade-up"
            data-aos-offset="200"
            data-aos-delay="1"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out" className="container py-6 sm:py-6"
        >
            <SectionTitle title="New Arrivals" />
            <div className="mt-8 sm:mt-6">
                <Swiper
                    slidesPerView={1}
                    navigation={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true
                    }}
                    modules={[Navigation, Autoplay]}
                    className="h-[560px] md:h-[590px] sm:h-[585px] new_arrivals_swiper"
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
                    {products?.map((product: IProduct) => (
                        <SwiperSlide key={product._id}>
                            <Product product={product} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default NewArrivals;
