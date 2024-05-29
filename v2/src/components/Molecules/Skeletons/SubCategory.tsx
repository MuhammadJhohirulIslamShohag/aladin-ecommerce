import React from "react";

const SubCategory = () => {
    return (
        <div className="h-[146px] animate-pulse bg-success/20 flex flex-col items-center justify-center">
            <div className="w-[80%] h-[60px] bg-success/30 flex items-center justify-center">
                <p className=" text-slate-200 text-[8px] text-center">
                    Loading...
                </p>
            </div>
            <div className="mt-5">
                <div className="w-[120px] flex justify-center items-center bg-success/20 ">
                    <p className=" text-slate-200 text-[8px] text-center">
                        Loading...
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SubCategory;
