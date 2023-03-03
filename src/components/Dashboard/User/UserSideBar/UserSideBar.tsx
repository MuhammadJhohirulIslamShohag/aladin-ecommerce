import Image from "next/image";
import React from "react";
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { HiOutlineLocationMarker } from "react-icons/hi";
import SideBarItem from "../UserDashboardSideBar/SideBarItem";
import { useStoreContext } from "@/lib/contexts/StoreContextProvider";

const UserSideBar = () => {
    const { firebaseUser } = useStoreContext();
    return (
        <aside
            className="z-40 w-64 h-screen transition-transform"
            aria-label="Sidebar"
        >
            <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50">
                <div className="flex items-center justify-center mb-4">
                    {firebaseUser?.photoURL && (
                        <Image
                            src={firebaseUser.photoURL}
                            className="rounded-full"
                            alt="profile Logo"
                            width={100}
                            height={130}
                        />
                    )}
                </div>
                <ul>
                    <SideBarItem link="/dashboard/user/profile" name="Profile">
                        <AiOutlineUser className="flex-shrink-0 w-6 h-6 text-gray-500 group-focus-within:text-white transition duration-75 group-hover:text-white" />
                    </SideBarItem>
                    <SideBarItem link="/dashboard/user/address" name="Address">
                        <HiOutlineLocationMarker className="flex-shrink-0 w-6 h-6 text-gray-500 group-focus-within:text-white transition duration-75 group-hover:text-white" />
                    </SideBarItem>
                    <SideBarItem
                        link="/dashboard/user/user-wishlist"
                        name="Wish List"
                    >
                        <AiOutlineHeart className="flex-shrink-0 w-6 h-6 text-gray-500 group-focus-within:text-white transition duration-75 group-hover:text-white" />
                    </SideBarItem>
                    <SideBarItem
                        link="/dashboard/user/history"
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
