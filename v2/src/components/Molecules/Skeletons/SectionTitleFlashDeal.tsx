import React from "react";

const SectionTitleFlashDeal = () => {
    return (
        <div className="animate-pulse flex md:justify-between justify-center md:mb-16 mb-16 relative">
            <div className="text-center">
                <div className="w-[220px] rounded-sm h-9 flex justify-center items-center bg-success/20 ">
                    <p className=" text-slate-200 text-[8px] text-center">
                        Loading...
                    </p>
                </div>
                <div className="md:w-[120px] w-full h-4 mt-2 flex justify-center items-center bg-success/20 ">
                    <p className=" text-slate-200 text-[8px] text-center">
                        Loading...
                    </p>
                </div>
            </div>
            <div className="md:block hidden">
                <div className="w-[220px] h-4 mt-2 flex justify-center items-center bg-success/20 ">
                    <p className=" text-slate-200 text-[8px] text-center">
                        Loading...
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SectionTitleFlashDeal;
