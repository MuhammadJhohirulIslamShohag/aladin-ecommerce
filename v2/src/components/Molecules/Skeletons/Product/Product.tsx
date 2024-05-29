import React from "react";

const Product = () => {
    return (
        <div className="w-full animate-pulse h-[418px] py-2">
            <div className="h-[20px]">
                <p className="bg-success/20 text-slate-200 text-[8px] w-[60%]">
                    Loading...
                </p>
            </div>
            <div className="relative py-1 h-[255px] bg-success/20">
                <div className="aspect-video bg-primary/20 rounded-md " />
            </div>

            <div className="mt-3">
                <div className="flex gap-3 pb-2">
                    <p className="bg-success/20 text-slate-200 text-[8px] w-14">
                        Loading...
                    </p>
                    <p className="bg-success/20 text-slate-200 text-[8px] w-12">
                        Loading...
                    </p>
                    <p className="bg-success/20 text-slate-200 text-[8px] w-10">
                        Loading...
                    </p>
                </div>

                <div>
                    <p className="bg-success/20  text-center text-slate-200 text-[8px] w-[100%] ">
                        Loading...
                    </p>
                    <p className="bg-success/20  text-center text-slate-200 text-[8px] w-[90%] mt-2">
                        Loading...
                    </p>
                    <div className="bg-success/20 w-[70%] text-center mt-2">
                        <p className="bg-success/20 text-slate-200 text-[8px] text-center">
                            Loading...
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;
