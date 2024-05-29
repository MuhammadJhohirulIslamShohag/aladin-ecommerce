import React from "react";

const ProductDetailLeft = () => {
    return (
        <div className="lg:h-[300px] md:h-[280px] h-[250px] bg-success/20 animate-pulse">
            <div className="h-full flex justify-center items-center">
                <div className="flex justify-center items-center flex-col gap-3">
                    <div className="md:w-[400px] w-[200px] bg-success/20">
                        <p className=" text-slate-200 text-[8px] text-center">
                            Loading...
                        </p>
                    </div>
                    <div className="md:w-[200px] w-[100px] bg-success/20 ">
                        <p className=" text-slate-200 text-[8px] text-center">
                            Loading...
                        </p>
                    </div>
                </div>
            </div>
            <div className="md:flex gap-2 mt-3 hidden">
                {[1, 2, 3, 4, 5].map((idx) => (
                    <div key={idx} className="h-[120px] bg-success/20 ">
                        <div className="w-[120.5px] h-full flex justify-center items-center bg-success/20 ">
                            <p className=" text-slate-200 text-[8px] text-center">
                                Loading...
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductDetailLeft;
