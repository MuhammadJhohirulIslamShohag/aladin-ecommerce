"use client";
import _ from "lodash";
import React, { startTransition, useState } from "react";

// Import Swiper React components
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import toast from "react-hot-toast";
import "swiper/css";
import "swiper/css/navigation";

import CustomModal from "../../Atoms/Modal/CustomModal";
import CompareProductInfo from "../../Molecules/Products/CompareProductInfo";
import ProductCard from "../../Molecules/Products/ProductCard";
import ProductCartPreview from "../../Molecules/Products/ProductCartPreview";
import ProductView from "../../Molecules/Products/ProductView";
import SectionTitle from "../../Molecules/SectionTitle";

import { addToWishList } from "@/api/user";
import { useStoreContext } from "@/contexts/StoreContextProvider";
import { StoreActionType } from "@/contexts/storeReducer/storeReducer.type";
import { getUserInfo } from "@/store/user/users";
import {
    getWishListProducts,
    storeWishListProducts,
} from "@/store/wishList/wishList.product";
import { IProduct } from "@/types/product.type";

interface FeaturedProductsProps {
    products: IProduct[];
}

interface IModalState {
    open: boolean;
    data: IProduct | null;
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
    products = [],
}) => {
    const user = getUserInfo();
    const { dispatch } = useStoreContext();

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

    const handleWishListProduct = async (product: IProduct) => {
        // all wish list products array
        let wishListProducts = getWishListProducts();

        // added wish list product
        wishListProducts.push({
            ...product,
        });
        // remove duplicates
        const uniqueWishListProducts = _.uniqWith(wishListProducts, _.isEqual);

        // set cart object in windows localStorage
        startTransition(() => {
            storeWishListProducts(JSON.stringify(uniqueWishListProducts));
            // added cart in store context
            dispatch({
                type: StoreActionType.ADD_TO_WISH,
                payload: uniqueWishListProducts,
            });
        });

        await addToWishList(user?.token, product?._id).then((res) => {
            if (res?.data?.success) {
                toast.success(res?.data?.message, {
                    duration: 5000,
                });
            }
        });
        toast.success(`Added Product Wish List`);
    };

    return (
        <>
            <div className="container">
                <SectionTitle title={"Feature Products"} />
                <Swiper
                    slidesPerView={1}
                    spaceBetween={15}
                    navigation={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    }}
                    modules={[Navigation, Autoplay]}
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 15,
                        },
                        1024: {
                            slidesPerView: 5,
                            spaceBetween: 16,
                        },
                        1200: {
                            slidesPerView: 5,
                            spaceBetween: 16,
                        },
                    }}
                    className="featured_products lg:h-[477px] md:h-[420px] h-[462px]"
                >
                    {products?.map((product: IProduct) => (
                        <SwiperSlide key={product._id}>
                            <ProductCard
                                handleAddCart={handleAddCart}
                                handleCompare={handleCompare}
                                handleWishListProduct={handleWishListProduct}
                                handleProductView={handleProductView}
                                key={product._id}
                                product={product}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
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
                        compareProduct={compareModal?.data}
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

export default FeaturedProducts;
