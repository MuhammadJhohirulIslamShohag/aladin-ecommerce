import React from "react";

const FlatProduct = () => {
    return (
        <div className="w-full animate-pulse h-[186px] py-1 grid grid-cols-2 gap-3">
            <div className="h-full bg-success/20">
                <div className="aspect-video  rounded-md" />
            </div>

            <div className="flex flex-col justify-between py-3">
                <div className="space-y-2">
                    <div className="bg-success/20 w-[90%] ">
                        <p className=" text-slate-200 text-[8px] text-center">
                            Loading...
                        </p>
                    </div>
                    <div className="bg-success/20 w-[90%] ">
                        <p className=" text-slate-200 text-[8px] text-center">
                            Loading...
                        </p>
                    </div>
                </div>

                <div className="flex gap-2">
                    <div className="bg-success/20 p-3 rounded-full text-center">
                        <p className=" text-slate-200 text-[8px] text-center">
                            Loading...
                        </p>
                    </div>
                    <div className="bg-success/20 p-3 rounded-full text-center ">
                        <p className=" text-slate-200 text-[8px] text-center">
                            Loading...
                        </p>
                    </div>
                    <div className="bg-success/20 p-3 rounded-full text-center ">
                        <p className=" text-slate-200 text-[8px] text-center">
                            Loading...
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlatProduct;
