import React, { useRef, useState, useEffect } from "react";
import { IProduct } from "./../../../../types/product.type";
import { Swiper } from "swiper/react";
import { Navigation } from "swiper";
import { SwiperSlide } from "swiper/react";
import Product from "./../../Product/Product";
import SectionTitle from "./../../SectionTitle/SectionTitle";
import NavigationSliderButton from "@/components/NavigationSliderButton/NavigationSliderButton";

type PropsType = {
    products:IProduct[]
};

const BestSellers = ({ products }: PropsType) => {
    const [productData, setProductData] = useState<IProduct[]>([])
    const swiperRef: any = useRef();

    useEffect(()=> {
        setProductData(products);
    }, [products]);

    return (
        <div className="container py-20 sm:py-8">
            <SectionTitle title="Best Sellers" />
            <>
                <NavigationSliderButton
                    swiperRef={swiperRef}
                    isMobile={false}
                />

                <>
                    <Swiper
                        slidesPerView={1}
                        loop={true}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Navigation]}
                        onBeforeInit={(swiper) => {
                            swiperRef.current = swiper;
                        }}
                        className="h-[480px] sm:h-[508px]"
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
                        {productData?.map((product: IProduct) => (
                            <SwiperSlide key={product._id}>
                                <Product product={product} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </>
                <NavigationSliderButton swiperRef={swiperRef} isMobile={true} />
            </>
        </div>
    );
};

export default BestSellers;
