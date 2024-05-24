"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { CartType } from "@/types/cart.types";
import { IProduct } from "@/types/product.type";

interface OrderSummaryProps {
    carts: CartType[];
    cartTotal: number;
    totalPriceAfterDiscount: number;
    isCashOnDelivery: boolean;
    products: IProduct[];
    handleCashOrderDelivery: () => void;
    setLoading: React.Dispatch<
        React.SetStateAction<{
            shippingAddressLoading: boolean;
            emptyingCartLoading: boolean;
            processingOrderLoading: boolean;
            couponLoading: boolean;
        }>
    >;
    loading: {
        shippingAddressLoading: boolean;
        emptyingCartLoading: boolean;
        processingOrderLoading: boolean;
        couponLoading: boolean;
    };
    handleEmptyCart: () => void;
    isAddressSave: boolean;
}

const PaymentOrderSummary: React.FC<OrderSummaryProps> = ({
    carts,
    cartTotal,
    totalPriceAfterDiscount,
    isCashOnDelivery,
    products,
    handleCashOrderDelivery,
    setLoading,
    loading,
    handleEmptyCart,
    isAddressSave,
}) => {
    const router = useRouter();
 
    return (
        <div className="col-span-5 col-span-0">
            <div className="bg-gray-100 p-5  rounded-lg lg:mt-16 md:mt-5 mt-5">
                <h4 className="text-xl font-semibold text-green-400 mb-3">
                    Order Summary
                </h4>
                <h4 className="text-lg font-semibold text-primary">Product</h4>
                <hr className="mb-2" />
                {carts &&
                    carts?.map((product: CartType) => (
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
                    Total Price = {`$${cartTotal}`}
                </p>
                <hr />
                {totalPriceAfterDiscount > 0 && (
                    <div className="bg-success mb-2">
                        <p className="text-lg font-semibold text-primary">
                            Total Price After Discount : $
                            {totalPriceAfterDiscount}
                        </p>
                    </div>
                )}

                <button
                    className="border-2 px-5 py-2 border-black hover:bg-primary font-semibold hover:text-white rounded-md transition-all duration-500 w-full disabled:opacity-75 disabled:border-2 disabled:border-primary mt-5 "
                    disabled={
                        !isAddressSave ||
                        products?.length < 1 ||
                        loading.processingOrderLoading
                    }
                    onClick={
                        isCashOnDelivery
                            ? handleCashOrderDelivery
                            : () => {
                                  setLoading({
                                      ...loading,
                                      processingOrderLoading: true,
                                  });
                                  router.push("/cart/checkout/payment");
                              }
                    }
                >
                    {loading?.processingOrderLoading
                        ? "Processing..."
                        : "Place Order"}
                </button>
                <br />
                <button
                    className="border-2 px-5 py-2 border-black hover:bg-primary font-semibold hover:text-white rounded-md transition-all duration-500 w-full disabled:opacity-75 disabled:border-2 disabled:border-primary mt-2"
                    disabled={
                        products?.length < 1 || loading?.emptyingCartLoading
                    }
                    onClick={handleEmptyCart}
                >
                    {loading && loading?.emptyingCartLoading
                        ? "Removing..."
                        : "Empty Cart"}
                </button>
            </div>
        </div>
    );
};

export default PaymentOrderSummary;
