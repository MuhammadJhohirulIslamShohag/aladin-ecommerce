"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import HeadSeo from "@/lib/seo/HeadSeo/HeadSeo";
import ShowingCarts from "@/components/Oraganisms/Cart/ShowingCarts";

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

    const savePaymentOrderToDb = async () => {
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
    const saveCashOrderToDb = async () => {
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
            <HeadSeo
                title="Cart"
                content="Aladin Industries Ltd. Providing reliable products since 2022"
            />

            <div className="container mt-10">
                <div className="grid lg:grid-cols-12 lg:gap-5 grid-cols-1 gap-0">
                    {/* Showing Carts */}
                    <ShowingCarts carts={carts} />

                    {/* Order Summary Card */}
                    <div className="col-span-3 sm:col-span-0 md:col-span-0">
                        <div className="bg-gray-100 p-5  rounded-lg mt-12 md:mt-5 sm:mt-5">
                            <h4 className="text-xl font-semibold text-green-400 mb-3">
                                Order Summary
                            </h4>
                            <h4 className="text-lg font-semibold text-primary">
                                Product
                            </h4>
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
                                        className="btn hover:bg-transparent hover:text-primary text-white btn-primary mt-2 w-full disabled:opacity-75 disabled:border-2 disabled:border-primary disabled:text-primary"
                                        disabled={
                                            !carts?.length ||
                                            loading.onlinePaymentCheckOut
                                        }
                                        onClick={savePaymentOrderToDb}
                                    >
                                        {loading.onlinePaymentCheckOut
                                            ? "Processing..."
                                            : "Proceed To Checkout"}
                                    </button>
                                    <br />
                                    <button
                                        className="btn hover:bg-transparent hover:text-primary text-white btn-primary mt-2 w-full disabled:opacity-75 disabled:border-2 disabled:border-primary disabled:text-primary"
                                        disabled={
                                            !carts?.length ||
                                            loading.cashOnDelivery
                                        }
                                        onClick={saveCashOrderToDb}
                                    >
                                        {loading.cashOnDelivery
                                            ? "Processing..."
                                            : "Checkout To Cash On Delivery"}
                                    </button>
                                </>
                            ) : (
                                <button
                                    className="btn hover:bg-transparent hover:text-primary text-white btn-primary mt-2 w-full disabled:opacity-75 disabled:border-2 disabled:border-primary disabled:text-primary"
                                    disabled={!carts?.length}
                                    onClick={() =>
                                        router.push(
                                            "/auth/login?redirect=/cart"
                                        )
                                    }
                                >
                                    Login To Checkout
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cart;
