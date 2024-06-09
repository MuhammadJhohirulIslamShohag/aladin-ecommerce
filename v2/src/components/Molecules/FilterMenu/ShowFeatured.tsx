"use client";

import React from "react";
import CheckBox from "../../Atoms/Input/CheckBox";

interface ShowFeaturedProps {
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    checkValue: string;
}

const ShowFeatured: React.FC<ShowFeaturedProps> = ({
    handleChange,
    checkValue,
}) => {
    return (
        <>
            {["No", "Yes"].map((data: string) => (
                <div key={data} className="pt-6">
                    <div className="space-y-4">
                        <CheckBox
                            handleCheck={handleChange}
                            checked={checkValue === data}
                            value={data}
                            label={data}
                            name={"featured"}
                        />
                    </div>
                </div>
            ))}
        </>
    );
};

export default ShowFeatured;
