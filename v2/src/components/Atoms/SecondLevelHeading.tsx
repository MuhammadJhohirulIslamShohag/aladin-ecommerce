"use client"

import cn from "@/lib/cn";
import React from "react";

interface SecondLevelHeadingProps {
    title: string;
    className?: string;
}

const SecondLevelHeading: React.FC<SecondLevelHeadingProps> = ({
    title,
    className = "",
    ...rest
}) => {
    return (
        <div {...rest} className={cn("", className)}>
            {title}
        </div>
    );
};

export default SecondLevelHeading;
