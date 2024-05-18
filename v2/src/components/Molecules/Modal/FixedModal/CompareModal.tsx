"use client";

import React from "react";
import { useStoreContext } from "@/contexts/StoreContextProvider";
import { MdOutlineLibraryAdd } from "react-icons/md";

interface CompareModalProps {
    setIsCompareModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CompareModal: React.FC<CompareModalProps> = ({
    setIsCompareModalOpen,
}) => {
    const { state } = useStoreContext();

    const handleCompareModalOpen = () => {
        setIsCompareModalOpen(true);
    };

    return (
        <div
            onClick={handleCompareModalOpen}
            className="hidden md:block shadow-2xl shadow-black group cursor-pointer transition-all relative  hover:border-green-400 rounded-md w-[60px]"
        >
            <div className="bg-black flex justify-center items-center flex-col px-1 py-1 border-2 border-white hover:bg-green-400 hover:border-green-400 transition-all rounded-md">
                <MdOutlineLibraryAdd size={28} color="white" />
                <p className="text-white text-[9px]">COMPARE</p>
            </div>
            <span className="absolute -top-3 -right-2 bg-green-400 group-hover:bg-black transition-all px-1.5 py-0.5 rounded-full text-sm text-white font-bold">
                {state?.compareProducts?.length ?? 0}
            </span>
        </div>
    );
};

export default CompareModal;
