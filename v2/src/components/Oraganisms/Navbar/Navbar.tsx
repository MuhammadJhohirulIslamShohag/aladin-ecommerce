"use client"

import React from "react";
import dynamic from 'next/dynamic'
import NavbarMiddle from "../../Molecules/Navbar/NavbarMiddle/NavbarMiddle";
const NavbarTop = dynamic(() => import('../../Molecules/Navbar/NavbarTop/NavbarTop'), { ssr: false })
// import NavbarTop from "../../Molecules/Navbar/NavbarTop/NavbarTop";
import NavbarBottom from "../../Molecules/Navbar/NavbarBottom/NavbarBottom";

import { categoriesData, navbarBottomData } from "@/data/categories";

const Navbar: React.FC = (): JSX.Element => {
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
