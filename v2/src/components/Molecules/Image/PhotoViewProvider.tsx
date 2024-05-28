"use client";

import cn from "@/lib/cn";
import Image from "next/image";
import { PhotoProvider, PhotoView } from "react-photo-view";

interface PhotoViewProviderProps {
    imageURL: string;
    name: string;
    className?: string;
}

const PhotoViewProvider: React.FC<PhotoViewProviderProps> = ({
    imageURL,
    name,
    className = "",
}) => {
    return (
        <PhotoProvider>
            <PhotoView src={imageURL}>
                <Image
                    src={imageURL}
                    alt={name}
                    width={100}
                    height={100}
                    className={cn("h-12 w-12 ", className)}
                />
            </PhotoView>
        </PhotoProvider>
    );
};

export default PhotoViewProvider;
