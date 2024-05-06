"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FaWindowClose } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import Button from "../../Atoms/Button/Button";
import CustomModal from "../../Atoms/Modal/CustomModal";
import ValidateImage from "../../Atoms/ValidateImage";

interface ProductImageModalProps {
    imageURLs: string[];
    onClose: () => void;
    productName: string;
    initialIndex: number;
    isSingle?: boolean;
    link?: string;
}

const ProductImageModal: React.FC<ProductImageModalProps> = ({
    imageURLs,
    onClose,
    productName,
    initialIndex,
    isSingle = false,
    link = "",
}) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % imageURLs.length);
    };

    const handlePrevious = () => {
        setCurrentIndex(
            (prevIndex) => (prevIndex - 1 + imageURLs.length) % imageURLs.length
        );
    };

    return (
        <CustomModal onClose={onClose}>
            <div className="bg-white rounded-md relative">
                <div className="flex justify-end p-2">
                    <FaWindowClose
                        onClick={onClose}
                        className="text-2xl text-black hover:text-green-400 transition-all cursor-pointer"
                    />
                </div>
                {/* dialog body */}
                <div className="py-0">
                    <ValidateImage
                        imageUrl={imageURLs[currentIndex]}
                        className="mx-auto w-full max-h-[400px] rounded-md "
                    />
                </div>

                {!isSingle ? (
                    <>
                        {/* dialog footer */}
                        <div className="flex flex-col lg:flex-row items-center  lg:justify-between mt-4 bg-primaryBlack p-1">
                            <p className="text-sm font-medium text-white w-full lg:w-[80%]">
                                {productName}
                            </p>
                            <p className="px-2 text-sm font-medium tracking-wide rounded-md text-white text-opacity-70">
                                {currentIndex + 1} of {imageURLs.length}
                            </p>
                        </div>
                        {/* forward and backward button start */}
                        <div>
                            <Button
                                className="absolute -right-12 top-[50%] bg-black hover:bg-green-400 p-2 rounded-full"
                                onClick={handleNext}
                                label={
                                    <>
                                        <IoIosArrowForward
                                            color="white"
                                            size={20}
                                        />
                                    </>
                                }
                            />
                            <Button
                                className="absolute -left-12 top-[50%] bg-black hover:bg-green-400 p-2 rounded-full"
                                onClick={handlePrevious}
                                label={
                                    <>
                                        <IoIosArrowBack
                                            color="white"
                                            size={20}
                                        />
                                    </>
                                }
                            />
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col lg:flex-row items-center lg:justify-between mt-4 bg-primaryBlack py-1 px-2">
                        <p className="text-sm font-medium text-white w-full lg:w-[80%]">
                            {productName}
                        </p>
                        <Link href={link}>
                            <p className="px-2 text-sm font-medium tracking-wide rounded-md text-white text-opacity-70">
                                Details
                            </p>
                        </Link>
                    </div>
                )}
            </div>
        </CustomModal>
    );
};

export default ProductImageModal;
