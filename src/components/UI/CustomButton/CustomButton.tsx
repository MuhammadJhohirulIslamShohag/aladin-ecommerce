import React from "react";

const CustomButton = ({ children, className, buttonType="button" }:{
    children:React.ReactNode,
    className?: string,
    buttonType?:"button" | "submit"
}) => {
    return (
        <div>
            <button
                type={buttonType}
                className={`btn hover:bg-transparent hover:text-primary text-white btn-primary ${className}`}
            >
                {children}
            </button>
        </div>
    );
};

export default CustomButton;
