"use client";

import WishlistProduct from "@/components/Oraganisms/Products/WishlistProducts";
import useCheckUser from "@/hooks/useCheckUser";

const WishLists = () => {
    useCheckUser();
    
    return <WishlistProduct />;
};

export default WishLists;
