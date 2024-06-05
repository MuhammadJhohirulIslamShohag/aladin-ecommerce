"use client";

import dynamic from "next/dynamic";
import WishlistProduct from "@/components/Oraganisms/Products/WishlistProducts";
import useCheckUser from "@/hooks/useCheckUser";

const WishLists = () => {
    useCheckUser();
    return (
        <>
            <WishlistProduct />
        </>
    );
};

export default dynamic(() => Promise.resolve(WishLists), { ssr: false });
