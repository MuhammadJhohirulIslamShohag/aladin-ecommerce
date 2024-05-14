"use client";

import { useState } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import ProductImageModal from "../../Molecules/Modal/ProductImageModal";
import SectionTitle from "../../Molecules/SectionTitle";
import FollowUsSocialCard from "../../Molecules/Social/FollowUsSocialCard";

import { IProduct } from "@/types/product.type";

const FollowUsSocial: React.FC<{ products: IProduct[] }> = ({ products }) => {
    // state handling
    const [imageState, setImageState] = useState<{
        selectedImage: string[] | null;
        currentIndex: number;
        link: string;
        imageName: string;
    }>({
        selectedImage: null,
        currentIndex: 0,
        link: "",
        imageName: "",
    });

    // handle image click
    const handleImageClick = (social: IProduct, index: number) => {
        setImageState((prev) => ({
            ...prev,
            selectedImage: social?.imageURLs,
            currentIndex: index,
            link: `/${social?.slug}`,
            imageName: social?.name || "social-media-picture",
        }));
    };

    return (
        <div>
            <SectionTitle title={"Follow Us On Social"} />
            <div>
                <Swiper
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                            spaceBetween: 0,
                        },
                        768: {
                            slidesPerView: 5,
                        },
                        1200: {
                            slidesPerView: 7,
                        },
                    }}
                    pagination={{
                        clickable: false,
                    }}
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                    }}
                    modules={[Autoplay]}
                    className="mySwiper"
                >
                    {products?.map((product, index) => (
                        <SwiperSlide key={index}>
                            <FollowUsSocialCard
                                handleImageClick={handleImageClick}
                                social={product}
                                name={product?.name}
                                idx={index}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            {imageState?.selectedImage && (
                <ProductImageModal
                    isSingle
                    onClose={() =>
                        setImageState((prev) => ({
                            ...prev,
                            selectedImage: null,
                            currentIndex: 0,
                            link: "",
                            imageName: "",
                        }))
                    }
                    imageURLs={imageState?.selectedImage}
                    productName={imageState?.imageName}
                    initialIndex={imageState?.currentIndex}
                    link={imageState?.link}
                />
            )}
        </div>
    );
};

export default FollowUsSocial;
