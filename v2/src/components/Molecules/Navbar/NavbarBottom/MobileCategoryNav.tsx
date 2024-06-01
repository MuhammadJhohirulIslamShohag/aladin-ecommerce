"use client";

import React, { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { IMenuCategory } from "@/types/menu.category.type";
import Link from "next/link";
import cn from "@/lib/cn";

interface MobileCategoryNavProps {
    categoriesData: IMenuCategory[];
    // closeMobileCategory: () => void;
    className?: string;
}

const MobileCategoryNav: React.FC<MobileCategoryNavProps> = ({
    // closeMobileCategory,
    categoriesData,
    className = "",
}) => {
    const [openMenu, setOpenMenu] = useState<number | null>(null);
    const [openCategory, setOpenCategory] = useState<number | null>(null);

    const handleOpenMenu = (index: number) => {
        setOpenMenu(openMenu === index ? null : index);
        setOpenCategory(null);
    };

    const handleOpenCategory = (index: number) => {
        setOpenCategory(openCategory === index ? null : index);
    };

    return (
        <div className={cn("relative z-[99999]", className)}>
            <div className="space-y-2 font-Quicksand p-4">
                {categoriesData?.map((category, index) => (
                    <div key={index}>
                        <div className=" ">
                            <div
                                className="flex justify-between cursor-pointer p-2"
                                onClick={() => handleOpenMenu(index)}
                            >
                                <Link href={`/category/${category?.name}`}>
                                    <h4 className="font-semibold font-Quicksand">
                                        {category?.name}
                                    </h4>
                                </Link>

                                {openMenu === index ? (
                                    <AiOutlineMinus size={20} />
                                ) : (
                                    <AiOutlinePlus size={20} />
                                )}
                            </div>
                            {openMenu === index && (
                                <div>
                                    {category?.subcategories?.map(
                                        (subCategory, idx) => (
                                            <div key={idx}>
                                                <div
                                                    className="flex justify-between cursor-pointer p-2 bg-[#f2f4f8] border-b-2"
                                                    onClick={() =>
                                                        handleOpenCategory(idx)
                                                    }
                                                >
                                                    <Link
                                                        href={`/sub-category/${subCategory?.name}`}
                                                    >
                                                        <a className="text-[15px] font-medium pl-2  hover:underline underline-offset-2 hover:text-green-400">
                                                            {subCategory?.name}
                                                        </a>
                                                    </Link>
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MobileCategoryNav;
