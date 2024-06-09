"use client";

import React from "react";
import CheckBox from "../../Atoms/Input/CheckBox";
import styles from "../../../assets/styles/scrollbar.module.css";

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
        <div
            className={`mt-7 h-[145px] overflow-y-scroll ${styles.sidebar_scrollbar} overflow-x-hidden`}
        >
            {subCategories.map((data: ISubCategory) => (
                <div key={data?._id} className="pb-4">
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
        </div>
    );
};

export default ShowSubCategory;
