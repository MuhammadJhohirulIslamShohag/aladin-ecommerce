import React from "react";

const RightHero = () => {
    return (
        <div className="lg:h-[537px] md:h-[400px] h-[400px]  animate-pulse">
            <div className="h-full w-full grid grid-cols-1 space-y-2">
                <div className="w-full bg-success/20">
                    <div className="flex w-full h-full justify-center items-center flex-col gap-3">
                        <div className="w-[200px] bg-success/20">
                            <p className=" text-slate-200 text-[8px] text-center">
                                Loading...
                            </p>
                        </div>
                        <div className="w-[120px] bg-success/20 ">
                            <p className=" text-slate-200 text-[8px] text-center">
                                Loading...
                            </p>
                        </div>
                        <div className="space-y-3 pt-5">
                            <div className="md:w-[350px] w-[200px] h-[30px] bg-success/20 flex justify-center items-center rounded-md">
                                <p className=" text-slate-200 text-[8px] text-center">
                                    Loading...
                                </p>
                            </div>
                            <div className="md:w-[350px] w-[200px] h-[30px] bg-success/20 flex justify-center items-center rounded-md">
                                <p className=" text-slate-200 text-[8px] text-center">
                                    Loading...
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" bg-success/20 flex justify-center items-center flex-col">
                    <div className="w-[200px] bg-success/20">
                        <p className=" text-slate-200 text-[8px] text-center">
                            Loading...
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RightHero;
