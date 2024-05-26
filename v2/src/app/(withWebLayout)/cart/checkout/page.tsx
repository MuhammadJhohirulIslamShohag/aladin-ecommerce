"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

import DeliveryAddress from "@/components/Oraganisms/Checkout/Payment/DeliveryAddress";
import PaymentOrderSummary from "@/components/Oraganisms/Checkout/Payment/PaymentOrderSummary";
import useCheckUser from "@/hooks/useCheckUser";
import HeadSeo from "@/lib/seo/HeadSeo/HeadSeo";

import { useStoreContext } from "@/contexts/StoreContextProvider";
import { StoreActionType } from "@/contexts/storeReducer/storeReducer.type";
import {
    useDeleteCartMutation,
    useUserCartsQuery,
} from "@/redux/services/cart/cartApiService";
import {
    useCashOrderDeliveryMutation,
    useGetTotalPriceAfterDiscountMutation,
} from "@/redux/services/order/orderApiService";
import { getCarts, removeCart } from "@/store/cart/cart";
import { getUserInfo, storeUserInfo } from "@/store/user/users";
import { IShippingAddress } from "@/types/user.type";
import { useUpdateUserMutation } from "@/redux/services/user/userApiService";
import { storeShippingAddress } from "@/store/user/shippingAddress";

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
    const { data: userCartsData } = useUserCartsQuery(user?.user?._id);
    const userCarts = userCartsData?.data;

    const [deleteCart] = useDeleteCartMutation();
    const [cashOrderDelivery] = useCashOrderDeliveryMutation();
    const [updateUser] = useUpdateUserMutation();
    const [getTotalPriceAfterDiscount] =
        useGetTotalPriceAfterDiscountMutation();

    const handleEmptyCart = async () => {
        // remove cart from database
        if (user && user?.token?.accessToken) {
            setLoading({
                ...loading,
                emptyingCartLoading: true,
            });
            const result = await deleteCart(user?.user._id);

            // check if the request was successful
            if ("data" in result && result.data && result.data?.success) {
                setCouponName("");
                setTotalPriceAfterDiscount(0);
                // store to the context
                dispatch({
                    type: StoreActionType.ADD_COUPON,
                    payload: false,
                });
                dispatch({
                    type: StoreActionType.ADD_TO_CART,
                    payload: [],
                });

                setLoading({
                    ...loading,
                    emptyingCartLoading: false,
                });
                removeCart();
                toast.success("Cart Is Empty! Continue Shopping");
                setTimeout(() => {
                    router.push("/cart");
                }, 5000);
            } else {
                toast.error("Cart Delete Failed!");
                setLoading({
                    ...loading,
                    emptyingCartLoading: false,
                });
            }
        }
    };

    // save address to the database
    const submitShippingAddress = async (data: IShippingAddress) => {
        if (user && user.token) {
            setLoading({
                ...loading,
                shippingAddressLoading: true,
            });
            const result = await updateUser({
                data: {
                    shippingAddress:  {...data}
                },
                id: user?.user?._id,
            });

            // check if the request was successful
            if ("data" in result && result.data && result.data?.success) {
                storeUserInfo(
                    JSON.stringify({
                        ...user?.user,
                        shippingAddress: { ...data },
                    })
                );
                setIsAddressSave(true);
                storeShippingAddress(JSON.stringify(data));
                dispatch({
                    type: StoreActionType.ADD_SHIPPING_ADDRESS,
                    payload: data,
                });
                setLoading({
                    ...loading,
                    shippingAddressLoading: false,
                });
                toast.success("Save Address!");
            } else {
                setLoading({
                    ...loading,
                    shippingAddressLoading: false,
                });
            }
        }
    };

    const handleCouponSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading({
            ...loading,
            couponLoading: true,
        });

        const result = await getTotalPriceAfterDiscount({
            couponName,
        });
        // check if the request was successful
        if ("data" in result && result.data && result.data?.success) {
            setTotalPriceAfterDiscount(result.data.totalPriceAfterDiscount);
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
        } else {
            setInValidCouponName("Invalid Coupon");
            setTotalPriceAfterDiscount(0);
            setLoading({
                ...loading,
                couponLoading: false,
            });
        }
    };

    const handleCashOrderDelivery = async () => {
        setLoading({
            ...loading,
            processingOrderLoading: true,
        });
        if (user && user.token) {
            const result = await cashOrderDelivery({
                isCashOnDelivery,
                isCouped,
            });

            // check if the request was successful
            if ("data" in result && result.data && result.data?.success) {
                // reset carts from store context
                dispatch({
                    type: StoreActionType.ADD_TO_CART,
                    payload: [],
                });

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
            } else {
                toast.error("Cart Delete Failed!");
                setLoading({
                    ...loading,
                    processingOrderLoading: false,
                });
            }
        }
    };
    return (
        <>
            <HeadSeo
                title="Checkout"
                content="Aladin Industries Ltd. Providing reliable products since 2022"
            />

            <div className="container mt-10 px-40 pb-24">
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
                        cartTotal={userCarts?.cartTotal}
                        totalPriceAfterDiscount={totalPriceAfterDiscount}
                        isCashOnDelivery={isCashOnDelivery}
                        products={userCarts?.products}
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
