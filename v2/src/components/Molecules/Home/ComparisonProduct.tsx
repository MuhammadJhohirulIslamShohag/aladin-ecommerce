"use client";

import React, { useState, useRef, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { IProduct } from "@/types/product.type";

interface ComparisonProductProps {
    products: IProduct[];
}

interface comparisonStateValue {
    product: IProduct | null;
    name: string;
}

const ComparisonProduct: React.FC<ComparisonProductProps> = ({ products }) => {
    const [comparisonOneValue, setComparisonOneValue] =
        useState<comparisonStateValue>({
            name: "",
            product: null,
        });
    const [comparisonTwoValue, setComparisonTwoValue] =
        useState<comparisonStateValue>({
            name: "",
            product: null,
        });
    const [isComparisonOneFocused, setIsComparisonOneFocused] = useState(false);
    const [isComparisonTwoFocused, setIsComparisonTwoFocused] = useState(false);

    // const dispatch = useDispatch();
    const router = useRouter();

    const comparisonOneRef = useRef<HTMLDivElement>(null);
    const comparisonTwoRef = useRef<HTMLDivElement>(null);

    const handleComparisonOneChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setComparisonOneValue((prev) => ({
            ...prev,
            name: event.target.value,
        }));
    };

    const handleComparisonTwoChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setComparisonTwoValue((prev) => ({
            ...prev,
            name: event.target.value,
        }));
    };

    const handleComparisonOneFocus = () => {
        setIsComparisonOneFocused(true);
    };

    const handleComparisonTwoFocus = () => {
        setIsComparisonTwoFocused(true);
    };

    const handleProductSelect = (product: IProduct, inputField: number) => {
        if (inputField === 1) {
            setComparisonOneValue((prev) => ({
                ...prev,
                product: product,
                name: product.name,
            }));
            // dispatch(addToCompare({ ...product }));
            setIsComparisonOneFocused(false);
        } else if (inputField === 2) {
            setComparisonTwoValue((prev) => ({
                ...prev,
                product: product,
                name: product.name,
            }));
            // dispatch(addToCompare({ ...product }));
            setIsComparisonTwoFocused(false);
        }
    };

    const handleSendComparisonProduct = () => {
        if (comparisonOneValue?.name && comparisonTwoValue.name) {
            router.push("/products/compare", { scroll: false });
        } else {
            toast.error("Please do not empty any comparison input field!");
        }
    };

    const handleDocumentClick = (e: MouseEvent) => {
        if (
            comparisonOneRef.current &&
            !comparisonOneRef.current.contains(e.target as HTMLElement)
        ) {
            setIsComparisonOneFocused(false);
        }
        if (
            comparisonTwoRef.current &&
            !comparisonTwoRef.current.contains(e.target as HTMLElement)
        ) {
            setIsComparisonTwoFocused(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleDocumentClick);
        return () => {
            document.removeEventListener("click", handleDocumentClick);
        };
    }, []);

    return (
        <div className="lg:w-full md:w-[50%] w-full gap-y-3">
            <div className="bg-white/40 shadow-xl p-6 rounded-sm">
                <p className="text-center font-semibold tracking-wide">
                    Compare Products
                </p>
                <p className="text-center text-sm text-[#0000008a]">
                    Choose Two Products to Compare
                </p>
                <form className="mt-2">
                    <div className="relative shadow-sm " ref={comparisonOneRef}>
                        <input
                            className="w-full py-2 pl-2.5 pr-11 outline-none rounded-md mt-2 overflow-hidden text-[15px] placeholder:text-gray-700 placeholder:font-medium"
                            type="text"
                            value={comparisonOneValue?.name}
                            onChange={handleComparisonOneChange}
                            onFocus={handleComparisonOneFocus}
                            placeholder="Search and Select Product"
                        />
                        <div className="bg-white absolute top-2 right-1 p-2 ">
                            <BsSearch size={20} color="#7F7F7F" />
                        </div>
                        {isComparisonOneFocused && (
                            <ul className="w-full absolute z-50 bg-white px-4 pt-2 pb-4 rounded-b-sm">
                                {products?.slice(0, 5)?.map((product) => (
                                    <li
                                        key={product._id}
                                        onClick={() =>
                                            handleProductSelect(product, 1)
                                        }
                                        className="w-full py-2 cursor-pointer border-b border-gray-200 rounded-t-lg "
                                    >
                                        {product.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div
                        className="relative shadow-sm mt-1"
                        ref={comparisonTwoRef}
                    >
                        <input
                            className="w-full text-[15px] py-2 pl-2.5 pr-11 outline-none rounded-md mt-2 overflow-hidden placeholder:text-gray-700 placeholder:font-medium"
                            type="text"
                            value={comparisonTwoValue?.name}
                            onChange={handleComparisonTwoChange}
                            onFocus={handleComparisonTwoFocus}
                            placeholder="Search and Select Product"
                        />
                        <div className="bg-white absolute top-2 right-1 p-2 ">
                            <BsSearch size={20} color="#7F7F7F" />
                        </div>
                        {isComparisonTwoFocused && (
                            <ul className="w-full absolute z-50 bg-white px-4 pt-2 pb-4 rounded-b-sm">
                                {products?.slice(6, 10)?.map((product) => (
                                    <li
                                        key={product._id}
                                        onClick={() =>
                                            handleProductSelect(product, 2)
                                        }
                                        className="w-full py-2 border-b cursor-pointer border-gray-200 rounded-t-lg "
                                    >
                                        {product.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <button
                        type="button"
                        onClick={handleSendComparisonProduct}
                        className="btn w-full mt-4 text-green-400 border-2 border-green-400 py-2 text-sm tracking-wide font-semibold rounded-md hover:text-white hover:bg-green-400 transition-all duration-300"
                    >
                        View Comparison
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ComparisonProduct;
