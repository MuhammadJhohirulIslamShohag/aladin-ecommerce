"use client";

import React from "react";

import { CartType } from "@/types/cart.types";
import CartTableRow from "./CartTableRow";

interface CartTableProps {
    carts: CartType[];
}

const CartTable: React.FC<CartTableProps> = ({ carts = [] }) => {
    return (
        <div className="relative overflow-x-auto sm:rounded-lg scrollbar-thin scrollbar-thumb-gray-300  scrollbar-track-gray-100">
            <table className="w-full text-sm text-left text-gray-500 ">
                <thead className="text-xs uppercase bg-gray-50 text-gray-900 ">
                    <tr>
                        <th scope="col" className="px-6 py-3 ">
                            Image
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Price
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                            Count
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                            Remove
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {carts &&
                        carts.length &&
                        carts.map((cart: CartType) => (
                            <CartTableRow key={cart._id} product={cart} />
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default CartTable;
