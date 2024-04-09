import cn from "../../../utils/cn";
import {
    UseFormRegister,
    Path,
    FieldValues,
    RegisterOptions,
} from "react-hook-form";

interface InputProps<T extends FieldValues> {
    placeholder: string;
    type: string;
    register: UseFormRegister<T>;
    inputName: Path<T>;
    errorMessage: string | boolean | undefined;
    className: string;
    isRequirePattern?: boolean | undefined;
    requirePattern: RegisterOptions | undefined;
}

const Input = <T extends FieldValues>({
    placeholder,
    type,
    register,
    className,
    isRequirePattern = false,
    inputName,
    errorMessage,
    requirePattern,
    ...restProps
}: InputProps<T>) => {
    return (
        <input
            {...register(
                inputName,
                !isRequirePattern
                    ? {
                          required: errorMessage,
                      }
                    : requirePattern
            )}
            type={type}
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
