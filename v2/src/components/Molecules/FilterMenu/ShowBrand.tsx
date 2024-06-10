"use client";

import React from "react";
import styles from "../../../assets/styles/scrollbar.module.css";
import CheckBox from "../../Atoms/Input/CheckBox";
import { IBrand } from "@/types/brand.types";

interface ShowBrandProps {
    brands: IBrand[];
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    checkValue: string;
}

const ShowBrand: React.FC<ShowBrandProps> = ({
    brands = [],
    handleChange,
    checkValue,
}) => {
    return (
        <div
            className={`mt-7 h-[145px] overflow-y-scroll ${styles.sidebar_scrollbar} overflow-x-hidden`}
        >
            {brands.map((data: IBrand) => (
                <div key={data?._id} className="pb-4">
                    <div className="space-y-4">
                        <CheckBox
                            handleCheck={handleChange}
                            checked={checkValue === data.name}
                            value={data.name}
                            label={data?.name}
                            name={"brand"}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ShowBrand;
