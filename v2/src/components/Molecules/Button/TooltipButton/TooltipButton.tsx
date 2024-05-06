"use client";

import React from "react";

import cn from "@/lib/cn";
import { Tooltip } from "react-tooltip";

interface TooltipButtonProps {
    children: React.ReactNode;
    className?: string;
    tooltipPlacement?: "top" | "bottom" | "left" | "right";
    content?: string;
    id: string;
}

const TooltipButton: React.FC<TooltipButtonProps> = ({
    children,
    className = "",
    tooltipPlacement = "top",
    content = "",
    id,
}) => {
    return (
        <div
            data-tooltip-id={id}
            className={cn(
                "z-10 bg-white hover:bg-green-400 p-1 rounded flex items-center justify-center hover:text-white text-black  my-2 transition-all ",
                className
            )}
        >
            <Tooltip
                id={id}
                content={content}
                place={tooltipPlacement}
                className="relative !z-[999] !bg-black !text-white"
            />
            {children}
        </div>
    );
};

export default TooltipButton;
