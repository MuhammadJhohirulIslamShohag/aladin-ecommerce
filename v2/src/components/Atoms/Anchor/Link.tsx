"use client"

import React from "react";
import cn from "@/lib/cn";
import Link from "next/link";

interface ReactLinkProps {
    href: string;
    children: React.ReactNode;
    className?: string;
}

const ReactLink: React.FC<ReactLinkProps> = ({
    href,
    children,
    className = "",
}) => {
    return (
        <Link className={cn("", className)} href={href}>
            {children}
        </Link>
    );
};

export default ReactLink;
