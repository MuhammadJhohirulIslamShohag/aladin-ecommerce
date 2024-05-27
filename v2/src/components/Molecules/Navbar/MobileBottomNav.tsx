"use client"

import { ReactNode } from "react";
import Link from "next/link";
import cn from "@/lib/cn";

interface MobileBottomNavProps {
    href: string;
    className?: string;
    icon: ReactNode;
    name: string;
}

const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
    href,
    className = "",
    icon,
    name = "",
}) => {
    return (
        <Link
            href={href}
            passHref
            className={cn(
                "flex flex-col items-center justify-center gap-y-1",
                className
            )}
        >
            {icon}
            <p className="text-[10px] text-[#ffffff80] tracking-wide">{name}</p>
        </Link>
    );
};

export default MobileBottomNav;
