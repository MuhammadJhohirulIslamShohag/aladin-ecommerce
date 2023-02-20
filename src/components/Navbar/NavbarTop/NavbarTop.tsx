import React, { useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { FaGift } from "react-icons/fa";
import Typewriter from "typewriter-effect";
import DropdownListItem from "../../UI/DropdownListItem/DropdownListItem";

const NavbarTop: React.FC = (): JSX.Element => {
    const [toggleDropdownColor, setToggleDropdownColor] =
        useState<boolean>(true);

    return (
        <>
            <div className="border-b-[1px] border-b-slate-700">
                <div className="container grid sm:grid-cols-1 grid-cols-2">
                    <div className="text-primary text-sm py-2 sm:hidden">
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
                        <ul className="flex sm:justify-center justify-end space-x-3">
                            <li className="text-primary hover:text-success transition ease-in-out delay-15 cursor-pointer text-center text-sm inline-flex items-center">
                                <FaGift className="mr-1" />
                                Gift Certificates
                            </li>
                            <li>
                                <label
                                    className={`text-primary ${
                                        toggleDropdownColor
                                            ? ""
                                            : "text-success"
                                    } hover:text-success transition ease-in-out delay-15 py-2 cursor-pointer text-center inline-flex items-center relative`}
                                    onClick={() =>
                                        setToggleDropdownColor(
                                            !toggleDropdownColor
                                        )
                                    }
                                >
                                    <CgProfile className="mr-1" /> My Account{" "}
                                    <AiFillCaretDown className="ml-1 mt-1" />
                                </label>
                                <ul
                                    className={`${
                                        toggleDropdownColor ? "hidden" : ""
                                    } absolute menu menu-compact right-24 md:right-9 z-10 sm:right-9 dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52`}
                                >
                                    <DropdownListItem
                                        link="/profile"
                                        className="text-primary hover:text-success"
                                    >
                                        Profile
                                    </DropdownListItem>
                                    <DropdownListItem
                                        link="/dashboard/admin"
                                        className="text-primary hover:text-success"
                                    >
                                        Dashboard
                                    </DropdownListItem>
                                    <DropdownListItem
                                        link="/wish-list"
                                        className="text-primary hover:text-success"
                                    >
                                        WishList
                                    </DropdownListItem>
                                    <DropdownListItem
                                        link="/check-out"
                                        className="text-primary hover:text-success"
                                    >
                                        Check Out
                                    </DropdownListItem>
                                    <DropdownListItem
                                        link="/login"
                                        className="text-primary hover:text-success"
                                    >
                                        Login
                                    </DropdownListItem>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NavbarTop;
