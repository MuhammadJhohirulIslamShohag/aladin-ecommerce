import React from "react";

const FlashDeal = () => {
    return (
        <div className="w-full relative animate-pulse h-[418px] py-2">
            <div className="absolute -top-6 left-0">
                <div className="h-[60px] bg-success/30 w-[60px] flex justify-center items-center">
                    <p className=" text-slate-200 text-[8px] ">Loading...</p>
                </div>
            </div>
            <div className="relative py-1 h-[255px] bg-success/20">
                <div className="aspect-video rounded-md " />
            </div>

            <div className="mt-3">
                <div className="flex gap-3 pb-2">
                    <div className="w-[90px] text-center">
                        <p className="bg-success/20 text-slate-200 text-[8px]">
                            Loading...
                        </p>
                    </div>

                    <div className="w-[90px] text-center">
                        <p className="bg-success/20 text-slate-200 text-[8px]">
                            Loading...
                        </p>
                    </div>
                </div>
                <div className="flex justify-center items-center bg-success/20 w-full rounded-full mb-2">
                    <p className=" text-slate-200 text-[8px] text-center">
                        Loading...
                    </p>
                </div>

                <div className="flex justify-between items-center bg-success/20">
                    <div className="flex h-6 justify-between items-center bg-success/20">
                        <p className=" text-slate-200 text-[8px] text-center w-16">
                            Loading...
                        </p>
                    </div>
                    <div className="flex h-6  justify-between items-center bg-success/20">
                        <p className=" text-slate-200 text-[8px] text-center w-16">
                            Loading...
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlashDeal;
