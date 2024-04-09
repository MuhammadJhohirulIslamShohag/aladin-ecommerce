import React, { SelectHTMLAttributes } from "react";
import cn from "../../../utils/cn";

interface SelectInputProps extends SelectHTMLAttributes<HTMLSelectElement> {
    children?: React.ReactNode;
    className?: string;
}

const Select: React.FC<SelectInputProps> = ({
    children,
    className,
    ...rest
}) => {
    return (
        <select
            {...rest}
            className={cn(
                "rounded-md w-full text-sm focus:outline-none disabled:bg-gray-100 shadow",
                className ? className : ""
            )}
        >
            {children}
        </select>
    );
};

export default Select;
