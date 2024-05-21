import React from "react";
import Image from "next/image";
import { IProduct } from "@/types/product.type";

interface CompareProductProps {
    product: IProduct;
    removeCompareProduct: (productId: string) => void;
}

const CompareProduct: React.FC<CompareProductProps> = ({
    product,
    removeCompareProduct,
}) => {
    const { _id, name, imageURLs, price, quantity } = product;

    return (
        <li className="flex py-6">
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <Image
                    src={imageURLs && imageURLs.length && imageURLs[0]}
                    alt={name}
                    width={80}
                    height={80}
                    className="h-full w-full object-cover object-center"
                />
            </div>

            <div className="ml-4 flex flex-1 flex-col">
                <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>{name}</h3>
                        <p className="ml-4">{price}</p>
                    </div>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                    <p className="text-gray-500">Qty {quantity}</p>
                    <div className="flex">
                        <button
                            type="button"
                            className="transition-all font-medium text-primary hover:text-green-600"
                            onClick={() => removeCompareProduct(_id)}
                        >
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        </li>
    );
};

export default CompareProduct;
