"use client";

import React from "react";
import { useStoreContext } from "@/contexts/StoreContextProvider";
import { MdOutlineShoppingBasket } from "react-icons/md";

interface CartModalProps {
    setIsCartDetailsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setIsCompareModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartModal: React.FC<CartModalProps> = ({
    setIsCartDetailsModalOpen,
    setIsCompareModalOpen,
}) => {
    const { state } = useStoreContext();

    // if compare modal is open then automatically close compare modal
    const handleCartListModalOpen = () => {
        setIsCompareModalOpen(false);
        setIsCartDetailsModalOpen(true);
    };

    return (
        <div
            onClick={handleCartListModalOpen}
            className="w-[60px] hidden md:block shadow-2xl shadow-black group cursor-pointer transition-all relative  border-black hover:border-green-400 rounded-md"
        >
            <div className="bg-black flex justify-center items-center flex-col px-1 py-1 border-2 border-white hover:bg-green-400 hover:border-green-400 transition-all rounded-md">
                <MdOutlineShoppingBasket size={28} color="white" />
                <p className="text-white text-[9px]">CART</p>
            </div>
            <span className="absolute -top-3 -right-2 bg-green-400 px-1.5 py-0.5  group-hover:bg-black transition-all rounded-full text-sm text-white font-bold">
                {state?.carts?.length}
            </span>
        </div>
    );
};

export default CartModal;
