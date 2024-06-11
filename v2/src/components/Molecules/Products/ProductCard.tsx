"use client";

import Link from "next/link";
import React from "react";
import { AiFillHeart } from "react-icons/ai";
import { BsFillCartPlusFill } from "react-icons/bs";
import { IoIosEye } from "react-icons/io";
import { MdCompareArrows } from "react-icons/md";

import numberWithCommas from "@/utils/numberWithCommas";
import ValidateImage from "../../Atoms/ValidateImage";
import TooltipButton from "../Button/TooltipButton/TooltipButton";
import AvgRating from "./AvgRating";

import { IProduct } from "@/types/product.type";

interface ProductCardProps {
    product: IProduct;
    handleAddCart: (product: IProduct) => void;
    handleCompare: (product: IProduct) => void;
    handleWishListProduct: (product: IProduct) => void;
    handleProductView: (product: IProduct) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
    product,
    handleAddCart,
    handleCompare,
    handleWishListProduct,
    handleProductView,
}) => {
    const {
        name,
        price,
        discount,
        slug,
        imageURLs,
        quantity,
        averageRating,
        ratingLength,
    } = product;

    const discountPrice = Math.ceil(price * (discount / 100));
    const netPrice = Math.ceil(price - discountPrice);

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
                                    onClick={() => handleProductView(product)}
                                >
                                    <IoIosEye className={`text-2xl `} />
                                </button>
                            </TooltipButton>

                            <TooltipButton
                                id="add-to-cart"
                                content="Add to cart"
                            >
                                {quantity ? (
                                    <button
                                        onClick={() => handleAddCart(product)}
                                    >
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
                                <button
                                    onClick={() =>
                                        handleWishListProduct(product)
                                    }
                                >
                                    <AiFillHeart className={`text-2xl `} />
                                </button>
                            </TooltipButton>
                            <TooltipButton
                                id="add-to-compare"
                                content="Add to Compare"
                                tooltipPlacement="top-end"
                            >
                                <button onClick={() => handleCompare(product)}>
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
                            className="text-xs lg:text-[15px] text-primary font-bold hover:text-success hover:underline"
                            title={name}
                        >
                            {name?.length > 18
                                ? name.slice(0, 18) + "..."
                                : name}
                        </Link>

                        <div className="flex items-center ">
                            {discount ? (
                                <div className="flex items-center gap-3">
                                    <p className="text-lg text-primary font-bold">
                                        ${numberWithCommas(netPrice)}
                                    </p>
                                    <del className="text-sm text-textGray">
                                        ${numberWithCommas(price)}
                                    </del>
                                </div>
                            ) : (
                                <p className="text-lg text-primary font-bold">
                                    ${numberWithCommas(price)}
                                </p>
                            )}
                        </div>
                        <AvgRating
                            product={[]}
                            isHomeReviewShow
                            avgReview={averageRating}
                            reviewLen={ratingLength}
                        />
                    </div>
                </div>

                <p className="bg-primary w-fit px-2 py-0.5 text-white font-semibold text-xs rounded-r-md absolute top-3 left-0">
                    <span>
                        {numberWithCommas(discountPrice)}৳ Discount on Online
                        Order
                    </span>
                </p>
            </div>
        </>
    );
};

export default ProductCard;
