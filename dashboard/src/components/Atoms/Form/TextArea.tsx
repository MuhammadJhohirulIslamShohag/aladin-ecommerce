import React, { TextareaHTMLAttributes } from "react";
import cn from "../../../utils/cn";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    placeholder?: string;
    className?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
    placeholder,
    className,
    ...restProps
}) => {
    return (
        <textarea
            {...restProps}
            className={cn(
                "block mb-2 text-sm font-medium text-primary",
                className ? className : ""
            )}
            placeholder={placeholder}
        ></textarea>
    );
};

export default TextArea;
