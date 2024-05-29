import React from "react";
import SubCategory from "../../../Molecules/Skeletons/SubCategory";

const SubCategoriesSkeleton = () => {
    return (
        <div className="grid grid-cols-7">
            <SubCategory />
            <SubCategory />
            <SubCategory />
            <SubCategory />
            <SubCategory />
            <SubCategory />
            <SubCategory />
        </div>
    );
};

export default SubCategoriesSkeleton;
