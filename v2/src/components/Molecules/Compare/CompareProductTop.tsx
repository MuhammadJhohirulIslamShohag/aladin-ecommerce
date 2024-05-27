"use client"

import React, { startTransition } from "react";
import Link from "next/link";
import cn from "@/lib/cn";

import ValidateImage from "../../Atoms/ValidateImage";
import numberWithCommas from "@/utils/numberWithCommas";

import {
    getCompareProducts,
    storeCompareProducts,
} from "@/store/compare/compare.product";
import { removeSpace } from "@/utils/removeSpace";
import { useStoreContext } from "@/contexts/StoreContextProvider";
import { IProduct } from "@/types/product.type";
import { StoreActionType } from "@/contexts/storeReducer/storeReducer.type";

interface CompareProductTopProps {
    compareProduct: IProduct;
    className?: string;
    setRemoveComProductOptimistic: (productId: string) => void;
}

const CompareProductTop: React.FC<CompareProductTopProps> = ({
    compareProduct,
    className = "",
    setRemoveComProductOptimistic,
}) => {
    const allCompareProducts: IProduct[] = getCompareProducts();
    const { dispatch } = useStoreContext();

    const removeCompareProduct = (productId: string) => {
        const compareProducts: IProduct[] = allCompareProducts.filter(
            (product) => product._id !== productId
        );

        // set undeleted compare products into the window local storage
        startTransition(() => {
            storeCompareProducts(JSON.stringify(compareProducts));
            setRemoveComProductOptimistic(productId);
            // store store context
            dispatch({
                type: StoreActionType.REMOVE_TO_COMPARE,
                payload: productId,
            });
        });
    };

    return (
        <div key={compareProduct?._id} className={cn("w-full", className)}>
            <Link href={`/products/${removeSpace(compareProduct?.slug)}`}>
                <ValidateImage
                    className="mt-6 w-[228px] h-[228px] m-auto object-cover"
                    imageUrl={compareProduct?.imageURLs?.[0]}
                    alt=""
                />
            </Link>
            <h1 className="mt-2 text-center text-black font-bold capitalize cursor-pointer text-xs lg:text-[15px] hover:text-primary hover:underline">
                <Link href={`/products/${removeSpace(compareProduct?.slug)}`}>
                    {compareProduct?.name}
                </Link>
            </h1>
            <p className="text-center text-primary font-semibold lg:text-2xl md:text-xl text-base mt-4">
                {numberWithCommas(compareProduct?.price)}
                <span className="text-xl">৳</span>
            </p>
            <button
                onClick={() => removeCompareProduct(compareProduct?._id)}
                className="underline underline-offset-2 m-auto w-full text-sm mt-4"
            >
                Remove
            </button>
        </div>
    );
};

export default CompareProductTop;
