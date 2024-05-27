"use client"

import React from "react";
import CheckBox from "../../Atoms/Input/CheckBox";
import { ICategory } from "@/types/category.type";

interface ShowCategoryProps {
    categories: ICategory[];
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    checkValue: string[];
}

const ShowCategory: React.FC<ShowCategoryProps> = ({
    categories = [],
    handleChange,
    checkValue,
}) => {
    return (
        <>
            {categories.map((data: ICategory) => (
                <div key={data?._id} className="pt-6">
                    <div className="space-y-4">
                        <CheckBox
                            handleCheck={handleChange}
                            checked={checkValue.includes(data?.name)}
                            value={data.name}
                            label={data?.name}
                            name={"category"}
                        />
                    </div>
                </div>
            ))}
        </>
    );
};

export default ShowCategory;
