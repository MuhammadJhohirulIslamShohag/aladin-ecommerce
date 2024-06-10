"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { INavbarMenu } from "@/types/menu.category.type";

interface NavbarMenuProps {
    data: INavbarMenu[];
}

const NavbarMenu: React.FC<NavbarMenuProps> = ({ data }) => {
    const pathName = usePathname();

    return (
        <ul className="flex p-4 space-x-8">
            {data?.map((navbar) => (
                <li key={navbar.title}>
                    <Link
                        href={`${navbar.path}`}
                        className={`block px-3 text-black font-semibold transition-all duration-300 hover:text-white ${
                            pathName === navbar.path ? "text-white" : ""
                        }`}
                    >
                        {navbar.title}
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default NavbarMenu;
