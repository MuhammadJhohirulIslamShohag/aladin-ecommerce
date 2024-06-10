"use client";

import { useState } from "react";
import ReactImageMagnify from "react-image-magnify";
import Image from "next/image";

const CardZoomCarousel = ({
    images,
    title,
}: {
    images: string[];
    title: string;
}) => {
    const [imageUrl, setImageUrl] = useState(`${images[0]}` as string);

    return (
        <>
            <div className="magnify-container">
                <ReactImageMagnify
                    {...{
                        smallImage: {
                            alt: "Wristwatch by Ted Baker London",
                            isFluidWidth: true,
                            src: `${imageUrl}`,
                            sizes: "(max-width: 480px) 100vw, (max-width: 1200px) 30vw, 360px",
                        },
                        largeImage: {
                            src: `${imageUrl}`,
                            width: 900,
                            height: 1800,
                        },
                        isHintEnabled: false,
                        shouldHideHintAfterFirstActivation: false,
                        shouldUsePositiveSpaceLens: true,
                    }}
                />
            </div>
            <div className="grid grid-cols-5 gap-2 cursor-pointer mt-4">
                {images &&
                    images?.length > 0 &&
                    images?.map((image: string) => (
                        <div
                            key={image}
                            className="border border-gray-400"
                            onClick={() => setImageUrl(image)}
                        >
                            <Image
                                className="w-full h-full"
                                alt={title}
                                width={80}
                                height={80}
                                src={image}
                            />
                        </div>
                    ))}
            </div>
        </>
    );
};

export default CardZoomCarousel;
