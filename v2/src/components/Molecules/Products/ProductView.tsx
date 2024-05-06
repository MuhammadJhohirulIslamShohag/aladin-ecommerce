"use client";

import React, { useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { BsFillCartPlusFill } from "react-icons/bs";
import { FaWindowClose } from "react-icons/fa";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import CustomModal from "../../Atoms/Modal/CustomModal";
import ProductImages from "./ProductImages";
import ConfirmCartModal from "../Modal/ConfirmCartModal";

import { IProduct } from "@/types/product.type";

interface ProductViewProps {
    product: IProduct;
    setProductView: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductView: React.FC<ProductViewProps> = ({
    product,
    setProductView,
}) => {
    /* state */
    const [openModal, setOpenModal] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const {
        brand,
        name,
        imageURLs,
        _id,
        keyFeatures,
        quantity: productQuantity,
        price,
        discount,
    } = product;

    /* Set price from payment section */
    const discountPrice = Math.ceil(price * (discount / 100));
    const netPrice = Math.ceil(price - discountPrice) * quantity;

    const dispatch = useDispatch();

    /* Handle add to cart */
    const handleAddToCart = () => {
        const addedProduct = {
            name,
            price: Number(netPrice),
            status,
            brand,
            imageURLs,
            _id,
            productQuantity,
        };
        // dispatch(addToCart({ ...addedProduct, quantity })),
        setOpenModal((prevState) => !prevState);
    };

    /* Handle product quantity increment here */
    const handleIncrement = () => {
        if (quantity < productQuantity) {
            setQuantity(quantity + 1);
        } else {
            toast.error("You can not order more than quantity");
        }
    };

    /* Handle product quantity decrement here */
    const handleDecrement = () => {
        // handle decrement
        if (quantity > 1) {
            setQuantity(quantity - 1);
        } else {
            toast.error("You can not order less than 1 product ");
        }
    };

    return (
        <div className="bg-white rounded-sm p-3 md:p-6 mx-5 shadow-lg w-full lg:w-3/6 h-auto overflow-auto">
            <div className="flex justify-end mb-2 lg:-mt-3 -mr-3">
                <FaWindowClose
                    onClick={() => setProductView((prevState) => !prevState)}
                    className="text-2xl text-black hover:text-green-400 transition-all cursor-pointer"
                />
            </div>
            {/* main content */}
            <div className="grid grid-cols-7 gap-6">
                {/* image */}
                <div className="mb-5 lg:mb-0 col-span-3">
                    <ProductImages
                        productName={name}
                        viewProductImages={imageURLs}
                        imageClassName="mx-auto cursor-pointer w-full max-h-60 object-contain"
                        downImageClassName={"w-[50px] h-[50px] cursor-pointer"}
                    />
                </div>
                <div className="col-span-4">
                    <div className="mb-1">
                        <h2 className="text-2xl font-semibold ">
                            {" "}
                            {name?.length > 35
                                ? name.slice(0, 35) + "..."
                                : name}
                        </h2>

                        <h2 className="text-lg text-red-500 font-semibold mb-2">
                            ${netPrice}
                        </h2>
                    </div>

                    <div className="mt-2 ">
                        <div>
                            <p className="mb-2 text-primary text-lg font-semibold">
                                Key Features:
                            </p>

                            {keyFeatures?.map((value) => (
                                <p
                                    key={Object.keys(value)?.[0]}
                                    className="py-1.5 px-0 text-sm font-bold text-gray-900 rounded-2xl"
                                >
                                    {Object.keys(value)?.[0]}:
                                    <span className="text-black font-semibold ml-1">
                                        {value[Object?.keys(value)?.[0]]}
                                    </span>
                                </p>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center space-x-2 mt-3">
                        <label className="cursor-pointer ">
                            <input
                                type="radio"
                                name="color"
                                value="green"
                                className="hidden peer"
                            />
                            <span className="peer-checked:ring-2 peer-checked:ring-green-500 peer-checked:ring-offset-2 peer-checked:ring-offset-white inline-block w-5 h-5 bg-green-400 rounded-sm"></span>
                        </label>
                        <label className="cursor-pointer">
                            <input
                                type="radio"
                                name="color"
                                value="blue"
                                className="hidden peer"
                            />
                            <span className="peer-checked:ring-2 peer-checked:ring-blue-500 peer-checked:ring-offset-2 peer-checked:ring-offset-white inline-block w-5 h-5 bg-blue-400 rounded-sm"></span>
                        </label>
                        <label className="cursor-pointer">
                            <input
                                type="radio"
                                name="color"
                                value="red"
                                className="hidden peer"
                            />
                            <span className="peer-checked:ring-2 peer-checked:ring-red-500 peer-checked:ring-offset-2 peer-checked:ring-offset-white inline-block w-5 h-5 bg-red-400 rounded-sm"></span>
                        </label>
                    </div>

                    <div className="flex items-center space-x-2 mt-3">
                        <label className="cursor-pointer flex justify-center items-center">
                            <input
                                type="radio"
                                name="size"
                                value="SM"
                                className="hidden peer"
                            />
                            <span className="flex justify-center items-center peer-checked:ring-2 peer-checked:ring-black/60 peer-checked:ring-offset-2 peer-checked:ring-offset-white h-6 w-6 border border-black/60 rounded-full text-[12px] font-bold">
                                SM
                            </span>
                        </label>
                        <label className="cursor-pointer flex justify-center items-center">
                            <input
                                type="radio"
                                name="size"
                                value="MD"
                                className="hidden peer"
                            />
                            <span className="flex justify-center items-center peer-checked:ring-2 peer-checked:ring-black/60 peer-checked:ring-offset-2 peer-checked:ring-offset-white h-6 w-6 border border-black/60 rounded-full text-[12px] font-bold">
                                MD
                            </span>
                        </label>
                        <label className="cursor-pointer flex justify-center items-center">
                            <input
                                type="radio"
                                name="size"
                                value="LG"
                                className="hidden peer"
                            />
                            <span className="flex justify-center items-center peer-checked:ring-2 peer-checked:ring-black/60 peer-checked:ring-offset-2 peer-checked:ring-offset-white h-6 w-6 border border-black/60 rounded-full text-[12px] font-bold">
                                LG
                            </span>
                        </label>
                        <label className="cursor-pointer flex justify-center items-center">
                            <input
                                type="radio"
                                name="size"
                                value="XXL"
                                className="hidden peer"
                            />
                            <span className="flex justify-center items-center peer-checked:ring-2 peer-checked:ring-black/60 peer-checked:ring-offset-2 peer-checked:ring-offset-white h-6 w-6 border border-black/60 rounded-full text-[12px] font-bold">
                                XL
                            </span>
                        </label>
                    </div>

                    {/* product quantity increment and decrement section */}
                    {!product.quantity ? ( // out of stock button
                        <button
                            disabled
                            className={
                                "flex items-center justify-center gap-1 btn bg-btnPrimary  text-primary py-2 rounded-md mt-5 px-10 font-bold"
                            }
                        >
                            Out of Stock
                        </button>
                    ) : (
                        <div className="mt-6 flex flex-wrap items-center gap-4">
                            <div className="flex items-center w-fit h-[40px] gap-2 rounded-sm">
                                {/* button */}
                                <input
                                    type="number"
                                    value={quantity}
                                    className="w-6 rounded-l-lg bg-black/60 h-full outline-none text-center text-white font-semibold"
                                    readOnly
                                />
                                <div className="space-y-1">
                                    <div
                                        onClick={handleDecrement}
                                        className={`rounded-t-lg cursor-pointer bg-black/60 hover:bg-black/60 h-full flex items-center px-2 ${
                                            quantity === 1
                                                ? "opacity-50 cursor-not-allowed"
                                                : ""
                                        }`}
                                    >
                                        <BiMinus
                                            size={20}
                                            className="text-white"
                                        />
                                    </div>

                                    {/* button */}
                                    <div
                                        onClick={handleIncrement}
                                        className={`rounded-b-lg cursor-pointer bg-black/60 hover:bg-gray-100 h-full flex items-center px-2 ${
                                            quantity == 79
                                                ? "opacity-50 cursor-not-allowed"
                                                : ""
                                        }`}
                                    >
                                        <BiPlus
                                            size={20}
                                            className="text-white"
                                        />
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
                </div>
            </div>

            {/* Add to Cart modal  */}
            {openModal && (
                <CustomModal onClose={() => setOpenModal((prev) => !prev)}>
                    <ConfirmCartModal
                        handleCart={() => setOpenModal((prev) => !prev)}
                        productName={product.name}
                    />
                </CustomModal>
            )}
        </div>
    );
};

export default ProductView;
