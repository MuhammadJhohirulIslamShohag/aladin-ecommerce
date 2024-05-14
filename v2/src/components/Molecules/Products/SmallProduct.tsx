"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import toast from "react-hot-toast";

import { IProduct } from "@/types/product.type";

import SmallProductCard from "./SmallProductCard";
import CompareProductInfo from "./CompareProductInfo";
import ProductCartPreview from "./ProductCartPreview";
import CustomModal from "../../Atoms/Modal/CustomModal";

interface ModalState {
    open: boolean;
    data: IProduct | null;
}

interface SmallProductProps {
    products: IProduct[];
}

const SmallProduct: React.FC<SmallProductProps> = ({ products = [] }) => {
    const [cartModal, setCartModal] = useState<ModalState>({
        open: false,
        data: null,
    });
    const [compareModal, setCompareModal] = useState<ModalState>({
        open: false,
        data: null,
    });

    const handleAddCart = (product: IProduct) => {
        setCartModal((prev) => ({
            ...prev,
            open: true,
            data: { ...product },
        }));
    };

    const handleCompare = (product: IProduct) => {
        setCompareModal((prev) => ({
            ...prev,
            open: true,
            data: product,
        }));
    };

    const handleWishListProduct = (product: IProduct) => {
        toast.success(`Added Product Wish List`);
    };

    return (
        <>
            <Swiper
                slidesPerView={1}
                autoplay={{
                    delay: 32000,
                    disableOnInteraction: false,
                }}
                spaceBetween={30}
                modules={[Pagination, Autoplay]}
                pagination={{
                    clickable: true,
                }}
                className="small_product_slider"
            >
                <SwiperSlide>
                    {products?.slice(0, 4)?.map((product) => (
                        <div key={product?._id}>
                            <SmallProductCard
                                handleAddCart={handleAddCart}
                                handleCompare={handleCompare}
                                handleWishListProduct={handleWishListProduct}
                                product={product}
                            />
                        </div>
                    ))}
                </SwiperSlide>
                <SwiperSlide>
                    {products?.slice(4, 8)?.map((product) => (
                        <div key={product?._id}>
                            <SmallProductCard
                                handleAddCart={handleAddCart}
                                handleCompare={handleCompare}
                                handleWishListProduct={handleWishListProduct}
                                product={product}
                            />
                        </div>
                    ))}
                </SwiperSlide>
            </Swiper>

            {cartModal?.open && cartModal?.data && (
                <CustomModal
                    onClose={() =>
                        setCartModal((prev) => ({
                            ...prev,
                            open: false,
                            data: null,
                        }))
                    }
                >
                    <ProductCartPreview
                        product={cartModal?.data}
                        handleClose={() =>
                            setCartModal((prev) => ({
                                ...prev,
                                open: false,
                                data: null,
                            }))
                        }
                    />
                </CustomModal>
            )}
            {compareModal?.open && (
                <CustomModal
                    onClose={() =>
                        setCompareModal((prev) => ({
                            ...prev,
                            open: false,
                            data: null,
                        }))
                    }
                >
                    <CompareProductInfo
                        onCloseCompareModal={() =>
                            setCompareModal((prev) => ({
                                ...prev,
                                open: false,
                                data: null,
                            }))
                        }
                        compareProductName={compareModal?.data?.name as string}
                    />
                </CustomModal>
            )}
        </>
    );
};

export default SmallProduct;
