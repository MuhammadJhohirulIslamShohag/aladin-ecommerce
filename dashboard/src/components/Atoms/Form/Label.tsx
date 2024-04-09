import React from "react";
import cn from "../../../utils/cn";

interface LabelProps extends React.HTMLAttributes<HTMLLabelElement> {
    name: string;
    className?: string;
}


const Label: React.FC<LabelProps> = ({ name, className, ...restProps }) => {
    return (
        <label
            {...restProps}
            className={cn(
                "block mb-2 text-sm font-medium text-primary",
                className ? className : ""
            )}
        >
            {name}
        </label>
    );
};

export default Label;
