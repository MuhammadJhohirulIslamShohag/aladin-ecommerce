import React from "react";
import cn from "../../../utils/cn";

interface InputProps {
    placeholder: string;
    changeHandler: (value: string) => void;
    text: string;
    type: string;
    name: string;
    className: string;
}

const Input: React.FC<InputProps> = ({
    placeholder,
    changeHandler,
    text,
    type,
    name,
    className,
    ...restProps
}) => {
    return (
        <input
            type={type}
            name={name}
            value={text}
            className={cn(
                "bg-primary border-primary text-white text-sm rounded-lg focus:border-primary block w-full pl-6 p-3 md:placeholder:text-white placeholder:text-[9px]",
                className
            )}
            placeholder={placeholder}
            onChange={(e) => changeHandler(e.target.value)}
            {...restProps}
        />
    );
};

export default Input;
