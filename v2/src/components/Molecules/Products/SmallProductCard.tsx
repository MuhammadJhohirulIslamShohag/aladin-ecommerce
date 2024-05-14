"use client";

import Link from "next/link";
import { MdCompareArrows } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { BsFillCartPlusFill } from "react-icons/bs";

import numberWithCommas from "../../../utils/numberWithCommas";
import ValidateImage from "../../Atoms/ValidateImage";
import Division from "../../Atoms/Division";

import { IProduct } from "@/types/product.type";

interface SmallProductCardProps {
    product: IProduct;
    handleAddCart: (product: IProduct) => void;
    handleCompare: (product: IProduct) => void;
    handleWishListProduct: (product: IProduct) => void;
}

const SmallProductCard: React.FC<SmallProductCardProps> = ({
    product,
    handleAddCart,
    handleCompare,
    handleWishListProduct,
}) => {

    const discountPrice = Math.ceil(product.price * (product.discount / 100));
    const netPrice = Math.ceil(product.price - discountPrice);

    return (
        <div className="relative group w-full transition pt-5 pb-3.5 mx-auto bg-white flex  lg:h-[110px] xl:h-[145px] border-b-2 border-green-50 gap-4">
            <div className="overflow-hidden px-5 w-5/12">
                <div className="relative hover:scale-110 duration-500">
                    <Link href={`/product/${product?.name}`}>
                        <ValidateImage
                            imageUrl={
                                product?.imageURLs?.[0] ||
                                "https://cdn.thewirecutter.com/wp-content/media/2023/06/businesslaptops-2048px-0943.jpg"
                            }
                            className="mx-auto transition-all duration-500 xl:w-[110px] w-full lg:max-h-[100px] max-h-[120px]"
                            alt={product?.name}
                        />
                    </Link>
                </div>
            </div>
            <div className="w-1/2">
                <Link
                    className="text-secondary mt-2 "
                    href="/product/sample-properties-4?pd=66208b55469a7458ab60f8f3"
                >
                    <h3 className="md:text-lg text-base hover:w-full transition duration-700 ease-in-out mb-[4px] group font-medium relative">
                        <span className="content-wrapper group-hover:bg-[length:100%_1px]">
                            {" "}
                            {product?.name?.length > 16
                                ? product?.name.slice(0, 16) + "..."
                                : product?.name}
                        </span>
                    </h3>
                    <div className="">
                        <div className="flex gap-3">
                            <span className="text-primary">
                                ৳ {numberWithCommas(netPrice)}
                            </span>
                            <span className="line-through">
                                ৳ {numberWithCommas(product?.price)}
                            </span>
                        </div>
                    </div>
                </Link>

                <div className="flex justify-start mt-3 gap-2">
                    <Division
                        className="rounded-full h-8 w-8 flex justify-center items-center shadow-md bg-white hover:bg-primary transition-all duration-500 cursor-pointer hover:text-white  text-textPrimary"
                        onClick={() => handleAddCart(product)}
                    >
                        {product?.quantity ? (
                            <button>
                                <BsFillCartPlusFill className="text-lg" />
                            </button>
                        ) : (
                            <button>
                                <BsFillCartPlusFill className="text-lg" />
                            </button>
                        )}
                    </Division>

                    <Division
                        className="rounded-full h-8 w-8 flex justify-center items-center shadow-md bg-white hover:bg-primary transition-all duration-500 cursor-pointer hover:text-white  text-textPrimary"
                        onClick={() => handleWishListProduct(product)}
                    >
                        <FaHeart className={`text-lg`} />
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
    );
};

export default SmallProductCard;
