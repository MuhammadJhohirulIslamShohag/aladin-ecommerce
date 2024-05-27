"use client"

import React from "react";
import { useRouter } from "next/navigation";

import { CartType } from "@/types/cart.types";
import { IUser } from "@/types/user.type";

interface OrderSummaryProps {
    carts: CartType[];
    getTotalPrice: () => number;
    user: IUser;
    loading: {
        onlinePaymentCheckOut: boolean;
        cashOnDelivery: boolean;
    };
    savePaymentOrder: () => void;
    saveCashOrder: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
    carts,
    getTotalPrice,
    user,
    loading,
    savePaymentOrder,
    saveCashOrder,
}) => {
    const router = useRouter();

    return (
        <div className="lg:col-span-3 col-span-0">
            <div className="bg-gray-100 p-5  rounded-lg lg:mt-12 md:mt-5 mt-5">
                <h4 className="text-xl font-semibold text-green-400 mb-3">
                    Order Summary
                </h4>
                <h4 className="text-lg font-semibold text-primary">Product</h4>
                <hr className="mb-2" />
                {carts &&
                    carts.map((product: CartType) => (
                        <p
                            className="text-md font-normal text-primary"
                            key={product?._id}
                        >
                            {product?.name} x {product?.count} ={" "}
                            {`$${product?.price * product?.count}`}
                        </p>
                    ))}
                <hr className="mt-2" />
                <p className="text-lg font-semibold text-primary">
                    Total Price = {`$${getTotalPrice()}`}
                </p>
                <hr />
                {user ? (
                    <>
                        <button
                            className="border-2 px-5 py-2 border-black hover:bg-primary font-semibold hover:text-white rounded-md transition-all duration-500 w-full disabled:opacity-75 disabled:border-2 disabled:border-primary mt-5"
                            disabled={
                                !carts?.length || loading.onlinePaymentCheckOut
                            }
                            onClick={savePaymentOrder}
                        >
                            {loading.onlinePaymentCheckOut
                                ? "Processing..."
                                : "Proceed To Checkout"}
                        </button>
                        <br />
                        <button
                            className="border-2 px-5 py-2 border-black hover:bg-primary font-semibold hover:text-white rounded-md transition-all duration-500 w-full disabled:opacity-75 disabled:border-2 disabled:border-primary mt-2"
                            disabled={!carts?.length || loading.cashOnDelivery}
                            onClick={saveCashOrder}
                        >
                            {loading.cashOnDelivery
                                ? "Processing..."
                                : "Checkout To Cash On Delivery"}
                        </button>
                    </>
                ) : (
                    <button
                        className="border-2 px-5 py-2 border-black hover:bg-primary font-semibold hover:text-white rounded-md transition-all duration-500 w-full disabled:opacity-75 disabled:border-2 disabled:border-primary mt-5 "
                        disabled={!carts?.length}
                        onClick={() =>
                            router.push("/auth/login?redirect=/cart")
                        }
                    >
                        Login To Checkout
                    </button>
                )}
            </div>
        </div>
    );
};

export default OrderSummary;
