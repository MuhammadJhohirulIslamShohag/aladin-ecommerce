"use client";

import { useEffect, useState } from "react";

const useCheckImage = (imageUrl: string): boolean => {
    const [imageExists, setImageExists] = useState<boolean>(false);

    useEffect(() => {
        const loadImage = async () => {
            try {
                const exists = await checkIfImageExists(imageUrl);
                setImageExists(exists);
            } catch (error) {
                console.error("Error loading image:", error);
                setImageExists(false);
            }
        };

        loadImage();
    }, [imageUrl]);

    const checkIfImageExists = async (url: string): Promise<boolean> => {
        return new Promise((resolve) => {
            const img = new Image();
            img.src = url;

            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
        });
    };

    return imageExists;
};

export default useCheckImage;
