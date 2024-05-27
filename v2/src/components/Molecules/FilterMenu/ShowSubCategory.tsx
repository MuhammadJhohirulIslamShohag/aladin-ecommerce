"use client"

import React from "react";
import CheckBox from "../../Atoms/Input/CheckBox";
import { ISubCategory } from "@/types/sub-category.type";

interface ShowSubCategoryProps {
    subCategories: ISubCategory[];
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    checkValue: string[];
}

const ShowSubCategory: React.FC<ShowSubCategoryProps> = ({
    subCategories = [],
    handleChange,
    checkValue,
}) => {
    return (
        <>
            {subCategories.map((data: ISubCategory) => (
                <div key={data?._id} className="pt-6">
                    <div className="space-y-4">
                        <CheckBox
                            handleCheck={handleChange}
                            checked={checkValue.includes(data?.name)}
                            value={data.name}
                            label={data?.name}
                            name={"sub-category"}
                        />
                    </div>
                </div>
            ))}
        </>
    );
};

export default ShowSubCategory;
