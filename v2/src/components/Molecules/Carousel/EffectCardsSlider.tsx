"use client";

import Link from "next/link";
import ValidateImage from "../../Atoms/ValidateImage";

import { IProduct } from "@/types/product.type";
import { Autoplay, EffectCards } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-cards";

const EffectCardsSlider: React.FC<Props> = ({ products }) => {
    return (
        <div className="lg:w-[78%] md:w-[37%] w-[75%] h-full mx-auto">
            {products?.length ? (
                <Swiper
                    effect={"cards"}
                    grabCursor={true}
                    modules={[EffectCards, Autoplay]}
                    autoplay={{ delay: 2000, disableOnInteraction: true }}
                    className="effect_cards_swiper h-full"
                >
                    {products?.map((product: IProduct) => (
                        <SwiperSlide key={product._id}>
                            <Link href={`products/${product._id}`}>
                                <ValidateImage
                                    className="max-h-full h-full w-full object-fill"
                                    imageUrl={product.imageURLs?.[0]}
                                    alt={product.name}
                                />
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : (
                <ValidateImage
                    className="max-h-full h-full w-full object-fill"
                    imageUrl="/placeholder.jpg"
                    alt={"Aladin placeholder"}
                />
            )}
        </div>
    );
};

interface Props {
    products: IProduct[];
}

export default EffectCardsSlider;
