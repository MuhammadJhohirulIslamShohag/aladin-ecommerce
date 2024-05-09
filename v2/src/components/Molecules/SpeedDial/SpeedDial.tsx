"use client";

import React, { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { PiDesktopTower } from "react-icons/pi";
import Link from "next/link";

import { useStoreContext } from "@/contexts/StoreContextProvider";

const SpeedDial = () => {
    const [isHovered, setIsHovered] = useState(false);

    const { state } = useStoreContext();

    return (
        <div
            className="fixed flex end-5 bottom-1/2 group"
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className={`flex items-center me-4 space-x-2 rtl:space-x-reverse relative z-[999999999] origin-top-right transition-all ${
                    isHovered ? "scale-100" : "scale-0 hidden"
                }}`}
            >
                {/* Pc Builder */}
                <Link href={"/pc_builder"}>
                <div className="hidden md:block shadow-2xl shadow-black  group cursor-pointer  transition-all relative hover:border-green-400 rounded-md w-[60px]">
                    <div className="bg-black flex justify-center items-center flex-col px-1 py-1 border-2 transition-all border-white hover:bg-green-400 hover:border-green-400 rounded-md">
                    <PiDesktopTower size={30} color="white" />
                    <p className="text-white text-[9px]">PC Build</p>
                    </div>
                   
                </div>
                   
                </Link>

                <div className="hidden md:block shadow-2xl shadow-black  group cursor-pointer  transition-all relative rounded-md w-[60px]">
                    <div className="bg-black flex justify-center items-center flex-col px-1 py-1 border-2 transition-all border-white hover:bg-green-400 hover:border-green-400 rounded-md">
                        <FaRegHeart size={28} color="white" />
                        <p className="text-white text-[9px]">WishList</p>
                    </div>
                    <span className="absolute -top-3 -right-2 bg-green-400 group-hover:bg-black transition-all px-1.5 py-0.5 rounded-full text-sm text-white font-bold">
                        {state?.wishLists?.length ?? 0}
                    </span>
                </div>
            </div>
            <button
                onMouseOver={() => setIsHovered(true)}
                className="flex items-center justify-center text-white bg-black rounded-full w-14 h-14 hover:bg-green-400  focus:ring-0 focus:ring-green-400 focus:outline-none "
            >
                <svg
                    className="w-5 h-5 transition-transform group-hover:rotate-45"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                >
                    <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 1v16M1 9h16"
                    />
                </svg>
                <span className="sr-only">Open actions menu</span>
            </button>
        </div>
    );
};

export default SpeedDial;
