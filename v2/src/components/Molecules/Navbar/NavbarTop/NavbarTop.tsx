"use client";

import React, { useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { FaGift } from "react-icons/fa";
import Typewriter from "typewriter-effect";
import Link from "next/link";

import DropdownListItem from "../../DropdownListItem";

import { getUserInfo, removeUserInfo } from "@/store/user/users";
import { useRouter } from "next/navigation";

const NavbarTop: React.FC = (): JSX.Element => {
    const [toggleDropdown, setToggleDropdown] = useState<boolean>(false);
    const user = getUserInfo();
    const router = useRouter();

    const handleLogOut = () => {
        removeUserInfo();
        router.push("/");
    };

    return (
        <div className="border-b-[1px] border-b-slate-700 lg:block hidden">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2">
                <div className="text-primary text-sm py-2 md:block hidden">
                    <Typewriter
                        options={{
                            strings: [
                                "Welcome to Aladin!",
                                " Wrap New Offers / Gift Every Single Day on Weekends",
                            ],
                            autoStart: true,
                            loop: true,
                        }}
                    />
                </div>
                <div>
                    <ul className="flex justify-center md:justify-end space-x-3">
                        <li className="text-primary hover:text-success transition ease-in-out delay-15 cursor-pointer text-center text-sm inline-flex items-center">
                            <FaGift className="mr-1" />
                            Gift Certificates
                        </li>

                        {user?.user ? (
                            <li className="relative">
                                <span
                                    className={`${
                                        toggleDropdown
                                            ? "text-success"
                                            : "text-primary"
                                    } hover:text-success transition ease-in-out delay-15 py-2 cursor-pointer text-center inline-flex items-center relative`}
                                    onClick={() =>
                                        setToggleDropdown(!toggleDropdown)
                                    }
                                >
                                    <CgProfile className="mr-1" /> My Account{" "}
                                    <AiFillCaretDown className="ml-1 mt-1" />
                                </span>
                                <ul
                                    className={`z-10 origin-top transition-all ${
                                        toggleDropdown ? "scale-100" : "scale-0"
                                    } absolute shadow bg-white rounded-box w-52`}
                                >
                                    {user && user.role === "admin" && (
                                        <DropdownListItem
                                            link="/admin"
                                            className="text-primary hover:text-success"
                                        >
                                            Admin Dashboard
                                        </DropdownListItem>
                                    )}

                                    <DropdownListItem
                                        link="/user"
                                        className="block transition-all px-4 py-2 hover:bg-success/90 hover:text-white "
                                    >
                                        Profile
                                    </DropdownListItem>

                                    <DropdownListItem
                                        link="/cart/checkout"
                                        className="block transition-all px-4 py-2 hover:bg-success/90 hover:text-white"
                                    >
                                        Check Out
                                    </DropdownListItem>

                                    <li
                                        onClick={handleLogOut}
                                        className="block transition-all px-4 py-2 hover:bg-success/90 hover:text-white cursor-pointer"
                                    >
                                        <span>LogOut</span>
                                    </li>
                                </ul>
                            </li>
                        ) : (
                            <li className="relative py-2">
                                <Link
                                    className=" hover:text-primary cursor-pointer transition-all text-success/90"
                                    href={"/auth/login"}
                                >
                                    Login
                                </Link>{" "}
                                Or{" "}
                                <Link
                                    className="hover:text-primary cursor-pointer transition-all text-success/90"
                                    href={"/auth/register"}
                                >
                                    Register
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default NavbarTop;
