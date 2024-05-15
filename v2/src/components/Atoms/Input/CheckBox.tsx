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
        <div className={cn("flex items-center", className)}>
            <input
                name={name}
                type="checkbox"
                onChange={handleCheck}
                value={value}
                checked={checked}
                className="h-4 w-4 rounded checkbox checkbox-success"
            />
            <label
                htmlFor={`filter-category-${label}`}
                className="ml-3 text-sm text-gray-600"
            >
                {label}
            </label>
        </div>
    );
};

export default CheckBox;
