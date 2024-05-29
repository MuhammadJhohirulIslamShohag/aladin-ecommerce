import React from "react";

const LeftHero = () => {
    return (
        <div className="lg:h-[537px] md:h-[330px] h-[250px] bg-success/20 animate-pulse">
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
                    <div className="w-[100px] h-[30px] bg-success/20 flex justify-center items-center rounded-md">
                        <p className=" text-slate-200 text-[8px] text-center">
                            Loading...
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeftHero;
