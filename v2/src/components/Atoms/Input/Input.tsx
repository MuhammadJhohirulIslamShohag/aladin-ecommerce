"use client"

import cn from "@/lib/cn";
import React, { ChangeEvent } from "react";

interface InputProps {
    type?: string;
    name?: string;
    value?: string;
    placeholder?: string;
    className?: string;
    handleChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
    type = "text",
    name = "",
    value = "",
    handleChange,
    className = "",
    placeholder = "",
}) => {
    return (
        <input
            type={type}
            name={name}
            value={value}
            onChange={handleChange}
            className={cn(
                "text-gray-800 text-sm rounded-lg  ring-0 block w-full pl-6 p-3  placeholder:text-[13px] placeholder-gray-600  border  focus:outline-offset-0 focus:outline-0 focus:outline-green-400 focus:ring-green-300 shadow-sm bg-white focus:border-success",
                className
            )}
            placeholder={placeholder}
            autoFocus
        />
    );
};

export default Input;
