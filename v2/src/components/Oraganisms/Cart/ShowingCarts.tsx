"use client";

import React from "react";
import Link from "next/link";

import CartTable from "../../Molecules/Cart/CartTable/CartTable";
import Empty from "../../Molecules/Empty";

import { CartType } from "@/types/cart.types";

interface ShowingCartsProps {
    carts: CartType[];
}

const ShowingCarts: React.FC<ShowingCartsProps> = ({ carts }) => {
    let content = null;

    if (carts?.length) {
        content = (
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <CartTable carts={carts} />
            </div>
        );
    }

    if (!carts?.length) {
        content = (
            <Empty
                description={`No Cart Yet ${(
                    <Link
                        className="text-green-400 hover:text-green-600 transition-all"
                        href={"/shop"}
                    >
                        Continue Shopping
                    </Link>
                )}`}
            />
        );
    }

    return (
        <div className="lg:col-span-9 col-span-0">
            <h4 className="text-xl mb-5 font-semibold text-left text-green-500 bg-white rounded-sm py-2 px-3">
                Shopping Cart {carts && carts.length}{" "}
                {carts && carts.length > 1 ? "Products" : "Product"}
            </h4>

            {/* Show Cart Table*/}
            {content}
        </div>
    );
};

export default ShowingCarts;
