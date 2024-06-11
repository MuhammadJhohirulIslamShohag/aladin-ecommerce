"use client";

import React from "react";
import Link from "next/link";
import { BsFillCartPlusFill } from "react-icons/bs";
import { FaHeartBroken, FaSearch } from "react-icons/fa";
import { MdCompareArrows } from "react-icons/md";

import numberWithCommas from "@/utils/numberWithCommas";
import Division from "../../Atoms/Division";
import ValidateImage from "../../Atoms/ValidateImage";

import { IProduct } from "@/types/product.type";

interface FlatProductCardProps {
    product: IProduct;
    handleAddCart: (product: IProduct) => void;
    handleCompare: (product: IProduct) => void;
    handleWishListProduct: (product: IProduct) => void;
    handleProductView: (product: IProduct) => void;
}

const FlatProductCard: React.FC<FlatProductCardProps> = ({
    product,
    handleAddCart,
    handleCompare,
    handleWishListProduct,
    handleProductView,
}) => {
    const { name, price, discount, imageURLs, slug } = product;
    const discountPrice = Math.ceil(price * (discount / 100));
    const netPrice = Math.ceil(price - discountPrice);

    return (
        <>
            <div className="relative group w-full transition xl:py-5 py-7  mx-auto rounded-md bg-white shadow  grid xl:grid-cols-2 grid-cols-1">
                <div className=" px-5">
                    <div className="relative hover:scale-110 duration-500">
                        <Link href={`/products/${slug}`}>
                            <ValidateImage
                                imageUrl={
                                    imageURLs?.[0] ||
                                    "https://cdn.thewirecutter.com/wp-content/media/2023/06/businesslaptops-2048px-0943.jpg"
                                }
                                className="mx-auto transition-all duration-500 max-w-[250px] xl:max-h-[143px] max-h-full"
                                alt={name}
                            />
                        </Link>
                    </div>
                </div>
                <div className="relative flex flex-col justify-between ">
                    <Link
                        className="text-secondary mt-2 mb-5"
                        href={`/products/${slug}`}
                    >
                        <h3 className="font-bold text-primary mb-[4px] hover:text-success duration-300 hover:underline px-5">
                            {name?.length && name?.length > 20
                                ? name.slice(0, 20) + "..."
                                : name}
                        </h3>
                        <div className="px-5">
                            <div className="flex gap-3">
                                <span className="text-success">
                                    $ {numberWithCommas(netPrice)}
                                </span>
                                <span className="line-through text-primary">
                                    $ {numberWithCommas(price)}
                                </span>
                            </div>
                        </div>
                    </Link>

                    <div className="flex xl:justify-start justify-center">
                        <div className="flex gap-2 flex-wrap">
                            <Division
                                className="rounded-full h-8 w-8 flex justify-center items-center shadow-md bg-white hover:bg-primary transition-all duration-500 cursor-pointer hover:text-white  text-textPrimary"
                                onClick={() => handleAddCart(product)}
                            >
                                <BsFillCartPlusFill className="text-lg" />
                            </Division>
                            <Division
                                className="rounded-full h-8 w-8 flex justify-center items-center shadow-md bg-white hover:bg-primary transition-all duration-500 cursor-pointer hover:text-white  text-textPrimary"
                                onClick={() => handleWishListProduct(product)}
                            >
                                <FaHeartBroken className={`text-lg `} />
                            </Division>
                            <Division
                                className="rounded-full h-8 w-8 flex justify-center items-center shadow-md bg-white hover:bg-primary transition-all duration-500 cursor-pointer hover:text-white  text-textPrimary"
                                onClick={() => handleProductView(product)}
                            >
                                <FaSearch className="text-lg" />
                            </Division>
                            <Division
                                className="rounded-full h-8 w-8 flex justify-center items-center shadow-md bg-white hover:bg-primary transition-all duration-500 cursor-pointer hover:text-white  text-textPrimary"
                                onClick={() => handleCompare(product)}
                            >
                                <MdCompareArrows className="text-lg" />
                            </Division>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FlatProductCard;
