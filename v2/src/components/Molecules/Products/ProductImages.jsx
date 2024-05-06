import React, { useState } from "react";

import ValidateImage from "../../Atoms/ValidateImage";
import ProductImageModal  from "../Modal/ProductImageModal";



const ProductImages = ({ viewProductImages, productName, imageClassName, downImageClassName }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const handleImageClick = (imageUrl, index) => {
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
                    imageURLs={viewProductImages?.map((image) => image)}
                    productName={productName}
                    initialIndex={currentIndex}
                />
            )}
        </div>
    );
};

export default ProductImages;
