import { UseFormRegister, FieldValues, Path } from "react-hook-form";
import cn from "../../../utils/cn";

interface TextAreaProps<T extends FieldValues> {
    placeholder?: string;
    className?: string;
    register: UseFormRegister<T>;
    inputName: Path<T>;
    errorMessage: string | boolean | undefined;
}

const TextArea = <T extends FieldValues>({
    placeholder,
    className,
    register,
    inputName,
    errorMessage,
    ...restProps
}: TextAreaProps<T>) => {
    return (
        <textarea
            {...register(inputName, {
                required: errorMessage,
            })}
            className={cn(
                "block mb-2 text-sm font-medium text-primary",
                className ? className : ""
            )}
            placeholder={placeholder}
            {...restProps}
        ></textarea>
    );
};

export default TextArea;
