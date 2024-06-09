"use client";

import React from "react";
import CheckBox from "../../Atoms/Input/CheckBox";
import styles from "../../../assets/styles/scrollbar.module.css";
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
        <div
            className={`mt-7 h-[145px] overflow-y-scroll ${styles.sidebar_scrollbar} overflow-x-hidden`}
        >
            {categories.map((data: ICategory) => (
                <div key={data?._id} className="pb-4">
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
        </div>
    );
};

export default ShowCategory;
