"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import FlatProductCard from "../../Molecules/Products/FlatProductCard";
import CustomModal from "../../Atoms/Modal/CustomModal";
import ProductCard from "../../Molecules/Products/ProductCard";
import SectionTitle from "../../Molecules/SectionTitle";
import ProductCartPreview from "../../Molecules/Products/ProductCartPreview";
import CompareProductInfo from "../../Molecules/Products/CompareProductInfo";
import ProductView from "../../Molecules/Products/ProductView";

import { IProduct } from "@/types/product.type";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Navigation, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/navigation";

interface NewArrivalsProps {
    products: IProduct[];
}

interface IModalState {
    open: boolean;
    data: IProduct | null;
}

const NewArrivals: React.FC<NewArrivalsProps> = ({ products }) => {
    const [cartModal, setCartModal] = useState<IModalState>({
        open: false,
        data: null,
    });
    const [compareModal, setCompareModal] = useState<IModalState>({
        open: false,
        data: null,
    });
    const [productViewModal, setProductViewModal] = useState<IModalState>({
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

    const handleProductView = (product: IProduct) => {
        setProductViewModal((prev) => ({
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
            <div>
                <SectionTitle title={"New Arrivals"} />
                <div className="lg:grid grid-cols-12 justify-between gap-6 lg:space-y-0 space-y-7 ">
                    <div className="xl:col-span-3 lg:col-span-5 text-white lg:flex hidden justify-center items-center rounded-md py-3 lg:h-full xl:h-[380px]">
                        {products?.slice(0, 1)?.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
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
                                    <SwiperSlide key={product?._id}>
                                        <FlatProductCard
                                            product={product}
                                            handleAddCart={handleAddCart}
                                            handleCompare={handleCompare}
                                            handleWishListProduct={
                                                handleWishListProduct
                                            }
                                            handleProductView={
                                                handleProductView
                                            }
                                        />
                                    </SwiperSlide>
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
                                    <SwiperSlide key={product?._id}>
                                        <FlatProductCard
                                            product={product}
                                            handleAddCart={handleAddCart}
                                            handleCompare={handleCompare}
                                            handleWishListProduct={
                                                handleWishListProduct
                                            }
                                            handleProductView={
                                                handleProductView
                                            }
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
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
            {compareModal?.open && compareModal?.data && (
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
                        compareProductName={compareModal?.data?.name}
                    />
                </CustomModal>
            )}

            {productViewModal?.open && productViewModal?.data && (
                <CustomModal
                    onClose={() =>
                        setProductViewModal((prev) => ({
                            ...prev,
                            open: false,
                            data: null,
                        }))
                    }
                >
                    <ProductView
                        product={productViewModal?.data}
                        setProductView={() =>
                            setProductViewModal((prev) => ({
                                ...prev,
                                open: false,
                                data: null,
                            }))
                        }
                    />
                </CustomModal>
            )}
        </>
    );
};

export default NewArrivals;
