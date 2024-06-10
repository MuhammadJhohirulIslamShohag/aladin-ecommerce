import React from "react";

const FilterMenuSkeleton = () => {
    return (
        <div>
            {[1, 2, 3].map((idx) => (
                <div
                    key={idx}
                    className="w-full animate-pulse py-2 mb-2"
                >
                    <div className="h-[20px] bg-success/20 w-full text-center mb-1">
                        <p className="text-slate-200 text-[8px]">Loading...</p>
                    </div>
                    <div className="relative py-1 h-[250px] bg-success/20">
                        <div className="aspect-video rounded-md" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FilterMenuSkeleton;
