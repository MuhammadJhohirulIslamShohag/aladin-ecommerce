import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MdFlashOn } from "react-icons/md";

const FlashDeal = () => {
    return (
        <div className="h-[420px] drop-shadow-md">
            <div className="relative w-full cursor-pointer overflow-hidden h-80">
                <Link href={"/"}>
                    <Image
                        src={"http://res.cloudinary.com/dyji5ppzr/image/upload/v1653658605/1653658603068.jpg"}
                        className="h-full w-full object-cover"
                        alt="surprising sales product"
                        width={100}
                        height={420}
                    />
                </Link>
                <div className="absolute top-0 left-0 flex flex-col items-center w-12 h-[4.5rem] p-4 bg-green-300">
                    <MdFlashOn className="absolute scale-150 text-white" />
                    <span className="font-semibold text-lg text-black translate-y-5">
                        40%
                    </span>
                </div>
            </div>
            <div className="flex items-center gap-2 top-2 mb-1">
                <span className="font-bold text-black">USD 2000</span>
                <span className="font-bold line-through text-sm text-gray-600">
                    - USD 2000 $
                </span>
            </div>
            <div>
                <div className="w-full bg-gray-200 rounded-full">
                    <div
                        className="bg-green-300 text-xs font-medium text-black text-center p-0.5 leading-none rounded-full"
                        style={{ width: "45%" }}
                    >
                        45%
                    </div>
                </div>
            </div>
            <div className="text-sm text-black mt-2 w-full flex justify-start">
                45%
            </div>
        </div>
    );
};

export default FlashDeal;
