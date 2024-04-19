import Link from 'next/link'
import {
    FaAppStore,
    FaFacebookF,
    FaGooglePlay,
    FaInstagram,
    FaYoutube,
} from "react-icons/fa";

const FooterMiddle = () => {
    return (
        <div>
            <div className="mt-10  py-4 flex flex-col md:flex-row items-center justify-between">
                <div className="flex flex-col md:flex-row items-center gap-2 ">
                    <p className="font-semibold text-xs text-white">
                        Experience Aladin App on your mobile:
                    </p>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 border border-gray-500 rounded-md py-[3px] px-2 hover:border-green-200 cursor-pointer">
                            <FaGooglePlay size={20} className="text-white" />
                            <div className="flex flex-col">
                                <span className="text-[9px] text-white">
                                    Download on
                                </span>
                                <span className="text-xs font-bold text-white">
                                    Google Play
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 border border-gray-500 rounded-md py-[3px] px-2 hover:border-green-200 cursor-pointer">
                            <FaAppStore size={20} className="text-white" />
                            <div className="flex flex-col">
                                <Link
                                    href={""}
                                    target="_blank"
                                    className="text-[9px] text-white"
                                >
                                    Download on
                                </Link>
                                <Link
                                    href={""}
                                    target="_blank"
                                    className="text-xs font-bold text-white"
                                >
                                    App Store
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2 mt-4 md:mt-0">
                    <Link
                        href={""}
                        target="_blank"
                        className="bg-black bg-opacity-80 p-3 rounded-full cursor-pointer hover:bg-green-200 transition-all group"
                    >
                        <FaFacebookF size={20} className="text-white group-hover:text-black" />
                    </Link>
                    <Link
                        href={""}
                        target="_blank"
                        className="bg-black bg-opacity-80 p-3 rounded-full cursor-pointer hover:bg-green-200 transition-all group"
                    >
                        <FaYoutube size={20} className="text-white group-hover:text-black" />
                    </Link>
                    <Link
                        href={""}
                        target="_blank"
                        className="bg-black bg-opacity-80 p-3 rounded-full cursor-pointer hover:bg-green-200 transition-all group"
                    >
                        <FaInstagram size={20} className="text-white group-hover:text-black" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FooterMiddle;
