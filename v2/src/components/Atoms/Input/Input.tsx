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
                "focus:outline-none shadow py-3 px-4 rounded-md w-full",
                className
            )}
            placeholder={placeholder}
            autoFocus
        />
    );
};

export default Input;
