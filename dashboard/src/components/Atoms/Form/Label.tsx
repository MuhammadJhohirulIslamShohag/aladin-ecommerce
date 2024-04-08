import React from "react";
import cn from "../../../utils/cn";

interface LabelProps {
    name: string;
    className: string;
}

const Label: React.FC<LabelProps> = ({ name, className }) => {
    return (
        <label className={cn("text-gray-800 font-normal", className)}>
            {name}
        </label>
    );
};

export default Label;
