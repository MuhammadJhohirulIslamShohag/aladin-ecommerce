"use client";

import Link from "next/link";
import { startTransition } from "react";
import { FaCheck, FaWindowClose } from "react-icons/fa";
import _ from "lodash";

import { useStoreContext } from "@/contexts/StoreContextProvider";
import { StoreActionType } from "@/contexts/storeReducer/storeReducer.type";
import {
    getCompareProducts,
    storeCompareProducts,
} from "@/store/compare/compare.product";
import { IProduct } from "@/types/product.type";

interface CompareProductInfoProps {
    onCloseCompareModal: () => void;
    compareProduct: IProduct;
}

const CompareProductInfo: React.FC<CompareProductInfoProps> = ({
    onCloseCompareModal,
    compareProduct,
}) => {
    const { dispatch } = useStoreContext();

    const handleAddCompareProduct = () => {
        // create compare products array
        let compareProducts = getCompareProducts();

        // added compare product
        compareProducts.push({
            ...compareProduct,
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

        onCloseCompareModal();
    };

    return (
        <div className="bg-white rounded-sm p-3 md:p-6 mx-5 shadow-lg w-full lg:w-3/6">
            <div className="flex justify-end mb-2 lg:-mt-3 ">
                <FaWindowClose
                    onClick={onCloseCompareModal}
                    className="text-2xl text-primary cursor-pointer"
                />
            </div>
            <div className="flex flex-col gap-5 md:gap-0">
                <div className="flex justify-center gap-3 items-center">
                    <FaCheck className="text-xl bg-successGreen text-white p-1 rounded-full " />
                    <h1 className="text-xl font-medium">
                        Success: You have added
                        <span className=" text-success px-1 font-semibold">
                            {compareProduct?.name}
                        </span>
                        to your compare cart!
                    </h1>
                </div>

                <div className="flex justify-center gap-4 mt-6">
                    <button
                        onClick={handleAddCompareProduct}
                        className="text-white py-[6px] px-4 bg-primary font-medium rounded"
                    >
                        Add To Compare
                    </button>

                    <Link href="/products/compare">
                        <button
                            onClick={handleAddCompareProduct}
                            className="text-white py-2 px-4 bg-primary font-medium rounded"
                        >
                            Compare Now
                        </button>
                    </Link>
                    <button
                        onClick={() => onCloseCompareModal()}
                        className="border-2  py-[6px] px-4 border-primary rounded font-medium hover:bg-primary hover:text-white transition-all duration-400"
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CompareProductInfo;
