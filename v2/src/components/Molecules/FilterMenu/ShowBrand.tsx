import { IBrand } from "@/types/brand.types";
import React from "react";
import CheckBox from "../../Atoms/Input/CheckBox";

interface ShowBrandProps {
    brands: IBrand[];
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    checkValue: string;
}

const ShowBrand: React.FC<ShowBrandProps> = ({
    brands = [],
    handleChange,
    checkValue,
}) => {
    return (
        <>
            {brands.map((data: IBrand) => (
                <div key={data?._id} className="pt-6">
                    <div className="space-y-4">
                        <CheckBox
                            handleCheck={handleChange}
                            checked={checkValue === data.name}
                            value={data.name}
                            label={data?.name}
                            name={"brand"}
                        />
                    </div>
                </div>
            ))}
        </>
    );
};

export default ShowBrand;
