"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import DeliveryAddress from "@/components/Oraganisms/Checkout/Payment/DeliveryAddress";
import PaymentOrderSummary from "@/components/Oraganisms/Checkout/Payment/PaymentOrderSummary";
import useCheckUser from "@/hooks/useCheckUser";

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
import { useUpdateUserMutation } from "@/redux/services/user/userApiService";
import { getCarts, removeCart } from "@/store/cart/cart";
import { storeShippingAddress } from "@/store/user/shippingAddress";
import { getUserInfo, storeUserInfo } from "@/store/user/users";
import { IShippingAddress } from "@/types/user.type";
import { checkEveryPropertiesHasValue } from "@/utils/checkObjectProValues";

const Checkout = () => {
    useCheckUser();
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

    const address = user?.user?.shippingAddress;

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        watch,
    } = useForm<IShippingAddress>({
        defaultValues: {
            firstName: "",
            lastName: "",
            address1: "",
            address2: "",
            country: "",
            city: "",
            state: "",
            postCode: "",
            phoneNumber: "",
        },
    });

    const shippingAddress = watch();
    const isAddressSave = checkEveryPropertiesHasValue(shippingAddress as any);

    const handleEmptyCart = async () => {
        // remove cart from database
        if (user && user?.token?.accessToken) {
            setLoading({
                ...loading,
                emptyingCartLoading: true,
            });
            const result = await deleteCart(user?.user?._id);

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
                    shippingAddress: { ...data },
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
                billingAddress: user?.user?.shippingAddress,
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
                removeCart();
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

    useEffect(() => {
        if (address) {
            reset({
                firstName: address?.firstName,
                lastName: address?.lastName,
                address1: address?.address1,
                address2: address?.address2,
                country: address?.country,
                city: address?.city,
                state: address?.state,
                postCode: address?.postCode,
                phoneNumber: address?.phoneNumber,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reset]);

    return (
        <>
            <div className="container mt-10 px-40 pb-24">
                <div className="grid lg:grid-cols-12 lg:gap-16 grid-cols-1 gap-0 md:grid-cols-1">
                    <DeliveryAddress
                        submitShippingAddress={submitShippingAddress}
                        inValidCouponName={inValidCouponName}
                        handleCouponSubmit={handleCouponSubmit}
                        couponName={couponName}
                        setCouponName={setCouponName}
                        carts={carts}
                        register={register}
                        handleSubmit={handleSubmit}
                        errors={errors}
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
