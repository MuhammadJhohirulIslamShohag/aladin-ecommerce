"use client";

import React, { useState } from "react";
import Link from "next/link";

import { FaAngleRight } from "react-icons/fa";
import { FaBarsStaggered } from "react-icons/fa6";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { IMenuCategory } from "@/types/menu.category.type";

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
                className="text-white bg-black font-medium rounded-t-lg text-sm  text-center items-center flex w-[270px] h-[53px] px-5 justify-between cursor-pointer"
            >
                <div className="flex items-center gap-2">
                    <span>
                        <FaBarsStaggered size={17} />
                    </span>
                    <span>All Categories</span>
                </div>

                <div>
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
                }   top-full absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-[270px] `}
            >
                <ul className="py-2 text-sm text-gray-700   ">
                    {categoriesData?.map((data, idx) => (
                        <li
                            key={idx}
                            className="flex justify-between items-center px-4 py-2 hover:bg-green-400 transition-all duration-300 group relative"
                        >
                            <Link href={`/${data?.category}`}>
                                <span className="transition-all duration-300 group-hover:text-white">
                                    {data?.category}
                                </span>
                                <span>
                                    <FaAngleRight className="transition-all duration-300 group-hover:text-white" />
                                </span>
                                <ul className="left-full absolute hidden text-sm text-gray-700 group-hover:block bg-white w-[270px] top-0 shadow rounded-t-lg pt-2">
                                    {data?.menu?.map((data, idx) => (
                                        <li key={idx}>
                                            {" "}
                                            <Link href={`/${data?.title}`}>
                                                <span className="transition-all duration-300 group-hover/subMenu:text-white">
                                                    {data?.title}
                                                </span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default CategoryBar;
