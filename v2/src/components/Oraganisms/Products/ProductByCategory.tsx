"use client";

import React, { startTransition, useState } from "react";
import toast from "react-hot-toast";
import _ from "lodash";

import ProductCard from "@/components/Molecules/Products/ProductCard";
import CustomModal from "../../Atoms/Modal/CustomModal";
import CompareProductInfo from "../../Molecules/Products/CompareProductInfo";
import ProductCartPreview from "../../Molecules/Products/ProductCartPreview";
import ProductView from "../../Molecules/Products/ProductView";
import SectionTitle from "../../Molecules/SectionTitle";

import { ICategory } from "@/types/category.type";
import { IProduct } from "@/types/product.type";
import { getUserInfo } from "@/store/user/users";
import { useStoreContext } from "@/contexts/StoreContextProvider";
import {
    getWishListProducts,
    storeWishListProducts,
} from "@/store/wishList/wishList.product";
import { StoreActionType } from "@/contexts/storeReducer/storeReducer.type";
import { addToWishList } from "@/api/user";

interface NewArrivalsProps {
    products: IProduct[];
    title: string;
    name: string;
}

interface IModalState {
    open: boolean;
    data: IProduct | null;
}

const ProductByCategory: React.FC<NewArrivalsProps> = ({
    products,
    category,
    title,
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
            <div className="container mx-auto px-6 mt-10">
                <SectionTitle title={title} />

                {products && products?.length < 1 ? (
                    <div className="h-80 flex items-center justify-center">
                        <p className="text-center text-xl text-primary capitalize ">
                            No Product Found By The {name}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-8 gap-4 px-2 lg:px-0">
                        {products?.map((product: IProduct) => (
                            <ProductCard
                                key={product._id}
                                handleAddCart={handleAddCart}
                                handleCompare={handleCompare}
                                handleWishListProduct={handleWishListProduct}
                                handleProductView={handleProductView}
                                product={product}
                            />
                        ))}
                    </div>
                )}
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

export default ProductByCategory;
