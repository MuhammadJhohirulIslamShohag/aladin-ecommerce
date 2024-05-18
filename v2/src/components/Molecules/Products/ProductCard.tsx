"use client";

import Link from "next/link";
import React, { startTransition, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { BsFillCartPlusFill } from "react-icons/bs";
import { IoIosEye } from "react-icons/io";
import { MdCompareArrows } from "react-icons/md";
import toast from "react-hot-toast";
import _ from "lodash";

import CustomModal from "../../Atoms/Modal/CustomModal";
import SaveProductModal from "../Modal/SaveProductModal";
import CompareProductInfo from "./CompareProductInfo";
import ProductCartPreview from "./ProductCartPreview";
import ProductView from "./ProductView";

import numberWithCommas from "@/utils/numberWithCommas";
import ValidateImage from "../../Atoms/ValidateImage";
import TooltipButton from "../Button/TooltipButton/TooltipButton";

import { IProduct } from "@/types/product.type";
import { removeSpace } from "@/utils/removeSpace";
import {
    getCompareProducts,
    storeCompareProducts,
} from "@/store/compare/compare.product";
import { useStoreContext } from "@/contexts/StoreContextProvider";
import { StoreActionType } from "@/contexts/storeReducer/storeReducer.type";
import {
    getWishListProducts,
    storeWishListProducts,
} from "@/store/wishList/wishList.product";
import { addToWishList } from "@/api/user";
import { getUserInfo } from "@/store/user/users";

const ProductCard: React.FC<{ product: IProduct }> = ({ product }) => {
    const user = getUserInfo();
    const { dispatch } = useStoreContext();

    const { name, price, discount, slug, imageURLs, quantity, _id } = product;

    const discountPrice = Math.ceil(price * (discount / 100));
    const netPrice = Math.ceil(price - discountPrice);

    const [modalOpen, setModalOpen] = useState(false);
    const [productView, setProductView] = useState(false);
    const [saveProductModalOpen, setSaveProductModalOpen] = useState(false);
    const [compareModalOpen, setCompareModalOpen] = useState(false);

    const handleAddWishListProduct = async () => {
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

        await addToWishList(user?.token, _id).then((res) => {
            if (res?.data?.success) {
                toast.success(res?.data?.message, {
                    duration: 5000,
                });
            }
        });
    };

    const handleAddCart = () => {
        setModalOpen((prevState) => !prevState);
    };

    const handleAddCompareProduct = () => {
        // create compare products array
        let compareProducts = getCompareProducts();

        // added compare product
        compareProducts.push({
            ...product,
        });
        // remove duplicates
        const uniqueCompareProducts = _.uniqWith(compareProducts, _.isEqual);

        // set cart object in windows localStorage
        startTransition(() => {
            storeCompareProducts(JSON.stringify(uniqueCompareProducts));
            // added cart in store context
            dispatch({
                type: StoreActionType.ADD_TO_COMPARE,
                payload: uniqueCompareProducts,
            });
        });

        setCompareModalOpen((prev) => !prev);
    };

    return (
        <>
            <div className="bg-white rounded-md py-2 shadow-md cursor-pointer hover:shadow-lg transition duration-300 group relative z-20 overflow-hidden w-full">
                {/* product image */}
                <div className="py-4 relative">
                    <Link
                        className="w-full inline-block"
                        href={`/products/${slug}`}
                    >
                        <ValidateImage
                            imageUrl={imageURLs?.[0]}
                            className="mx-auto w-full h-full cursor-pointer hover:opacity-90 p-1 rounded-lg hover:transform hover:scale-100 transition duration-300 overflow:hidden"
                            alt={name}
                        />
                    </Link>

                    <div className="absolute bottom-0 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/70 z-10">
                        <div className="flex gap-2 py-1 px-0 transition-all group-hover:px-6 justify-between items-center duration-300">
                            <TooltipButton
                                tooltipPlacement="top-start"
                                id="product-view"
                                content="Product View"
                            >
                                <button
                                    onClick={() => setProductView(!productView)}
                                >
                                    <IoIosEye className={`text-2xl `} />
                                </button>
                            </TooltipButton>

                            <TooltipButton
                                id="add-to-cart"
                                content="Add to cart"
                            >
                                {quantity ? (
                                    <button onClick={() => handleAddCart()}>
                                        <BsFillCartPlusFill className="text-2xl" />
                                    </button>
                                ) : (
                                    <button>
                                        <BsFillCartPlusFill className="text-2xl" />
                                    </button>
                                )}
                            </TooltipButton>

                            <TooltipButton
                                id="add-to-wishlist"
                                content="Add to wishlist"
                                // className={`${
                                //     wishListProduct
                                //         ? ""
                                //         : "text-white bg-green-400"
                                // }`}
                            >
                                <button onClick={handleAddWishListProduct}>
                                    <AiFillHeart className={`text-2xl `} />
                                </button>
                            </TooltipButton>
                            <TooltipButton
                                id="add-to-compare"
                                content="Add to Compare"
                                tooltipPlacement="top-end"
                            >
                                <button onClick={handleAddCompareProduct}>
                                    <MdCompareArrows className="text-2xl" />
                                </button>
                            </TooltipButton>
                        </div>
                    </div>
                </div>

                <div className="pt-3 px-4 pb-3">
                    <div className="h-[80px]">
                        <Link
                            href={`/products/${slug}`}
                            className="text-xs lg:text-[15px] text-primaryBlack font-bold hover:text-primary hover:underline"
                            title={name}
                        >
                            {name?.length > 35
                                ? name.slice(0, 35) + "..."
                                : name}
                        </Link>
                        <>
                            {discount ? (
                                <div className="flex items-center gap-3">
                                    <p className="text-lg text-primary font-bold">
                                        {numberWithCommas(netPrice)}৳
                                    </p>
                                    <del className="text-sm text-textGray">
                                        {numberWithCommas(price)}৳
                                    </del>
                                </div>
                            ) : (
                                <p className="text-lg text-primary font-bold">
                                    {numberWithCommas(price)}৳
                                </p>
                            )}
                        </>
                    </div>
                </div>

                {discount > 0 && (
                    <p className="bg-primary w-fit px-2 py-0.5 text-white font-semibold text-xs rounded-r-md absolute top-3 left-0">
                        <span>
                            {numberWithCommas(discountPrice)}৳ Discount on
                            Online Order
                        </span>
                    </p>
                )}
            </div>

            {productView && (
                <CustomModal onClose={() => setProductView((prev) => !prev)}>
                    <ProductView
                        product={product}
                        setProductView={setProductView}
                    />
                </CustomModal>
            )}
            {saveProductModalOpen && (
                <CustomModal
                    onClose={() => setSaveProductModalOpen((prev) => !prev)}
                >
                    <SaveProductModal
                        onCloseSaveProductModal={setSaveProductModalOpen}
                        product={product}
                        // isProductExist={wishListProduct}
                        isProductExist={false}
                    />
                </CustomModal>
            )}
            {modalOpen && (
                <CustomModal onClose={() => setModalOpen((prev) => !prev)}>
                    <ProductCartPreview
                        product={product}
                        handleClose={() => setModalOpen((prev) => !prev)}
                    />
                </CustomModal>
            )}
            {compareModalOpen && (
                <CustomModal
                    onClose={() => setCompareModalOpen((prev) => !prev)}
                >
                    <CompareProductInfo
                        onCloseCompareModal={() =>
                            setCompareModalOpen((prev) => !prev)
                        }
                        compareProductName={product?.name}
                    />
                </CustomModal>
            )}
        </>
    );
};

export default ProductCard;
