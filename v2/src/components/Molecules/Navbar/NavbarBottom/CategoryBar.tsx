"use client";

import Link from "next/link";
import React, { useState } from "react";

import { IMenuCategory } from "@/types/menu.category.type";
import { FaAngleRight } from "react-icons/fa";
import { FaAngleDown, FaAngleUp, FaBarsStaggered } from "react-icons/fa6";
import MobileCategoryNav from "./MobileCategoryNav";

interface CategoryBarProps {
    categoriesData: IMenuCategory[];
}

const CategoryBar: React.FC<CategoryBarProps> = ({ categoriesData }) => {
    const [openCategory, setOpenCategory] = useState(false);

    return (
        <>
            <button
                onClick={() => setOpenCategory((prev) => !prev)}
                type="button"
                className="text-white bg-black font-medium rounded-t-lg text-sm  text-center items-center flex lg:w-[270px] md:w-[170px] h-[53px] px-5 justify-between cursor-pointer"
            >
                <div className="flex items-center gap-2">
                    <span className="md:block hidden">
                        <FaBarsStaggered size={17} />
                    </span>
                    <span>All Categories</span>
                </div>

                <div className="lg:block hidden">
                    {openCategory ? (
                        <FaAngleDown size={17} />
                    ) : (
                        <FaAngleUp size={17} />
                    )}
                </div>
            </button>
            <div
                className={`z-10 origin-top transition-all ${
                    openCategory ? "scale-100" : "scale-0"
                } top-full absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-[270px] `}
            >
                <MobileCategoryNav
                    categoriesData={categoriesData}
                    // closeMobileCategory={() => setOpenCategory((prev) => !prev)}
                    className="lg:hidden block"
                />
                <ul className="py-2 text-sm text-gray-700 lg:block hidden">
                    {categoriesData?.map((data, idx) => (
                        <li
                            key={idx}
                            className="flex justify-between items-center px-4 py-2 hover:bg-green-400 transition-all duration-300 group relative"
                        >
                            <Link href={`/${data?.category}`}>
                                <span className="transition-all duration-300 group-hover:text-white">
                                    {data?.category}
                                </span>
                            </Link>
                            <span>
                                <FaAngleRight className="transition-all duration-300 group-hover:text-white" />
                            </span>
                            <ul className="left-full absolute hidden text-sm text-gray-700 group-hover:block bg-white w-[270px] top-0 shadow rounded-t-lg pt-2">
                                {data?.menu?.map((data, idx) => (
                                    <li key={idx} className="px-4 py-2 hover:bg-green-400 transition-all duration-300 group relative">
                                        {" "}
                                        <Link href={`/${data?.title}`}>
                                            <span className="transition-all duration-300 group-hover/subMenu:text-white">
                                                {data?.title}
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default CategoryBar;
