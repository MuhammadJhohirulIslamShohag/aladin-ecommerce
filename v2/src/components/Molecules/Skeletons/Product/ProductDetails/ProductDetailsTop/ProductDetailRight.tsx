import React from "react";

const ProductDetailRight = () => {
    return (
        <div className="bg-success/20 w-full px-4 py-4">
            <div className="md:w-[400px] mt-2  flex justify-center items-center h-4 w-[200px] bg-success/20">
                <p className=" text-slate-200 text-[8px] text-center">
                    Loading...
                </p>
            </div>
            <div className="flex gap-3">
                <div className="md:w-[100px] mt-2 h-4  flex justify-center items-center w-[200px] bg-success/20">
                    <p className=" text-slate-200 text-[8px] text-center">
                        Loading...
                    </p>
                </div>
                <div className="md:w-[100px] mt-2 h-4  flex justify-center items-center w-[200px] bg-success/20">
                    <p className=" text-slate-200 text-[8px] text-center">
                        Loading...
                    </p>
                </div>
            </div>

            <div className="md:w-[150px] h-7 my-4 flex justify-center items-center  w-[200px] bg-success/20">
                <p className=" text-slate-200 text-[8px] text-center">
                    Loading...
                </p>
            </div>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((idx) => (
                <div className="flex gap-5" key={idx}>
                    <div className="md:w-[150px] mt-2 h-4  flex justify-center items-center w-[200px] bg-success/20">
                        <p className=" text-slate-200 text-[8px] text-center">
                            Loading...
                        </p>
                    </div>
                    <div className="md:w-[150px] mt-2 h-4  flex justify-center items-center w-[200px] bg-success/20">
                        <p className=" text-slate-200 text-[8px] text-center">
                            Loading...
                        </p>
                    </div>
                </div>
            ))}

            <div className="flex gap-2 pt-6">
                {[1, 2].map((idx) => (
                    <div
                        key={idx}
                        className="w-[180px] h-[30px] bg-success/20 flex justify-center items-center rounded-md"
                    >
                        <p className=" text-slate-200 text-[8px] text-center">
                            Loading...
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductDetailRight;
