"use client";

import React, { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { IMenuCategory } from "@/types/menu.category.type";
import Link from "next/link";

interface MobileCategoryNavProps {
    categoriesData: IMenuCategory[];
    closeMobileCategory: () => void;
}

const MobileCategoryNav: React.FC<MobileCategoryNavProps> = ({
    closeMobileCategory,
    categoriesData,
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
        <div>
            <div className="pr-4 pt-2 ">
                <RxCross1
                    className="text-red-500 cursor-pointer ml-auto hover:bg-red-100 rounded-full duration-300 p-2"
                    size={35}
                    onClick={closeMobileCategory}
                />
            </div>
            <div className="space-y-2 font-Quicksand p-4">
                {categoriesData?.map((category, index) => (
                    <div key={index}>
                        <div className=" ">
                            <div
                                className="flex justify-between cursor-pointer p-2"
                                onClick={() => handleOpenMenu(index)}
                            >
                                <h4 className="font-semibold font-Quicksand">
                                    {category?.name}
                                </h4>
                                {openMenu === index ? (
                                    <AiOutlineMinus size={20} />
                                ) : (
                                    <AiOutlinePlus size={20} />
                                )}
                            </div>
                            {openMenu === index && (
                                <div>
                                    {category?.subcategories?.map((subCategory, idx) => (
                                        <div key={idx}>
                                            <div
                                                className="flex justify-between cursor-pointer p-2 bg-[#f2f4f8] border-b-2"
                                                onClick={() =>
                                                    handleOpenCategory(idx)
                                                }
                                            >
                                                <Link
                                                    href={`/${subCategory?.name}`}
                                                >
                                                    <a className="text-[15px] font-medium pl-2  hover:underline underline-offset-2 hover:text-success">
                                                        {subCategory?.name}
                                                    </a>
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
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
