import { INavbarMenu } from "@/types/menu.category.type";
import Link from "next/link";
import React from "react";

interface NavbarMenuProps {
    data: INavbarMenu[];
}

const NavbarMenu: React.FC<NavbarMenuProps> = ({ data }) => {
    return (
        <ul className="flex p-4 space-x-10">
            {data?.map((navbar) => (
              
                    <Link
                    key={navbar.title}
                        href={`${navbar.path}`}
                        className="block px-3 text-black transition-all duration-300 hover:text-white"
                    >
                          <li>
                        {navbar.title}
                        </li>
                    </Link>
              
            ))}
        </ul>
    );
};

export default NavbarMenu;
