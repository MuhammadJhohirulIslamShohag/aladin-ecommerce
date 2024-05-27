"use client"

import React from "react";
import Button from "../Atoms/Button/Button";

import { BiMinus, BiPlus } from "react-icons/bi";
import { BsFillCartPlusFill } from "react-icons/bs";

interface AddCountCartProps {
    handleDecrement: () => void;
    handleIncrement: () => void;
    handleAddToCart?: () => void;
    quantity: number;
    isForAddCart?: boolean;
}

const AddCountCart: React.FC<AddCountCartProps> = ({
    handleDecrement,
    handleIncrement,
    handleAddToCart,
    quantity,
    isForAddCart = true,
}) => {
    return (
        <>
            {isForAddCart && (
                <div className="mt-6 flex flex-wrap items-center gap-4">
                    <div className="flex items-center w-fit h-[40px] gap-2 rounded-sm">
                        <div
                            className={`rounded-l-lg cursor-pointer bg-black/60 hover:bg-gray-100 h-full flex items-center px-2 text-white`}
                        >
                            {quantity}
                        </div>
                        <div className="space-y-1">
                            <div
                                onClick={handleDecrement}
                                className={`rounded-t-lg cursor-pointer bg-black/60 hover:bg-black/60 h-full flex items-center px-2 ${
                                    quantity === 1
                                        ? "opacity-50 cursor-not-allowed"
                                        : ""
                                }`}
                            >
                                <BiMinus size={20} className="text-white" />
                            </div>

                            <div
                                onClick={handleIncrement}
                                className={`rounded-b-lg cursor-pointer bg-black/60 hover:bg-gray-100 h-full flex items-center px-2 ${
                                    quantity === 79
                                        ? "opacity-50 cursor-not-allowed"
                                        : ""
                                }`}
                            >
                                <BiPlus size={20} className="text-white" />
                            </div>
                        </div>

                        <div
                            onClick={handleAddToCart}
                            className={`cursor-pointer bg-black/60 hover:bg-black/60 h-full flex items-center px-2 rounded-r-lg ${
                                quantity === 1
                                    ? "opacity-50 cursor-not-allowed"
                                    : ""
                            }`}
                        >
                            <BsFillCartPlusFill
                                size={20}
                                className="text-white"
                            />
                        </div>
                    </div>
                </div>
            )}

            {!isForAddCart && (
                <div className="flex flex-col lg:flex-row justify-between">
                    <nav className="flex justify-center items-center text-primary mt-8 lg:mt-0">
                        <Button
                            label={
                                <BiMinus
                                    size={20}
                                    className="hover:text-white text-black/90"
                                />
                            }
                            onClick={handleDecrement}
                            className="p-2 mr-4 inline-block hover:bg-green-300 bg-white/80 hover:text-white text-black/90 rounded-full cursor-pointer transition-all"
                        />

                        <div className="flex items-center gap-3">
                            {quantity}
                        </div>

                        <Button
                            label={
                                <BiPlus
                                    size={20}
                                    className="hover:text-white text-black/90"
                                />
                            }
                            className="p-2 ml-4 rounded-full transition-all cursor-pointer inline-block hover:bg-green-300 text-black/90 bg-white/80 hover:text-white"
                            onClick={handleIncrement}
                        />
                    </nav>
                </div>
            )}
        </>
    );
};

export default AddCountCart;
