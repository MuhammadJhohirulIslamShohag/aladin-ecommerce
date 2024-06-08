"use client";

import { MouseEvent } from "react";

import useCheckImage from "@/hooks/useCheckImage";
import cn from "@/lib/cn";

interface ValidateImageProps {
    imageUrl: string;
    className?: string;
    fallbackImageUrl?: string;
    alt?: string;
    title?: string;
    onClick?: () => void;
}

const ValidateImage: React.FC<ValidateImageProps> = ({
    imageUrl,
    className = "",
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
    const finalImageUrl = imageUrl;

    return (
        <picture>
            <img
                className={cn(
                    "mx-auto w-full max-h-[400px] rounded-md ",
                    className
                )}
                src={
                    !isError
                        ? finalImageUrl
                        : fallbackImageUrl
                        ? fallbackImageUrl
                        : "/placeholder.jpg"
                }
                onClick={handleClick}
                alt={alt ? alt : ""}
                title={title ? title : ""}
            />
        </picture>
    );
};

export default ValidateImage;
