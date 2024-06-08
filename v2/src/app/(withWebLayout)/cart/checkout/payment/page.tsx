"use client"

import { config } from "@/config/envConfig";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
// import { Metadata } from "next";
import dynamic from "next/dynamic";

import StripeCheckout from "@/components/Oraganisms/Checkout/StripeCheckout/StripeCheckout";
import useCheckUser from "@/hooks/useCheckUser";

const stripePromise = loadStripe(config.stripeKey as string);

// export const metadata: Metadata = {
//     title: "Payment",
//     description:
//         "Welcome to the payment page of Aladin-E-Commerce Online Shopping Platform. Proceed to payment and enjoy a seamless shopping experience.",
// };

const Payment = () => {
    useCheckUser();
    return (
        <>
            <div className="container text-center">
                <h4 className="font-bold text-primary text-2xl mt-12">
                    Complete Your Purchase
                </h4>
                <Elements stripe={stripePromise}>
                    <StripeCheckout />
                </Elements>
            </div>
        </>
    );
};

export default dynamic(() => Promise.resolve(Payment), { ssr: false });
