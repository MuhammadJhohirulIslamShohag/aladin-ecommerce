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
                    className={cn("input w-full max-w-[450px]", className)}
                />
            )}
        />
    );
};

export default ControllerInput;
