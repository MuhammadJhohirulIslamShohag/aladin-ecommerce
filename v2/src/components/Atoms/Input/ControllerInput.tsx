"use client"

import cn from "@/lib/cn";
import {
    Controller,
    FieldValues,
    Control,
    Path,
    RegisterOptions,
} from "react-hook-form";

interface ControllerInputProps {
    rules:
        | Omit<
              RegisterOptions<FieldValues, string>,
              "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
          >
        | undefined;
    type?: string;
    control: Control<FieldValues>;
    name: Path<FieldValues>;
    placeholder?: string | undefined;
    className?: string | undefined;
}

const ControllerInput: React.FC<ControllerInputProps> = ({
    control,
    rules,
    type = "text",
    name,
    placeholder = "",
    className = "",
}) => {
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field }) => (
                <input
                    {...field}
                    type={type}
                    placeholder={placeholder}
                    className={cn("text-gray-800 text-sm rounded-lg  ring-0 block w-full pl-6 p-3  placeholder:text-[13px] placeholder-gray-600  border  focus:outline-offset-0 focus:outline-0 focus:outline-green-400 focus:ring-green-300 shadow-sm bg-white focus:border-success", className)}
                />
            )}
        />
    );
};

export default ControllerInput;
