"use client";

import React, { useEffect } from "react";
import cn from "@/lib/cn";

interface CustomModalProps {
    children: React.ReactNode;
    onClose: () => void;
    className?: string;
}

const CustomModal: React.FC<CustomModalProps> = ({
    children,
    onClose,
    className = "",
}) => {
    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            if (
                onClose &&
                (e.target as HTMLElement).classList.contains("modal-overlay")
            ) {
                onClose();
            }
        };

        window.addEventListener("click", (e) => {
            handleOutsideClick(e);
        });

        return () => {
            window.removeEventListener("click", (e) => {
                handleOutsideClick(e);
            });
        };
    }, [onClose]);

    return (
        <div
            className={cn(
                "fixed top-0 left-0 w-full flex justify-center items-center modal-overlay z-50  inset-0 h-[calc(100%)] max-h-full bg-black/75",
                className
            )}
        >
            {children}
        </div>
    );
};

export default CustomModal;
