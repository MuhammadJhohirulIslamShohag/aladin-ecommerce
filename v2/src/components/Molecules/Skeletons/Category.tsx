import React from "react";

const Category = () => {
    return (
        <div className="w-full animate-pulse bg-success/20 h-[375px] px-3 py-5">
            <div className="flex justify-between">
                <div className="h-[20px] w-[100px] bg-success/20 flex justify-center items-center">
                    <p className=" text-slate-200 text-[8px]">
                        Loading...
                    </p>
                </div>
                <div className="h-[20px] w-[100px] bg-success/20 flex justify-center items-center">
                    <p className=" text-slate-200 text-[8px]">
                        Loading...
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-2 mt-6 gap-3">
                <div className="relative h-[140px] bg-success/20 flex justify-center items-center">
                    <p className=" text-slate-200 text-[8px] w-[60%] text-center">
                        Loading...
                    </p>
                </div>
                <div className="relative h-[140px] bg-success/20 flex justify-center items-center">
                    <p className=" text-slate-200 text-[8px] w-[60%] text-center">
                        Loading...
                    </p>
                </div>
                <div className="relative h-[140px] bg-success/20 flex justify-center items-center">
                    <p className=" text-slate-200 text-[8px] w-[60%] text-center">
                        Loading...
                    </p>
                </div>
                <div className="relative h-[140px] bg-success/20 flex justify-center items-center">
                    <p className=" text-slate-200 text-[8px] w-[60%] text-center">
                        Loading...
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Category;
