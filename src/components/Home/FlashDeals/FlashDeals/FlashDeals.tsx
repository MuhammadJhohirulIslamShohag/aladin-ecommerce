import React from "react";
import { MdFlashOn } from "react-icons/md";
import FlashDeal from "./../FlashDeal/FlashDeal";
import { IProduct } from "types/product.type";
import CountDown from "@/components/CountDown/CountDown";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay} from "swiper";

type FlashDealsPropsType = {
    products:IProduct[]
};
const FlashDeals = ({products}:FlashDealsPropsType) => {
    return (
        <div>
            <div className="p-2 flex sm:flex-col items-center justify-between text-white font-black text-2xl uppercase bg-green-300 mb-10 px-10">
                <h2 className="text-black sm:text-lg">
                    Surprising Sells
                    <MdFlashOn className="inline-block text-black"/>
                </h2>
                <CountDown date={new Date(2023, 11, 30)}/>
            </div>
            <div className="container">
                <Swiper
                    slidesPerView={1}
                    spaceBetween={15}
                    navigation={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    modules={[Navigation, Autoplay]}
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 15,
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 20,
                        },
                        1200: {
                            slidesPerView: 5,
                            spaceBetween: 25,
                        },
                    }}
                    className="surprising_sales h-[560px]"
                >
                    <div className="flex flex-wrap pl-1 md:justify-center sm:justify-center">
                    {products?.map((product: IProduct) => (
                            <SwiperSlide key={product._id}>
                                 <FlashDeal product={product}/>
                            </SwiperSlide>
                        ))}
                    </div>
                </Swiper>
            </div>
        </div>
    );
};

export default FlashDeals;
