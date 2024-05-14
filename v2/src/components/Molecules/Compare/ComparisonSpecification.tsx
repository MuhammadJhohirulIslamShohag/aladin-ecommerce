import React from "react";
import { formatValue } from "../../../utils/formatValue";

interface RootProperty {
    [key: string]: string | undefined | React.ReactNode;
}

interface CompareProduct {
    [key: string]: string | undefined;
}

interface ComparisonSpecificationProps {
    rootPropertiesArray: RootProperty[];
    categoryProductLists: CompareProduct[][];
}

const ComparisonSpecification: React.FC<ComparisonSpecificationProps> = ({
    rootPropertiesArray,
    categoryProductLists,
}) => {
    return (
        <div className="grid grid-cols-12 border-l-[1px] border-grayFive ">
            <div className="col-span-2 lg:block hidden">
                {rootPropertiesArray.map((propertyName, idx) => (
                    <div
                        key={idx}
                        className="border-b border-r border-l-0 border-grayFive h-8 max-h-auto capitalize font-semibold px-2"
                    >
                        {propertyName as any}
                    </div>
                ))}
            </div>
            <div
                className={` ${
                    categoryProductLists.length < 4
                        ? "lg:col-span-8 md:col-span-10 col-span-10"
                        : "lg:col-span-10 md:col-span-12 col-span-12"
                }`}
            >
                <div
                    className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-${
                        categoryProductLists.length || "lg:grid-cols-4"
                    } w-full gap-y-4`}
                >
                    {categoryProductLists.map((compareProduct, idx) => {
                        return (
                            <div key={idx}>
                                {compareProduct.map((product, i) => {
                                    return (
                                        <p
                                            key={i}
                                            className="border-b border-r border-l-0 border-grayFive h-8 max-h-auto text-black font-bold truncate pl-3"
                                        >
                                            {typeof product === "object"
                                                ? formatValue(product?.name)
                                                : formatValue(product)}
                                        </p>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ComparisonSpecification;
