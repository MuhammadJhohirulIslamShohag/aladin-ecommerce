"use client";

import React, { startTransition, useOptimistic, useState } from "react";
import toast from "react-hot-toast";
import _ from "lodash";

import SectionTitle from "../../Molecules/SectionTitle";
import CustomModal from "../../Atoms/Modal/CustomModal";
import ProductCartPreview from "../../Molecules/Products/ProductCartPreview";
import WishListProductCard from "../../Molecules/Products/WishListProductCard";
import Empty from "../../Molecules/Empty";

import { storeWishListProducts } from "@/store/wishList/wishList.product";
import { useStoreContext } from "@/contexts/StoreContextProvider";
import { StoreActionType } from "@/contexts/storeReducer/storeReducer.type";
import { IProduct } from "@/types/product.type";
import { getUserInfo } from "@/store/user/users";
import { getWishListProducts } from "@/store/wishList/wishList.product";
import { useRemoveWishListMutation } from "@/redux/services/wishlist/wishListApiService";

// interface WishlistProductProps {
//     products: IProduct[];
// }

interface IModalState {
    open: boolean;
    data: IProduct | null;
}

const WishlistProduct = () => {
    const user = getUserInfo();
    const wishListFromLocalStorage = getWishListProducts();
    const { dispatch } = useStoreContext();

    // redux api call
    const [removeWishList] = useRemoveWishListMutation();

    const wishListProductsData = user?.wishLists?.length
        ? user?.wishLists
        : wishListFromLocalStorage;

    const [cartModal, setCartModal] = useState<IModalState>({
        open: false,
        data: null,
    });

    const [wishListProductsOptimistic, setRemoveWishListOptimistic] =
        useOptimistic(
            wishListProductsData,
            (state: IProduct[], newState: string) => {
                return state.filter(
                    (product: IProduct) => product._id !== newState
                );
            }
        );

    const handleRemovedToWishList = async (productId: string) => {
        let wishLists: IProduct[] = wishListProductsData?.filter(
            (product: any) => product._id !== productId
        );
        // set undeleted wish list into the window local storage
        startTransition(() => {
            storeWishListProducts(JSON.stringify(wishLists));
            setRemoveWishListOptimistic(productId);
            // store store context
            dispatch({
                type: StoreActionType.REMOVE_TO_WISH,
                payload: productId,
            });
        });
        if (user && user?.token) {
            await removeWishList(productId).then((res) => {
                if ("data" in res && res.data && res.data?.success) {
                    toast.success("Wish-List is Removed!");
                } else {
                    toast.error("Failed To Remove Wish-List!");
                }
            });
        }
    };

    const handleAddCart = (product: IProduct) => {
        setCartModal((prev) => ({
            ...prev,
            open: true,
            data: { ...product },
        }));
    };

    let content = null;

    if (wishListProductsOptimistic?.length) {
        content = (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-8 gap-4 px-2 lg:px-0">
                {wishListProductsOptimistic?.map((product: IProduct) => (
                    <WishListProductCard
                        key={product._id}
                        product={product}
                        handleAddCart={handleAddCart}
                        handleWishListProduct={handleRemovedToWishList}
                    />
                ))}
            </div>
        );
    }

    if (!wishListProductsOptimistic?.length) {
        content = <Empty description="No Wishlist Products Data" />;
    }

    return (
        <>
            <div className="container mx-auto px-6 mt-10 lg:mb-36 md:mb-20 mb-16">
                <SectionTitle title={"Wishlist Products"} />
                <div>{content}</div>
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
        </>
    );
};

export default WishlistProduct;
