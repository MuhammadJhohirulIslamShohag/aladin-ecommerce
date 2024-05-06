import React from "react";
import cn from "@/lib/cn";

interface DivisionProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
}

const Division: React.FC<DivisionProps> = ({
    children,
    className = "",
    ...rest
}) => {
    return (
        <div {...rest} className={cn("", className)}>
            {children}
        </div>
    );
};

export default Division;
