"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import ShowingCarts from "@/components/Oraganisms/Cart/ShowingCarts";
import OrderSummary from "@/components/Oraganisms/Checkout/OrderSummary";

import { useStoreContext } from "@/contexts/StoreContextProvider";
import { getUserInfo } from "@/store/user/users";
import { CartType } from "@/types/cart.types";
import { StoreActionType } from "@/contexts/storeReducer/storeReducer.type";
import { getCarts } from "@/store/cart/cart";
import { useAddCartMutation } from "@/redux/services/cart/cartApiService";

const Cart = () => {
    const user = getUserInfo();
    const { dispatch } = useStoreContext();

    const carts = getCarts();

    const [loading, setLoading] = useState({
        onlinePaymentCheckOut: false,
        cashOnDelivery: false,
    });

    const router = useRouter();

    // redux api call
    const [addCart] = useAddCartMutation();

    const getTotalPrice = () => {
        const totalPrice =
            carts &&
            carts.reduce((acc: number, cur: CartType) => {
                return acc + cur.price * cur.count;
            }, 0);
        return totalPrice;
    };

    const savePaymentOrder = async () => {
        setLoading({
            ...loading,
            onlinePaymentCheckOut: true,
        });
        if (user !== null) {
            const result = await addCart(carts);
            // check if the request was successful
            if ("data" in result && result.data && result.data?.success) {
                setLoading({
                    ...loading,
                    onlinePaymentCheckOut: false,
                });
                router.push("/cart/checkout");
            } else {
                setLoading({
                    ...loading,
                    onlinePaymentCheckOut: false,
                });
            }
        }
    };

    const saveCashOrder = async () => {
        setLoading({
            ...loading,
            cashOnDelivery: true,
        });
        if (user !== null) {
            const result = await addCart(carts);
            // check if the request was successful
            if ("data" in result && result.data && result.data?.success) {
                dispatch({
                    type: StoreActionType.CASH_ON_DELIVERY,
                    payload: true,
                });
                setLoading({
                    ...loading,
                    cashOnDelivery: false,
                });
                router.push("/cart/checkout");
            } else {
                setLoading({
                    ...loading,
                    cashOnDelivery: false,
                });
            }
        }
    };

    return (
        <>
            <div className="container mt-10 mb-28">
                <div className="grid lg:grid-cols-12 lg:gap-5 grid-cols-1 gap-0">
                    {/* Showing Carts */}
                    <ShowingCarts carts={carts} />

                    {/* Order Summary Card */}
                    <OrderSummary
                        carts={carts}
                        getTotalPrice={getTotalPrice}
                        user={user}
                        loading={loading}
                        savePaymentOrder={savePaymentOrder}
                        saveCashOrder={saveCashOrder}
                    />
                </div>
            </div>
        </>
    );
};

export default Cart;
