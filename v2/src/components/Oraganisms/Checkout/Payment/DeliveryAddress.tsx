import React from "react";

import CouponForm from "../../Form/CouponForm";
import ShippingAddressForm from "../../Form/ShippingAddressForm";

import { CartType } from "@/types/cart.types";

interface DeliveryAddressProps {
    submitShippingAddress: (data: any) => void;
    inValidCouponName: string | null;
    handleCouponSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    couponName: string;
    setCouponName: React.Dispatch<React.SetStateAction<string>>;
    carts: CartType[];
    couponLoading: boolean;
}

const DeliveryAddress: React.FC<DeliveryAddressProps> = ({
    submitShippingAddress,
    inValidCouponName,
    handleCouponSubmit,
    couponName,
    setCouponName,
    carts,
    couponLoading,
}) => {
    return (
        <div className="lg:col-span-7 col-span-0">
            <h4 className="text-xl mb-5 font-semibold text-left text-green-500 bg-white">
                Delivery Address
            </h4>

            {/* Shipping Address Form*/}
            <ShippingAddressForm
                submitShippingAddress={submitShippingAddress}
            />
            <hr className="my-4" />

            {/* Coupon Form*/}
            <h4 className="text-green-400">Got Coupon?</h4>
            {inValidCouponName && (
                <div className="bg-success text-center">
                    <h6 className="text-white p-2">{inValidCouponName}</h6>
                </div>
            )}
            <CouponForm
                handleCouponSubmit={handleCouponSubmit}
                couponName={couponName}
                setCouponName={setCouponName}
                carts={carts}
                loading={couponLoading}
            />
        </div>
    );
};

export default DeliveryAddress;
