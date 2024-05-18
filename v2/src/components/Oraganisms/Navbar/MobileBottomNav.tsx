"use client"

import { IoHomeOutline } from "react-icons/io5";
import { BiSolidUser } from "react-icons/bi";
import { IoCartOutline } from "react-icons/io5";
import { IoIosGitCompare } from "react-icons/io";

import MobileNavbarBottomMolecule from "../../Molecules/Navbar/MobileBottomNav";

import { useStoreContext } from "@/contexts/StoreContextProvider";

const MobileBottomNav = () => {
    const { state } = useStoreContext();

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50">
            <div className="bg-black py-2 text-white grid grid-cols-4 justify-items-center xl:hidden">
                <MobileNavbarBottomMolecule
                    href="/"
                    icon={<IoHomeOutline className="text-white" size={24} />}
                    name="Home"
                />

                <MobileNavbarBottomMolecule
                    href="/products/compare"
                    icon={<IoIosGitCompare className="text-white" size={24} />}
                    name={`Compare (${state?.compareProducts?.length})`}
                />
                <MobileNavbarBottomMolecule
                    href="/products/cart"
                    icon={<IoCartOutline className="text-white" size={24} />}
                    name={`Cart (${state?.carts?.length})`}
                />
                <MobileNavbarBottomMolecule
                    href="/account"
                    icon={<BiSolidUser className="text-white" size={24} />}
                    name={`Account`}
                />
            </div>
        </div>
    );
};

export default MobileBottomNav;
