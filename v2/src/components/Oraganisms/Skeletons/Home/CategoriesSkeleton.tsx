import React from "react";
import Category from "../../../Molecules/Skeletons/Category";

const CategoriesSkeleton = () => {
    return (
        <div>
            <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
                <Category />
                <Category />
                <Category />
                <Category />
            </div>
        </div>
    );
};

export default CategoriesSkeleton;
