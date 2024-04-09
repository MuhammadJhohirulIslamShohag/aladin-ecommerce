import React from "react";
import cn from "../../../utils/cn";

interface InputProps {
    placeholder: string;
    type: string;
    name: string;
    className: string;
}

const Input: React.FC<InputProps> = ({
    placeholder,
    type,
    name,
    className,
    ...restProps
}) => {
    return (
        <input
            type={type}
            name={name}
            className={cn(
                "bg-primary border-primary text-white text-sm rounded-lg focus:border-primary block w-full pl-6 p-3 md:placeholder:text-white placeholder:text-[9px]",
                className
            )}
            placeholder={placeholder}
            {...restProps}
        />
    );
};

export default Input;
