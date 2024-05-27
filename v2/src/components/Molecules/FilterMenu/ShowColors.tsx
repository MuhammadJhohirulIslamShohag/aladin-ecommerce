"use client"

import React from "react";
import CheckBox from "../../Atoms/Input/CheckBox";
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
        <>
            {values.map((value: IColor) => (
                <div key={value?._id} className="pt-6">
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
        </>
    );
};

export default ShowColors;
