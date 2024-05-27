"use client";

import React, { startTransition, useState } from "react";
import { useRouter,usePathname  } from "next/navigation";
import toast from "react-hot-toast";
import _ from "lodash";

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
import {
    getWishListProducts,
    storeWishListProducts,
} from "@/store/wishList/wishList.product";

import { getUserInfo } from "@/store/user/users";
import { useStoreContext } from "@/contexts/StoreContextProvider";
import { StoreActionType } from "@/contexts/storeReducer/storeReducer.type";
import { useAddWishlistMutation } from "@/redux/services/wishlist/wishListApiService";

interface NewArrivalsProps {
    products: IProduct[];
}

interface IModalState {
    open: boolean;
    data: IProduct | null;
}

const NewArrivals: React.FC<NewArrivalsProps> = ({ products }) => {
    const user = getUserInfo();
    const { dispatch } = useStoreContext();
    const router = useRouter();
    const pathname = usePathname()

    // redux api call
    const [addWishList] = useAddWishlistMutation();

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
        if (user?.user) {
            // all wish list products array
            let wishListProducts = getWishListProducts();

            // added wish list product
            wishListProducts.push({
                ...product,
            });
            // remove duplicates
            const uniqueWishListProducts = _.uniqWith(
                wishListProducts,
                _.isEqual
            );

            // set cart object in windows localStorage
            startTransition(() => {
                storeWishListProducts(JSON.stringify(uniqueWishListProducts));
                // added cart in store context
                dispatch({
                    type: StoreActionType.ADD_TO_WISH,
                    payload: uniqueWishListProducts,
                });
            });

            await addWishList(product?._id).then((res) => {
                if ("data" in res && res.data && res.data?.success) {
                    toast.success("Wish-List is Added!");
                } else {
                    toast.error("Failed To Add Wish-List!");
                }
            });
            toast.success(`Added Product Wish List`);
        } else {
            return router.push(`/auth/login?redirect=${pathname}`);
        }
    };

    return (
        <>
            <div className="container lg:py-36 md:py-16 py-10">
                <SectionTitle title={"New Arrivals"} />
                <div className="lg:grid grid-cols-12 justify-between gap-6 lg:space-y-0 space-y-7 ">
                    <div className="xl:col-span-3 lg:col-span-5 text-white lg:flex hidden justify-center items-center rounded-md py-3 lg:h-full xl:h-[380px]">
                        {products?.slice(0, 1)?.map((product) => (
                            <ProductCard
                                key={product._id}
                                product={product}
                                handleAddCart={handleAddCart}
                                handleCompare={handleCompare}
                                handleWishListProduct={handleWishListProduct}
                                handleProductView={handleProductView}
                            />
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

export default NewArrivals;
