"use client";

import Link from "next/link";
import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { BsFillHeartFill } from "react-icons/bs";
import _ from "lodash";

import ValidateImage from "../../Atoms/ValidateImage";

import { IProduct } from "@/types/product.type";

interface WishListProductCardProps {
    product: IProduct;
    handleAddCart: (product: IProduct) => void;
    handleWishListProduct: (productId: string) => void;
}

const WishListProductCard: React.FC<WishListProductCardProps> = ({
    product,
    handleAddCart,
    handleWishListProduct,
}) => {
    const { name, price, discount, imageURLs, description } = product;

    return (
        <>
            <div className="rounded-lg shadow-md group cursor-pointer">
                <div className="h-72 relative">
                    <div className="absolute top-3 rounded-full left-3 w-14 h-14 bg-success flex justify-center items-center flex-col">
                        <span className="text-white -mb-2">Off</span>
                        <span className="flex justify-center items-center text-white">
                            {discount ? discount : "0"}%
                        </span>
                    </div>
                    <ul className="transition duration-300 ease-in-out invisible flex absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 group-hover:visible">
                        <li
                            className={`py-3 flex items-center px-3 rounded-lg ml-2 border-2 border-success hover:bg-primary hover:border-primary hover:text-white  text-white bg-success transition ease-in-out delay-15 cursor-pointer tooltip tooltip-primary`}
                            data-tip={"Add To Cart"}
                            onClick={() => handleAddCart(product)}
                        >
                            <FaShoppingCart />
                        </li>

                        <li
                            className={`py-3 flex items-center px-3 rounded-lg ml-2 border-2 border-success hover:bg-primary hover:border-primary hover:text-white  text-white bg-success transition ease-in-out delay-15 cursor-pointer tooltip tooltip-primary`}
                            data-tip={"Removed From WishList"}
                            onClick={() => handleWishListProduct(product?._id)}
                        >
                            <BsFillHeartFill />
                        </li>
                    </ul>
                    {imageURLs && imageURLs.length && (
                        <ValidateImage
                            className="h-full w-full object-contain"
                            imageUrl={imageURLs?.[0]}
                            alt={name}
                        />
                    )}
                </div>
                <div className="p-5">
                    <Link href={`/products/${product?.slug}`}>
                        <h3 className="md:text-lg text-base hover:w-full transition duration-700 ease-in-out mb-[4px] group font-medium relative">
                            <span className="content-wrapper group-hover:bg-[length:100%_1px]">
                                {name?.length > 16
                                    ? name.slice(0, 16) + "..."
                                    : name}
                            </span>
                        </h3>
                    </Link>

                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        {description?.length > 90
                            ? `${description.slice(0, 90)} ...`
                            : description}
                    </p>
                    <div className="flex items-center gap-2 top-2 mb-1">
                        <span className="font-bold text-gray-700">
                            USD {(price - (price * discount) / 100).toFixed(2)}{" "}
                            $
                        </span>
                        <span className="font-bold line-through text-sm text-gray-600">
                            - USD {price.toFixed(2)} $
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default WishListProductCard;
