"use client";
import _ from "lodash";
import { usePathname, useRouter } from "next/navigation";
import React, { startTransition, useState } from "react";
import toast from "react-hot-toast";

import CustomModal from "../../Atoms/Modal/CustomModal";
import CompareProductInfo from "../../Molecules/Products/CompareProductInfo";
import ProductCard from "../../Molecules/Products/ProductCard";
import ProductCartPreview from "../../Molecules/Products/ProductCartPreview";
import ProductView from "../../Molecules/Products/ProductView";

import { useStoreContext } from "@/contexts/StoreContextProvider";
import { StoreActionType } from "@/contexts/storeReducer/storeReducer.type";
import { useAddWishlistMutation } from "@/redux/services/wishlist/wishListApiService";
import { getUserInfo } from "@/store/user/users";
import {
    getWishListProducts,
    storeWishListProducts,
} from "@/store/wishList/wishList.product";
import { IProduct } from "@/types/product.type";

interface ShopProductsProps {
    products: IProduct[];
}

interface IModalState {
    open: boolean;
    data: IProduct | null;
}

const ShopProducts: React.FC<ShopProductsProps> = ({ products = [] }) => {
    const user = getUserInfo();
    const { dispatch } = useStoreContext();
    const router = useRouter();
    const pathname = usePathname();

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
            {products &&
                products?.length &&
                products?.map((product: IProduct) => (
                    <div key={product._id}>
                        <ProductCard
                            handleAddCart={handleAddCart}
                            handleCompare={handleCompare}
                            handleWishListProduct={handleWishListProduct}
                            handleProductView={handleProductView}
                            key={product._id}
                            product={product}
                        />
                    </div>
                ))}
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

export default ShopProducts;
