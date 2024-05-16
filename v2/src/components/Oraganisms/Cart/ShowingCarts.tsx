import React from "react";
import Link from "next/link";

import CartTable from "../../Molecules/Cart/CartTable/CartTable";

import { CartType } from "@/types/cart.types";

interface ShowingCartsProps {
    carts: CartType[];
}

const ShowingCarts: React.FC<ShowingCartsProps> = ({ carts }) => {
    return (
        <div className="lg:col-span-9 col-span-0">
            <h4 className="text-xl mb-5 font-semibold text-left text-green-500 bg-white">
                Shopping Cart {carts && carts.length}{" "}
                {carts && carts.length > 1 ? "Products" : "Product"}
            </h4>

            {/* Show Cart Table*/}
            {!carts.length ? (
                <h5 className="text-xl mb-5 font-semibold text-left text-primary bg-white">
                    No Cart Yet <Link href="/shop">Continue Shopping</Link>
                </h5>
            ) : (
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <CartTable carts={carts} />
                </div>
            )}
        </div>
    );
};

export default ShowingCarts;
