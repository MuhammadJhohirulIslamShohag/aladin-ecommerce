
import React from "react";

import CategoryBar from "./CategoryBar";
import NavbarMenu from "./NavbarMenu";

import { IMenuCategory, INavbarMenu } from "@/types/menu.category.type";

interface NavbarBottomProps {
    categoriesData: IMenuCategory[];
    navbarMenuData: INavbarMenu[];
}

const NavbarBottom: React.FC<NavbarBottomProps> = ({
    categoriesData,
    navbarMenuData,
}) => {
    return (
        <nav className="bg-green-400 w-full z-20 start-0">
            <div className="container mx-auto px-6">
                <div className="flex flex-wrap items-center justify-between">
                    <div className="flex items-center  rtl:space-x-reverse relative pt-2">
                        <CategoryBar categoriesData={categoriesData || []} />
                    </div>
                    <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        <button
                            type="button"
                            className="transition-all duration-300 text-white hover:text-black bg-black hover:bg-white  font-medium  text-sm px-5 py-2.5 text-center "
                        >
                            Become Seller
                        </button>
                    </div>
                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
                        <NavbarMenu data={navbarMenuData || []} />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavbarBottom;
