"use client";

import React, { useState } from "react";

import ValidateImage from "../../Atoms/ValidateImage";
import ProductImageModal from "../Modal/ProductImageModal";

interface ProductImagesProps {
    viewProductImages: string[];
    productName: string;
    imageClassName: string;
    downImageClassName: string;
}

const ProductImages: React.FC<ProductImagesProps> = ({
    viewProductImages,
    productName,
    imageClassName,
    downImageClassName,
}) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleImageClick = (imageUrl: string, index: number) => {
        setSelectedImage(imageUrl);
        setCurrentIndex(index);
    };

    return (
        <div>
            <ValidateImage
                imageUrl={viewProductImages?.[0]}
                className={imageClassName}
                onClick={() => handleImageClick(viewProductImages?.[0], 0)}
            />

            <div className="flex items-center justify-center mt-4">
                {viewProductImages?.slice(1)?.map((imageUrl, index) => (
                    <div key={index} className="border px-2 py-1">
                        <ValidateImage
                            imageUrl={imageUrl}
                            className={downImageClassName}
                            onClick={() =>
                                handleImageClick(imageUrl, index + 1)
                            }
                        />
                    </div>
                ))}
            </div>

            {selectedImage && (
                <ProductImageModal
                    onClose={() => setSelectedImage(null)}
                    imageURLs={viewProductImages}
                    productName={productName}
                    initialIndex={currentIndex}
                />
            )}
        </div>
    );
};

export default ProductImages;
