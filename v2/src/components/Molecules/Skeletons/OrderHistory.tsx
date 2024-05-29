import React from "react";

const OrderHistory = () => {
    return (
        <div className="w-full animate-pulse bg-success/20 h-[252px] px-3 py-5">
            <div className="w-full flex flex-col justify-center items-center gap-3">
                <div className="h-[20px] w-[100%] bg-success/20 flex justify-center items-center">
                    <p className=" text-slate-200 text-[8px]">Loading...</p>
                </div>
                <div className="h-[20px] w-[70%] bg-success/20 flex justify-center items-center">
                    <p className=" text-slate-200 text-[8px]">Loading...</p>
                </div>
            </div>

            <div className="w-full h-[100px] bg-success/20 mt-7 flex justify-center items-center">
                <p className=" text-slate-200 text-[8px]">Loading...</p>
            </div>

            <div className="h-[28px] mt-2 bg-success/20 w-[150px] flex justify-center items-center">
                <p className=" text-slate-200 text-[8px] text-center">
                    Loading...
                </p>
            </div>
        </div>
    );
};

export default OrderHistory;
