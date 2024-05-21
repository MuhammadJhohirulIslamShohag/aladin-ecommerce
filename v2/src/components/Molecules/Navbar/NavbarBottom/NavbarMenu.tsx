"use client";

import { INavbarMenu } from "@/types/menu.category.type";
import Link from "next/link";
import React from "react";

interface NavbarMenuProps {
    data: INavbarMenu[];
}

const NavbarMenu: React.FC<NavbarMenuProps> = ({ data }) => {
    return (
        <ul className="flex p-4 space-x-8">
            {data?.map((navbar) => (
                <li key={navbar.title}>
                    <Link
                        href={`${navbar.path}`}
                        className="block px-3 text-black transition-all duration-300 hover:text-white"
                    >
                        {navbar.title}
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default NavbarMenu;
