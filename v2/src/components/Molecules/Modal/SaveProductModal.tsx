"use client"

import { IProduct } from "@/types/product.type";
import Link from "next/link";
import { FaCheck, FaWindowClose } from "react-icons/fa";

interface SaveProductModalProps {
    product: IProduct;
    onCloseSaveProductModal: React.Dispatch<React.SetStateAction<boolean>>
    isProductExist: boolean;
}

const SaveProductModal: React.FC<SaveProductModalProps> = ({
    product,
    onCloseSaveProductModal,
    isProductExist,
}) => {
    return (
        <div className="bg-white rounded-sm p-3 md:p-6 mx-5 shadow-lg w-full lg:w-3/6">
            <div className="flex justify-end mb-2 lg:-mt-3 ">
                <FaWindowClose
                    onClick={() =>
                        onCloseSaveProductModal((prevState) => !prevState)
                    }
                    className="text-2xl text-primary cursor-pointer"
                />
            </div>
            <div className="flex flex-col gap-5 md:gap-0">
                <div className="flex gap-x-2 items-center">
                    <FaCheck className="text-lg bg-successGreen text-white p-1 rounded-full " />
                    <h1 className="text-sm font-medium">
                        Success:{" "}
                        {isProductExist ? "You have added" : "You remove"}
                        <Link
                            onClick={() =>
                                onCloseSaveProductModal(
                                    (prevState) => !prevState
                                )
                            }
                            href={`/product/view/${product?._id}`}
                            className="text-specialRed px-1 font-semibold hover:underline underline-offset-2"
                        >
                            {product?.name}
                        </Link>
                        to your wishlist!
                    </h1>
                </div>

                <div className="flex gap-4 mt-6">
                    <Link href="/account/wishlist">
                        <button className="text-white py-2 px-4 bg-primary font-medium rounded">
                            View List
                        </button>
                    </Link>
                    <button
                        onClick={() =>
                            onCloseSaveProductModal((prevState) => !prevState)
                        }
                        className="border-2 py-2 px-4 border-primary rounded font-medium hover:bg-primary hover:text-white transition-all duration-400"
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SaveProductModal;
