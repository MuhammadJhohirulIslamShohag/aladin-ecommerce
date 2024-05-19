import React from "react";

const CustomButton = ({ children, className, buttonType="button", handleClick }:{
    children:React.ReactNode,
    className?: string,
    buttonType?:"button" | "submit",
    handleClick?:() => void
}) => {
    return (
        <div>
            <button
                type={buttonType}
                className={`hover:bg-transparent transition-all border-[1px] border-primary hover:text-primary text-white bg-primary flex items-center justify-center py-2.5 px-4 rounded-sm ${className}`}
                onClick={handleClick}
            >
                {children}
            </button>
        </div>
    );
};

export default CustomButton;
