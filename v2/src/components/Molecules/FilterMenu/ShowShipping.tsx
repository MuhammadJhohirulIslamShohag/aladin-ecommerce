import React from "react";
import CheckBox from "../../Atoms/Input/CheckBox";

interface ShowShippingProps {
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    checkValue: string;
}

const ShowShipping: React.FC<ShowShippingProps> = ({
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
                            name={"shopping"}
                        />
                    </div>
                </div>
            ))}
        </>
    );
};

export default ShowShipping;
