import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillDashboard, AiFillSetting } from "react-icons/ai";
import { BsCartCheck } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { MdLogout, MdOutlineProductionQuantityLimits } from "react-icons/md";
import { RiCoupon4Line } from "react-icons/ri";

import SideBarDropdownListItem from "./SideBarDropdownListItem/SideBarDropdownListItem";
import SideBarListItem from "./SideBarListItem/SideBarListItem";

import { getUserInfo, removeUserInfo } from "../../../../store/user/users";
import { USER_ROLES } from "../../../../constants/role";

const SidebarList = () => {
    const [openProduct, setOpenProduct] = useState<boolean>(false);
    const [openAllUsers, setOpenAllUsers] = useState<boolean>(false);
    const [openSetting, setOpenSetting] = useState<boolean>(false);

    const user = getUserInfo();
    const userInfo = user?.user;

    const navigate = useNavigate();

    const handleLogOut = () => {
        removeUserInfo();
        navigate("/login");
    };

    return (
        <ul className="space-y-2 px-3">
            <SideBarListItem navigationLink={"/"}>
                <AiFillDashboard className="h-[19px] w-[19px] text-green-400" />
                <span className="ml-3">Dashboard</span>
            </SideBarListItem>

            {userInfo?.role !== USER_ROLES.admin && (
                <SideBarListItem navigationLink="/admin/orders">
                    <BsCartCheck className="h-[19px] w-[19px] text-green-400" />
                    <span className="flex-1 ml-3 whitespace-nowrap">
                        Orders
                    </span>
                </SideBarListItem>
            )}

            <SideBarListItem navigationLink="/coupons">
                <RiCoupon4Line className="h-[19px] w-[19px] text-green-400" />
                <span className="flex-1 ml-3 whitespace-nowrap">Coupons</span>
            </SideBarListItem>
            <SideBarListItem navigationLink="/categories">
                <RiCoupon4Line className="h-[19px] w-[19px] text-green-400" />
                <span className="flex-1 ml-3 whitespace-nowrap">Category</span>
            </SideBarListItem>
            <SideBarListItem navigationLink="/sub-categories">
                <RiCoupon4Line className="h-[19px] w-[19px] text-green-400" />
                <span className="flex-1 ml-3 whitespace-nowrap">
                    SubCategory
                </span>
            </SideBarListItem>
            <SideBarListItem navigationLink="/colors">
                <RiCoupon4Line className="h-[19px] w-[19px] text-green-400" />
                <span className="flex-1 ml-3 whitespace-nowrap">Color</span>
            </SideBarListItem>
            <SideBarListItem navigationLink="/sizes">
                <RiCoupon4Line className="h-[19px] w-[19px] text-green-400" />
                <span className="flex-1 ml-3 whitespace-nowrap">Size</span>
            </SideBarListItem>
            <SideBarListItem navigationLink="/brands">
                <RiCoupon4Line className="h-[19px] w-[19px] text-green-400" />
                <span className="flex-1 ml-3 whitespace-nowrap">Brand</span>
            </SideBarListItem>
            <SideBarListItem
                open={openProduct}
                setOpen={setOpenProduct}
                icon={
                    <MdOutlineProductionQuantityLimits className="h-[19px] w-[19px] text-green-400" />
                }
                dropdownMainMenuName="Products"
                isDropdownList
            >
                <SideBarDropdownListItem
                    dropdownNavigationLink="/products"
                    name="My Products"
                />
                <SideBarDropdownListItem
                    dropdownNavigationLink="/products/add-product"
                    name="Add Product"
                />
            </SideBarListItem>
            {userInfo?.role !== USER_ROLES.admin && (
                <SideBarListItem
                    open={openAllUsers}
                    setOpen={setOpenAllUsers}
                    icon={
                        <FaUsers className="h-[19px] w-[19px] text-green-400" />
                    }
                    dropdownMainMenuName="All Users"
                    isDropdownList
                >
                    <SideBarDropdownListItem
                        dropdownNavigationLink="/admin/sellers"
                        name="All Sellers"
                    />
                    <SideBarDropdownListItem
                        dropdownNavigationLink="/admin/buyers"
                        name="All Buyers"
                    />
                </SideBarListItem>
            )}

            <SideBarListItem
                open={openSetting}
                setOpen={setOpenSetting}
                icon={
                    <AiFillSetting className="h-[19px] w-[19px] text-green-400" />
                }
                dropdownMainMenuName="Profile Settings"
                isDropdownList
            >
                <SideBarDropdownListItem
                    dropdownNavigationLink="/setting/profile"
                    name="Profile"
                />
                <SideBarDropdownListItem
                    dropdownNavigationLink="/setting/address"
                    name="Address"
                />
            </SideBarListItem>

            <SideBarListItem isLabel>
                <MdLogout className="h-[19px] w-[19px] text-green-400" />

                <span
                    onClick={handleLogOut}
                    className="flex-1 ml-3 cursor-pointer whitespace-nowrap"
                >
                    LogOut
                </span>
            </SideBarListItem>
        </ul>
    );
};

export default SidebarList;
