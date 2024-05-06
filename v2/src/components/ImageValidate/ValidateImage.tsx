'use client'

import { MouseEvent } from "react";
import Image from "next/image";

import useCheckImage from "@/hooks/useCheckImage";

interface ValidateImageProps {
    imageUrl: string;
    imageStyle?: string;
    fallbackImageUrl?: string;
    alt?: string;
    title?: string;
    onClick?: () => void;
}

const ValidateImage: React.FC<ValidateImageProps> = ({
    imageUrl,
    imageStyle,
    fallbackImageUrl = "",
    alt,
    title,
    onClick,
}) => {
    const isError = useCheckImage(imageUrl);

    const handleClick = (e: MouseEvent<HTMLImageElement>) => {
        if (onClick) {
            onClick();
        }
    };

    // Check if imageUrl is empty or undefined, and use notFoundImage in that case
    const finalImageUrl = imageUrl || "../../../public/not-found.jpg";

    return (
        <>
            <Image
                className={`${imageStyle ? imageStyle : ""}`}
                src={
                    !isError
                        ? finalImageUrl
                        : fallbackImageUrl
                        ? fallbackImageUrl
                        : "../../../public/not-found.jpg"
                }
                onClick={handleClick}
                alt={alt ? alt : ""}
                title={title ? title : ""}
            />
        </>
    );
};

export default ValidateImage;
