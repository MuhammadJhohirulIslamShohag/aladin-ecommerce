import React from "react";

const ProductDetailsBottom = () => {
    return (
        <div className="bg-success/20 w-full px-4 py-4">
            <div className="w-full flex gap-2">
                {[1, 2, 3].map((idx) => (
                    <div
                        key={idx}
                        className="mt-2 flex justify-center items-center h-11 w-[200px] bg-success/20"
                    >
                        <p className=" text-slate-200 text-[8px] text-center">
                            Loading...
                        </p>
                    </div>
                ))}
            </div>
            <div className="pt-5">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((idx) => (
                    <div className="flex gap-5" key={idx}>
                        <div className="mt-2 h-4 w-1/2 flex justify-center items-center  bg-success/20">
                            <p className=" text-slate-200 text-[8px] text-center">
                                Loading...
                            </p>
                        </div>
                        <div className="mt-2 h-4 w-1/2 flex justify-center items-center bg-success/20">
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

export default ProductDetailsBottom;
