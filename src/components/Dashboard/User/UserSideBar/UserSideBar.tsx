import Image from "next/image";
import React from "react";
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { GrLocation } from "react-icons/gr";
import SideBarItem from "../UserDashboardSideBar/SideBarItem";

const UserSideBar = () => {
    return (
        <aside
            id="logo-sidebar"
            className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
            aria-label="Sidebar"
        >
            <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50">
                <Image
                    src="https://flowbite.com/docs/images/logo.svg"
                    className="h-6 mr-3 sm:h-7"
                    alt="profile Logo"
                    width={150}
                    height={150}
                />
                <ul>
                    <SideBarItem link="/user/profile" name="Profile">
                        <AiOutlineUser className="flex-shrink-0 w-6 h-6 text-gray-500 group-focus-within:text-white transition duration-75 group-hover:text-white" />
                    </SideBarItem>
                    <SideBarItem link="/user/address" name="Address">
                        <GrLocation className="flex-shrink-0 w-6 h-6 text-gray-500 group-focus-within:text-white transition duration-75 group-hover:text-white" />
                    </SideBarItem>
                    <SideBarItem link="/user/user-wishlist" name="Wish List">
                        <AiOutlineHeart className="flex-shrink-0 w-6 h-6 text-gray-500 group-focus-within:text-white transition duration-75 group-hover:text-white" />
                    </SideBarItem>
                    <SideBarItem
                        link="/user/order-history"
                        name="Order History"
                    >
                        <AiOutlineHeart className="flex-shrink-0 w-6 h-6 text-gray-500 group-focus-within:text-white transition duration-75 group-hover:text-white" />
                    </SideBarItem>
                </ul>
            </div>
        </aside>
    );
};

export default UserSideBar;
