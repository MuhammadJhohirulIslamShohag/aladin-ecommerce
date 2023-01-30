import React from "react";

const CustomButton = ({ children, className }:{
    children:React.ReactNode,
    className: string
}) => {
    return (
        <div>
            <button
                className={`btn hover:bg-transparent hover:text-primary text-white btn-primary ${className}`}
            >
                {children}
            </button>
        </div>
    );
};

export default CustomButton;
