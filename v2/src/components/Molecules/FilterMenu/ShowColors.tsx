"use client";

import React from "react";
import CheckBox from "../../Atoms/Input/CheckBox";
import styles from "../../../assets/styles/scrollbar.module.css";
import { IColor } from "@/types/color.types";

interface ShowColorsProps {
    values: IColor[];
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    checkValue: string;
}

const ShowColors: React.FC<ShowColorsProps> = ({
    values = [],
    handleChange,
    checkValue,
}) => {
    return (
        <div
            className={`mt-7 h-[145px] overflow-y-scroll ${styles.sidebar_scrollbar} overflow-x-hidden`}
        >
            {values.map((value: IColor) => (
                <div key={value?._id} className="pb-4">
                    <div className="space-y-4">
                        <CheckBox
                            handleCheck={handleChange}
                            checked={checkValue === value.name}
                            value={value.name}
                            label={value.name}
                            name={"color"}
                            className="flex items-center transition-all group:hover:text-green-500"
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ShowColors;
