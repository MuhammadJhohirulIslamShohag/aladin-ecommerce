"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";
// import { Metadata } from "next";
import dynamic from "next/dynamic";

import ShowingCarts from "@/components/Oraganisms/Cart/ShowingCarts";
import OrderSummary from "@/components/Oraganisms/Checkout/OrderSummary";

import { useStoreContext } from "@/contexts/StoreContextProvider";
import { StoreActionType } from "@/contexts/storeReducer/storeReducer.type";
import { useAddCartMutation } from "@/redux/services/cart/cartApiService";
import { getCarts } from "@/store/cart/cart";
import { getUserInfo, removeUserInfo } from "@/store/user/users";
import { CartType } from "@/types/cart.types";
import { CustomFetchBaseQueryError } from "@/types/response";



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
        if (user && user?.user) {
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
                if ("error" in result && result.error) {
                    const customError =
                        result.error as CustomFetchBaseQueryError;
                    if (customError.data?.message.includes("jwt expired")) {
                        removeUserInfo();
                        router.push(`/auth/login?redirect=/cart`);
                    }
                }
            }
        } else {
            router.push(`/auth/login?redirect=/cart`);
        }
    };

    const saveCashOrder = async () => {
        setLoading({
            ...loading,
            cashOnDelivery: true,
        });
        if (user && user?.user) {
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
                if ("error" in result && result.error) {
                    const customError =
                        result.error as CustomFetchBaseQueryError;
                    if (customError.data?.message.includes("jwt expired")) {
                        removeUserInfo();
                        router.push(`/auth/login?redirect=/cart`);
                    }
                }
            }
        } else {
            setLoading({
                ...loading,
                cashOnDelivery: false,
            });
            router.push(`/auth/login?redirect=/cart`);
        }
    };

    return (
        <>
            <div className="container mt-10 lg:mb-40 mb-28">
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

export default dynamic(() => Promise.resolve(Cart), { ssr: false });
