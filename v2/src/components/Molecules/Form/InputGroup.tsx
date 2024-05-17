"use client"

import cn from "@/lib/cn";
import Input from "../../Atoms/Input/Input";
import Label from "../../Atoms/Input/Label";

interface InputGroupProps {
    labelName: string;
    name: string;
    value: string;
    type: string;
    placeholder: string;
    className?: string;
    classNameInput?: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputGroup: React.FC<InputGroupProps> = ({
    labelName,
    name,
    value,
    type,
    placeholder,
    className = "",
    classNameInput = "",
    handleChange,
}) => {
    return (
        <div className={cn("mb-4", classNameInput)}>
            <Label name={labelName} />
            <Input
                type={type}
                name={name}
                value={value}
                handleChange={handleChange}
                placeholder={placeholder}
                className={className}
            />
        </div>
    );
};

export default InputGroup;
