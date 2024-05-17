"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import useCheckUser from "@/hooks/useCheckUser";
import HeadSeo from "@/lib/seo/HeadSeo/HeadSeo";
import DeliveryAddress from "@/components/Oraganisms/Checkout/Payment/DeliveryAddress";
import PaymentOrderSummary from "@/components/Oraganisms/Checkout/Payment/PaymentOrderSummary";

import {
    createOrderCashOnDelivery,
    emptyCart,
    getTotalPriceAfterDiscount,
    saveShippingAddress,
} from "@/api/user";
import { StoreActionType } from "@/contexts/storeReducer/storeReducer.type";
import { useStoreContext } from "@/contexts/StoreContextProvider";
import { getUserInfo } from "@/store/user/users";
import { getCarts } from "@/store/cart/cart";
import { useGetCartsQuery } from "@/redux/services/cart/cartApiService";
import { IShippingAddress } from "@/types/user.type";

const Checkout = () => {
    useCheckUser();

    const [isAddressSave, setIsAddressSave] = useState<boolean>(false);
    const [couponName, setCouponName] = useState<string>("");
    const [inValidCouponName, setInValidCouponName] = useState<string>("");
    const [totalPriceAfterDiscount, setTotalPriceAfterDiscount] =
        useState<number>(0);
    const [loading, setLoading] = useState({
        shippingAddressLoading: false,
        emptyingCartLoading: false,
        processingOrderLoading: false,
        couponLoading: false,
    });

    const user = getUserInfo();
    const carts = getCarts();
    const router = useRouter();

    const { state, dispatch } = useStoreContext();
    const { isCashOnDelivery, isCouped } = state;

    // redux api call
    const { data: userCartsData } = useGetCartsQuery(user._id);
    const userCarts = userCartsData?.data;

    const handleEmptyCart = () => {
        // remove cart window local storage
        if (typeof window !== "undefined") {
            window.localStorage.removeItem("carts");
        }
        // remove cart from store context
        dispatch({
            type: StoreActionType.ADD_TO_CART,
            payload: [],
        });
        // remove cart from database
        if (user && user!.token) {
            setLoading({
                ...loading,
                emptyingCartLoading: true,
            });
            emptyCart(user.token)
                .then((res) => {
                    setCouponName("");
                    setTotalPriceAfterDiscount(0);
                    // store to the context
                    dispatch({
                        type: StoreActionType.ADD_COUPON,
                        payload: false,
                    });
                    toast.success("Cart Is Empty! Continue Shopping");
                    setLoading({
                        ...loading,
                        emptyingCartLoading: false,
                    });
                    setTimeout(() => {
                        router.push("/cart");
                    }, 5000);
                })
                .catch((error) => {
                    setLoading({
                        ...loading,
                        emptyingCartLoading: false,
                    });
                    console.log(error);
                });
        }
    };

    // save address to the database
    const submitShippingAddress = (data: IShippingAddress) => {
        if (user && user.token) {
            setLoading({
                ...loading,
                shippingAddressLoading: true,
            });
            saveShippingAddress(data, user!.token)
                .then((res) => {
                    setIsAddressSave(true);
                    toast.success("Save Address!");

                    if (typeof window !== "undefined") {
                        window.localStorage.setItem(
                            "shippingAddress",
                            JSON.stringify(res.data.address)
                        );
                    }
                    dispatch({
                        type: StoreActionType.ADD_SHIPPING_ADDRESS,
                        payload: res.data.address,
                    });
                    setLoading({
                        ...loading,
                        shippingAddressLoading: false,
                    });
                })
                .catch((error) => {
                    setLoading({
                        ...loading,
                        shippingAddressLoading: false,
                    });
                    console.log(error);
                });
        }
    };

    const handleCouponSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading({
            ...loading,
            couponLoading: true,
        });
        getTotalPriceAfterDiscount(couponName, user!.token).then((res) => {
            if (res.data.totalPriceAfterDiscount) {
                setTotalPriceAfterDiscount(res.data.totalPriceAfterDiscount);
                setLoading({
                    ...loading,
                    couponLoading: false,
                });
                // store to the context
                dispatch({
                    type: StoreActionType.ADD_COUPON,
                    payload: true,
                });
                setInValidCouponName("");
            }
            if (res.data.error) {
                setInValidCouponName(res.data.error);
                setTotalPriceAfterDiscount(0);
                setLoading({
                    ...loading,
                    couponLoading: false,
                });
            }
        });
    };

    const handleCashOrderDelivery = () => {
        setLoading({
            ...loading,
            processingOrderLoading: true,
        });
        if (user && user.token) {
            createOrderCashOnDelivery(isCashOnDelivery, isCouped, user.token)
                .then((res) => {
                    // reset carts from window local storage
                    if (typeof window !== "undefined") {
                        if (window.localStorage.getItem("carts")) {
                            window.localStorage.removeItem("carts");
                        }
                    }
                    // reset carts from store context
                    dispatch({
                        type: StoreActionType.ADD_TO_CART,
                        payload: [],
                    });
                    emptyCart(user.token);
                    // reset coupon from store context
                    dispatch({
                        type: StoreActionType.ADD_COUPON,
                        payload: false,
                    });
                    // reset cash on delivery store context
                    dispatch({
                        type: StoreActionType.CASH_ON_DELIVERY,
                        payload: false,
                    });
                    setLoading({
                        ...loading,
                        processingOrderLoading: false,
                    });
                    setTimeout(() => {
                        router.push("/user/history");
                    }, 300);
                })
                .catch((error) => {
                    setLoading({
                        ...loading,
                        processingOrderLoading: false,
                    });
                });
        }
    };
    return (
        <>
            <HeadSeo
                title="Checkout"
                content="Aladin Industries Ltd. Providing reliable products since 2022"
            />

            <div className="container mt-10 px-40">
                <div className="grid lg:grid-cols-12 lg:gap-16 grid-cols-1 gap-0 md:grid-cols-1">
                    <DeliveryAddress
                        submitShippingAddress={submitShippingAddress}
                        inValidCouponName={inValidCouponName}
                        handleCouponSubmit={handleCouponSubmit}
                        couponName={couponName}
                        setCouponName={setCouponName}
                        carts={carts}
                        couponLoading={loading.couponLoading}
                    />

                    {/* Order Summary Card */}
                    <PaymentOrderSummary
                        carts={carts}
                        cartTotal={userCarts?.[0]?.cartTotal}
                        totalPriceAfterDiscount={totalPriceAfterDiscount}
                        isCashOnDelivery={isCashOnDelivery}
                        products={userCarts?.[0]?.products}
                        handleCashOrderDelivery={handleCashOrderDelivery}
                        setLoading={setLoading}
                        loading={loading}
                        handleEmptyCart={handleEmptyCart}
                        isAddressSave={isAddressSave}
                    />
                </div>
            </div>
        </>
    );
};

export default Checkout;
