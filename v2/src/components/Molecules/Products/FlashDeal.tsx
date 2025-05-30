"use client";

import Image from "next/image";
import Link from "next/link";

import { MdFlashOn } from "react-icons/md";
import { IProduct } from "@/types/product.type";

const FlashDeal = ({ product }: { product: IProduct }) => {
    const soldPer = (
        (product.sold || 0 / product.quantity || 0) * 100
    )?.toFixed(0);

    return (
        <div className="h-[420px]">
            <div className="relative w-full cursor-pointer overflow-hidden h-80">
                {product?.imageURLs && product?.imageURLs?.length && (
                    <Link href={`products/${product?.slug}`}>
                        <Image
                            src={product?.imageURLs[0]}
                            className="h-full w-full object-contain"
                            alt="surprising sales product"
                            width={100}
                            height={420}
                        />
                    </Link>
                )}

                <div className="absolute top-0 left-0 flex flex-col items-center w-12 h-[4.5rem] p-4 bg-green-300">
                    <MdFlashOn className="absolute scale-150 text-white" />
                    <span className="font-semibold text-lg text-white translate-y-5">
                        -{product?.discount ? product?.discount : "0"}%
                    </span>
                </div>
            </div>
            <div className="flex items-center gap-2 top-2 mb-1">
                <span className="font-bold text-gray-800">
                    USD{" "}
                    {(
                        product.price -
                        (product.price * product.discount) / 100
                    ).toFixed(2)}{" "}
                    $
                </span>
                <span className="font-bold line-through text-sm text-gray-600">
                    - USD {product.price.toFixed(2)} $
                </span>
            </div>
            <div>
                <div className="w-full bg-gray-200 rounded-full">
                    <div
                        className="bg-green-300 text-xs font-medium text-black text-center p-0.5 leading-none rounded-full"
                        style={{
                            width: `${soldPer}%`,
                        }}
                    >
                        {soldPer}%
                    </div>
                </div>
            </div>
            <div className="text-sm text-black mt-2 w-full flex justify-between">
                <div>
                    <span className="text-black font-medium">Sold:</span>{" "}
                    {product?.sold}
                </div>
                <div>
                    <span className="text-black font-medium">Quantity:</span>{" "}
                    {product?.quantity}
                </div>
            </div>
        </div>
    );
};

export default FlashDeal;
