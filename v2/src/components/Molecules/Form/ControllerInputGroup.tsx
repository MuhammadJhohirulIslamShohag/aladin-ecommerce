"use client"

import cn from "@/lib/cn";
import ControllerInput from "../../Atoms/Input/ControllerInput";
import Label from "../../Atoms/Input/Label";
import {
    FieldValues,
    Control,
    RegisterOptions,
    Path,
    FieldError,
} from "react-hook-form";

type ControllerInputGroupType<T extends FieldValues> = {
    labelName: string;
    inputName: Path<T>;
    control: Control<T | any>;
    rules:
        | Omit<
              RegisterOptions<FieldValues, string>,
              "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
          >
        | undefined;
    inputType: string;
    placeholder: string;
    className?: string | undefined;
    classNameGroup?: string | undefined;
    errors?: FieldError | undefined;
    children?: React.ReactNode | undefined;
};

const ControllerInputGroup = <T extends FieldValues>({
    labelName,
    inputName,
    control,
    inputType,
    placeholder,
    className,
    classNameGroup = "",
    errors,
    children,
    ...rest
}: ControllerInputGroupType<T>) => {
    return (
        <div className={cn("mb-4", classNameGroup)}>
            <Label name={labelName} {...{ htmlFor: inputName }} />
            <ControllerInput
                name={inputName}
                control={control}
                type={inputType}
                placeholder={placeholder}
                className={className}
                {...rest}
            />
            {children && children}
            {errors && (
                <p className="text-red-500 text-md mt-1">{errors?.message}</p>
            )}
        </div>
    );
};

export default ControllerInputGroup;
