import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Checkout",
    description:
        "Welcome to the checkout page of Aladin-E-Commerce Online Shopping Platform Proceed to payment and enjoy a seamless shopping experience.",
};

const CheckoutLayout = ({ children }: { children: React.ReactNode }) => {
    return <>{children}</>;
};

export default CheckoutLayout;
