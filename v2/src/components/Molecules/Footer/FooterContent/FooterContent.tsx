"use client"

import footerData from '@/data/footer';
import Link from 'next/link'
import { MdCall, MdLocationOn } from "react-icons/md";


const FooterContent = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-4 xl:gap-10">
            <div>
                <p className="uppercase text-white tracking-[2px] font-medium text-center md:text-start text-xs md:text-base">
                    Support
                </p>
                <div className="mt-4 w-[70%] md:w-full mx-auto flex items-center border border-gray-400 hover:border-green-200 rounded-[28px] py-2 px-4 cursor-pointer">
                    <div className="mr-2">
                        <MdCall size={24} className="text-white" />
                    </div>
                    <div className="border-l border-gray-400 pl-4">
                        <p className="text-sm text-white tracking-wide">
                            10AM - 7PM
                        </p>
                        <p className="text-xl text-green-200 font-medium">
                            (+880)-177-6897598
                        </p>
                    </div>
                </div>
                <Link
                    href="/information/contact"
                    className="mt-4 w-[70%] md:w-full mx-auto  flex items-center  border border-gray-400 hover:border-green-200 rounded-[28px] py-2 px-4 cursor-pointer"
                >
                    <div className="mr-2">
                        <MdLocationOn size={24} className="text-white" />
                    </div>
                    <div className="border-l border-gray-400 pl-4">
                        <p className="text-sm text-white tracking-wide">
                            Store Locator
                        </p>
                        <p className="text-xl text-green-200 font-medium">
                            Find Our Stores
                        </p>
                    </div>
                </Link>
            </div>

            <div className="lg:col-span-1 xl:col-span-2 ">
                <p className="uppercase text-white tracking-[2px] font-medium text-xs md:text-base text-center md:text-start">
                    about us
                </p>
                <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 md:grid md:grid-cols-2 xl:grid-cols-3 mt-2 md:mt-4 md:gap-y-3 lg:gap-y-4 ">
                    {footerData?.map(({ path_url, path_name, id }) => (
                        <li key={id}>
                            <Link
                               
                                className="hover:text-green-400 hover:underline underline-offset-1"
                                href={`${path_url}`}
                            >
                                {" "}
                                {path_name}
                            </Link>
                        </li>
                    ))} 
                </ul>
            </div>

            <div className="font-medium text-center md:text-start">
                <p className="uppercase text-white tracking-[2px] text-xs md:text-base">
                    stay connected
                </p>
                <p className="mt-4 text-white">Aladin</p>
                <p className="my-1.5 text-[#f5f5f5]">
                    Head Office: Sylhet 3100
                </p>
                <span>Email:</span>
                <p className="mt-1.5 text-green-200">aladin@company.com</p>
            </div>
        </div>
    );
};

export default FooterContent;
