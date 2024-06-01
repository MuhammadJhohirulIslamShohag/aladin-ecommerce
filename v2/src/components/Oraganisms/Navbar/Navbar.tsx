"use client";

import React from "react";
import dynamic from "next/dynamic";

import NavbarMiddle from "../../Molecules/Navbar/NavbarMiddle/NavbarMiddle";
import NavbarBottom from "../../Molecules/Navbar/NavbarBottom/NavbarBottom";
const NavbarTop = dynamic(
    () => import("../../Molecules/Navbar/NavbarTop/NavbarTop"),
    { ssr: false }
);

import { navbarBottomData } from "@/data/categories";
import { useGetCategoriesMenuQuery } from "@/redux/services/category/categoryApiService";

const Navbar: React.FC = (): JSX.Element => {
    const { data } = useGetCategoriesMenuQuery({});
    const categoriesData = data?.data || [];
    return (
        <header className="bg-header ">
            <NavbarTop />
            <NavbarMiddle />
            <NavbarBottom
                categoriesData={categoriesData}
                navbarMenuData={navbarBottomData}
            />
        </header>
    );
};

export default Navbar;
