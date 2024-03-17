import React from "react";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { BsTwitter } from "react-icons/bs";

const Footer = () => {
    return (
        <div className="bg-secondary mt-10">
            <div className="container">
                <footer className="grid grid-cols-4 sm:grid-cols-1 gap-4 md:grid-cols-3 md:gap-6 justify-between p-10 sm:p-5 text-base-content">
                    <div>
                        <Link
                            href="/"
                            className="text-success italic font-bold text-4xl lg:text-3xl sm:text-3xl cursor-pointer"
                        >
                            <span className="mb-2">Aladin</span>
                        </Link>
                        <p className="text-primary mt-2">
                            Aladin Industries Ltd.
                            <br />
                            Providing reliable products since 2022
                        </p>
                    </div>
                    <div className="mt-1">
                        <div className="text-md md:text-lg sm:text-lg uppercase text-success font-bold">
                            Company
                        </div>
                        <div className="mt-1">
                            <Link
                                href={{
                                    pathname: "/",
                                    hash: "blogs",
                                }}
                                className=" block text-primary hover:text-success transition-all ease-in-out delay-15"
                            >
                                Blogs
                            </Link>
                        </div>
                    </div>
                    <div >
                        <div className="text-md md:text-lg sm:text-lg uppercase text-success font-bold">
                            Legal
                        </div>
                        <div className="mt-1">
                            <Link
                                href="/"
                                className="block text-primary hover:text-success transition-all ease-in-out delay-15 mb-1"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                href="/"
                                className="block text-primary hover:text-success transition-all ease-in-out delay-15"
                            >
                                Terms & Conditions
                            </Link>
                        </div>
                    </div>
                    <div>
                        <div className="text-md md:text-lg sm:text-lg uppercase text-success font-bold">
                            Download
                        </div>
                        <div className="mt-1" >
                            <ul className="text-gray-600  font-medium">
                                <li className="mb-2">
                                    <Link href="#" className="hover:text-success transition-all ease-in-out delay-15">iOS</Link>
                                </li>
                                <li className="mb-2">
                                    <Link href="#" className="hover:text-success transition-all ease-in-out delay-15">Android</Link>
                                </li>
                                <li className="mb-2">
                                    <Link href="#" className="hover:text-success transition-all ease-in-out delay-15">Windows</Link>
                                </li>
                                <li className="mb-2">
                                    <Link href="#" className="hover:text-success transition-all ease-in-out delay-15">MacOS</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </footer>
                <footer className="footer px-10 py-4 border-t bg-secondary text-primary border-base-300 flex justify-around sm:block cursor-pointer">
                    <img
                        src={"../../../../footer/2.png"}
                        alt=""
                        className="w-auto h-auto"
                    />
                    <div className="flex sm:mt-2 sm:justify-center">
                        <Link href="">
                            <FaFacebookF className="text-xl hover:text-success transition ease-in-out delay-15" />
                        </Link>
                        <Link href="">
                            <BsTwitter className="text-xl hover:text-success transition ease-in-out delay-15" />
                        </Link>
                        <Link href="">
                            <FaInstagram className="text-xl hover:text-success transition ease-in-out delay-15" />
                        </Link>
                        <Link href="">
                            <FaLinkedinIn className="text-xl hover:text-success transition ease-in-out delay-15" />
                        </Link>
                    </div>
                </footer>
                <footer className="footer flex justify-center px-10 sm:px-0 py-4 border-t bg-secondary text-base-content border-base-300 text-center">
                    <p className="text-primary">
                        Copyright © 2022 - All right reserved by Muhammad Jhohirul Islam Shohag
                    </p>
                </footer>
            </div>
        </div>
    );
};

export default Footer;
