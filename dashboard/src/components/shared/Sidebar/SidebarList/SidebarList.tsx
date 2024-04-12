import { useState } from "react";
import { AiFillDashboard, AiFillSetting } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { BsCartCheck } from "react-icons/bs";
import { FaShoppingBag, FaUsers } from "react-icons/fa";
import { MdLogout, MdOutlineProductionQuantityLimits } from "react-icons/md";
import { RiCoupon4Line } from "react-icons/ri";

import SideBarDropdownListItem from "./SideBarDropdownListItem/SideBarDropdownListItem";
import SideBarListItem from "./SideBarListItem/SideBarListItem";

const SidebarList = () => {
    const [openProduct, setOpenProduct] = useState<boolean>(false);
    const [openCategories, setOpenCategories] = useState<boolean>(false);
    const [openBrands, setOpenBrands] = useState<boolean>(false);
    const [openColors, setOpenColors] = useState<boolean>(false);
    const [openSizes, setOpenSizes] = useState<boolean>(false);
    const [openSubCategories, setOpenSubCategories] = useState<boolean>(false);
    const [openAllUsers, setOpenAllUsers] = useState<boolean>(false);
    const [openSetting, setOpenSetting] = useState<boolean>(false);

    const handleLogOut = () => {};

    return (
        <ul className="space-y-2 px-3">
            <SideBarListItem navigationLink="/">
                <AiFillDashboard className="h-[19px] w-[19px] text-green-400" />
                <span className="ml-3">Dashboard</span>
            </SideBarListItem>
            <SideBarListItem navigationLink="/orders">
                <BsCartCheck className="h-[19px] w-[19px] text-green-400" />
                <span className="flex-1 ml-3 whitespace-nowrap">Orders</span>
            </SideBarListItem>
            <SideBarListItem navigationLink="/customers">
                <FaShoppingBag className="h-[19px] w-[19px] text-green-400" />
                <span className="flex-1 ml-3 whitespace-nowrap">Customers</span>
            </SideBarListItem>
            <SideBarListItem navigationLink="/coupons">
                <RiCoupon4Line className="h-[19px] w-[19px] text-green-400" />
                <span className="flex-1 ml-3 whitespace-nowrap">Coupons</span>
            </SideBarListItem>
            <SideBarListItem navigationLink="/categories">
                <RiCoupon4Line className="h-[19px] w-[19px] text-green-400" />
                <span className="flex-1 ml-3 whitespace-nowrap">
                    Categories
                </span>
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
                    dropdownNavigationLink="/products/addProduct"
                    name="Add Product"
                />
            </SideBarListItem>

            <SideBarListItem
                open={openCategories}
                setOpen={setOpenCategories}
                icon={
                    <BiCategory className="h-[19px] w-[19px] text-green-400" />
                }
                dropdownMainMenuName="Categories"
                isDropdownList
            >
                <SideBarDropdownListItem
                    dropdownNavigationLink="/categories"
                    name="All Categories"
                />
                <SideBarDropdownListItem
                    dropdownNavigationLink="/categories/addCategory"
                    name="Add Category"
                />
            </SideBarListItem>
            <SideBarListItem
                open={openBrands}
                setOpen={setOpenBrands}
                icon={
                    <BiCategory className="h-[19px] w-[19px] text-green-400" />
                }
                dropdownMainMenuName="Brands"
                isDropdownList
            >
                <SideBarDropdownListItem
                    dropdownNavigationLink="/brands"
                    name="All Brands"
                />
                <SideBarDropdownListItem
                    dropdownNavigationLink="/brands/addBrand"
                    name="Add Brand"
                />
            </SideBarListItem>
            <SideBarListItem
                open={openColors}
                setOpen={setOpenColors}
                icon={
                    <BiCategory className="h-[19px] w-[19px] text-green-400" />
                }
                dropdownMainMenuName="Colors"
                isDropdownList
            >
                <SideBarDropdownListItem
                    dropdownNavigationLink="/colors"
                    name="All Colors"
                />
                <SideBarDropdownListItem
                    dropdownNavigationLink="/colors/addColor"
                    name="Add Color"
                />
            </SideBarListItem>
            <SideBarListItem
                open={openSizes}
                setOpen={setOpenSizes}
                icon={
                    <BiCategory className="h-[19px] w-[19px] text-green-400" />
                }
                dropdownMainMenuName="Sizes"
                isDropdownList
            >
                <SideBarDropdownListItem
                    dropdownNavigationLink="/sizes"
                    name="All Sizes"
                />
                <SideBarDropdownListItem
                    dropdownNavigationLink="/sizes/addSize"
                    name="Add Size"
                />
            </SideBarListItem>
            <SideBarListItem
                open={openSubCategories}
                setOpen={setOpenSubCategories}
                icon={
                    <BiCategory className="h-[19px] w-[19px] text-green-400" />
                }
                dropdownMainMenuName="SubCategories"
                isDropdownList
            >
                <SideBarDropdownListItem
                    dropdownNavigationLink="/subCategories"
                    name="All SubCategory"
                />
                <SideBarDropdownListItem
                    dropdownNavigationLink="/subCategories/addSubCategory"
                    name="Add SubCategory"
                />
            </SideBarListItem>
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
            <SideBarListItem
                open={openAllUsers}
                setOpen={setOpenAllUsers}
                icon={<FaUsers className="h-[19px] w-[19px] text-green-400" />}
                dropdownMainMenuName="All Users"
                isDropdownList
            >
                <SideBarDropdownListItem
                    dropdownNavigationLink="/allSellers"
                    name="All Sellers"
                />
                <SideBarDropdownListItem
                    dropdownNavigationLink="/allBuyers"
                    name="All Buyers"
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
