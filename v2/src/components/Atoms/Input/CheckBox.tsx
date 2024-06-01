"use client";

import cn from "@/lib/cn";
import React from "react";

interface CheckBoxProps {
    handleCheck: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
    checked: boolean;
    label: string;
    name: string;
    className?: string;
}

const CheckBox: React.FC<CheckBoxProps> = ({
    handleCheck,
    value,
    checked,
    label,
    name,
    className = "",
}) => {
    return (
        <div className={cn("", className)}>
            <label className="peer relative flex items-center cursor-pointer text-gray-600">
                <input
                    id={`filter-${label}`}
                    name={name}
                    type="checkbox"
                    onChange={handleCheck}
                    value={value}
                    checked={checked}
                    className="peer sr-only"
                />
                <div className="w-4 h-4 flex items-center justify-center border-2 border-green-400 rounded bg-white peer-checked:bg-green-400 peer-checked:border-green-400">
                    <svg
                        className="w-3 h-3 text-green-400 opacity-0 peer-checked:opacity-100"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M5 13l4 4L19 7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></path>
                    </svg>
                </div>
                <span className="ml-2 capitalize">{label}</span>
            </label>
            {/* <label
                htmlFor={`filter-${label}`}
                className="ml-3 text-sm text-gray-600 flex items-center gap-2"
            >
                <input
                    id={`filter-${label}`}
                    name={name}
                    type="checkbox"
                    onChange={handleCheck}
                    value={value}
                    checked={checked}
                    className="h-4 w-4 rounded checkbox-success"
                />

                <span className="capitalize">{label}</span>
            </label> */}
        </div>
    );
};

export default CheckBox;
