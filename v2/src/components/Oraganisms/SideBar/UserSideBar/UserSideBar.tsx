"use client";

import Image from "next/image";
import { getUserInfo } from "@/store/user/users";
import { AiOutlineHeart, AiOutlineUser } from "react-icons/ai";
import { FaUserGraduate } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";

import ProfilePictureUpload from "../../../Molecules/ProfilePictureUpload";
import SideBarItem from "../../../Molecules/SideBar/UserSideBar/SideBarItem";

const UserSideBar = () => {
    const user = getUserInfo();
    return (
        <aside className="z-40 w-64 h-screen transition-transform">
            <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50">
                <div className="flex items-center justify-center mb-4">
                    <ProfilePictureUpload />
                </div>
                <ul>
                    <SideBarItem link="/user" name="Profile">
                        <AiOutlineUser className="flex-shrink-0 w-6 h-6 text-green-300 transition duration-75" />
                    </SideBarItem>
                    <SideBarItem link="/user/address" name="Address">
                        <HiOutlineLocationMarker className="flex-shrink-0 w-6 h-6 text-green-300 transition duration-75" />
                    </SideBarItem>
                    <SideBarItem link="/user/wish-list" name="Wish List">
                        <AiOutlineHeart className="flex-shrink-0 w-6 h-6 text-green-300 transition duration-75" />
                    </SideBarItem>
                    <SideBarItem link="/user/history" name="Order History">
                        <MdOutlineProductionQuantityLimits className="flex-shrink-0 w-6 h-6 text-green-300 transition duration-75" />
                    </SideBarItem>
                </ul>
            </div>
        </aside>
    );
};

export default UserSideBar;
