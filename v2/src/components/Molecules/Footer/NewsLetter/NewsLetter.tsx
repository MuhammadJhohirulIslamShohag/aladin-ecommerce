"use client"

import Image from 'next/image'
import { BsFillSendFill } from "react-icons/bs";


const NewsLetter = () => {
    return (
        <div className="z-50">
            <div className="z-50 mx-auto px-4 lg:px-0 w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3">
                <div className="flex mb-50 justify-center">
                    <div className="w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3">
                        <div className="">
                            <div className="flex flex-col items-center justify-center">
                                <div className="bg-gradient-to-br from-green-700 to-green-400 rounded-full shadow-lg flex justify-center items-center h-36 w-36 relative">
                                    <Image src={"/footer/icon.png"} alt="Not Available" className="h-24 w-24" height={100} width={100} />
                                </div>

                                <p className="text-center mt-16 text-white">
                                    Sign up to receive a monthly email on the
                                    latest news!
                                </p>
                                <form className="relative text-center w-3/4 mt-8">
                                    <input
                                        type="text"
                                        placeholder="Your Email Address"
                                        className="bg-green-900 border border-white border-opacity-25 rounded-full text-white py-3 px-8 w-full focus:outline-none placeholder:text-white"
                                    />
                                    <button
                                        type="submit"
                                        className="bg-gradient-to-br from-green-600 to-green-900 rounded-full text-white text-2xl h-12 w-12 absolute top-0 right-0  flex justify-center items-center"
                                    >
                                        <BsFillSendFill />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsLetter;
