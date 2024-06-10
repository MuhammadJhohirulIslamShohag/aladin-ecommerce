"use client";

import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";

import { FaBarsStaggered } from "react-icons/fa6";

const MobileNavBar = () => {
    const [openMobileNavBar, setOpenMobileNavBar] = useState(false);
    const pathName = usePathname();

    return (
        <>
            <button
                onClick={() => setOpenMobileNavBar((prev) => !prev)}
                type="button"
                className="text-white bg-black font-medium rounded-t-lg text-sm  text-center items-center flex w-[100px] h-[53px] px-5 justify-between cursor-pointer"
            >
                <div className="flex items-center gap-2">
                    <span>
                        <FaBarsStaggered size={17} />
                    </span>
                    <span>Menu</span>
                </div>
            </button>
            <div
                className={`z-10 origin-top transition-all ${
                    openMobileNavBar ? "scale-100" : "scale-0"
                } top-full absolute bg-white divide-y divide-gray-100 rounded-lg shadow right-[0%] w-[170px]`}
            >
                <ul className="py-2 text-sm text-gray-700   ">
                    {["/", "#about-us", "#blogs", "#contact-us", "/shop"]?.map(
                        (data, idx) => (
                            <li
                                key={idx}
                                className="flex justify-between items-center px-4 py-2 hover:bg-green-400 transition-all duration-300 group relative"
                            >
                                <Link href={`${data}`}>
                                    <span
                                        className={`transition-all duration-300 group-hover:text-white capitalize ${
                                            pathName === data
                                                ? "text-white"
                                                : ""
                                        }`}
                                    >
                                        {data}
                                    </span>
                                </Link>
                            </li>
                        )
                    )}
                </ul>
            </div>
        </>
    );
};

export default MobileNavBar;
