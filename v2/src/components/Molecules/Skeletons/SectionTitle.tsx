import React from "react";

const SectionTitle = () => {
    return (
        <div className="animate-pulse flex flex-col items-center justify-center md:mb-12 mb-7">
            <div className="w-[39%] rounded-sm h-9 flex justify-center items-center bg-success/20 ">
                <p className=" text-slate-200 text-[8px] text-center">
                    Loading...
                </p>
            </div>
            <div className="w-[220px] h-4 mt-2 flex justify-center items-center bg-success/20 ">
                <p className=" text-slate-200 text-[8px] text-center">
                    Loading...
                </p>
            </div>
        </div>
    );
};

export default SectionTitle;
