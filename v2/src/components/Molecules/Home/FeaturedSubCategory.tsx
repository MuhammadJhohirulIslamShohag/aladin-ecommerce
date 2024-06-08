"use client";

import React from "react";
import { ISubCategory } from "@/types/sub-category.type";

interface FeaturedSubCategoryProps {
    data: ISubCategory;
}

const FeaturedSubCategory: React.FC<FeaturedSubCategoryProps> = ({ data }) => {
    return (
        <div className="flex flex-col items-center justify-center bg-white px-2 py-3 shadow-md border cursor-pointer group transition-all  min-h-[145px]">
            <picture>
                <img
                    className="max-w-[50px] max-h-[60px]"
                    src={data.imageURL}
                    alt=""
                />
            </picture>
            <p className="mt-3 text-center text-[#01132d] font-semibold group-hover:text-green-400 transition-all">
                {data.name}
            </p>
        </div>
    );
};

export default FeaturedSubCategory;
