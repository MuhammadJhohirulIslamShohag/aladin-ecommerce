"use client";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/navigation";
// import required modules
import { Grid, Navigation, Autoplay } from "swiper/modules";

import FlatProductCard from "../../Molecules/Products/FlatProductCard";
import ProductCard from "../../Molecules/Products/ProductCard";
import SectionTitle from "../../Molecules/SectionTitle";
import { IProduct } from "@/types/product.type";

interface TopProductsProps {
    products: IProduct[];
}

const TopProducts: React.FC<TopProductsProps> = ({ products }) => {
    return (
        <div>
            <SectionTitle title={"Top Products"} />
            <div className="lg:grid grid-cols-12 justify-between gap-6 lg:space-y-0 space-y-7 ">
                <div className="xl:col-span-9 lg:col-span-7">
                    <div className="lg:block hidden">
                        <Swiper
                            slidesPerView={2}
                            grid={{
                                rows: 2,
                                fill: "row",
                            }}
                            autoplay={{
                                delay: 152000,
                                disableOnInteraction: false,
                            }}
                            spaceBetween={10}
                            modules={[Grid, Autoplay]}
                            className="top_product"
                        >
                            {products?.map((product) => (
                                <div key={product?._id}>
                                    <SwiperSlide>
                                        <FlatProductCard product={product} />
                                    </SwiperSlide>
                                </div>
                            ))}
                        </Swiper>
                    </div>
                    <div className="lg:hidden block">
                        <Swiper
                            slidesPerView={2}
                            breakpoints={{
                                0: {
                                    slidesPerView: 1,
                                },
                                768: {
                                    slidesPerView: 2,
                                },
                            }}
                            spaceBetween={10}
                            navigation={true}
                            modules={[Navigation, Autoplay]}
                            className="top_product"
                        >
                            {products?.map((product) => (
                                <div key={product?._id}>
                                    <SwiperSlide>
                                        <FlatProductCard product={product} />
                                    </SwiperSlide>
                                </div>
                            ))}
                        </Swiper>
                    </div>
                </div>
                <div className="xl:col-span-3 lg:col-span-5  text-white lg:flex hidden justify-center items-center  rounded-md py-3 lg:h-full xl:h-[380px]">
                    {products?.slice(0, 1)?.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TopProducts;
