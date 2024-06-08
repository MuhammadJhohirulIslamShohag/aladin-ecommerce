import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Payment",
    description:
        "Welcome to the payment page of Aladin-E-Commerce Online Shopping Platform. Proceed to payment and enjoy a seamless shopping experience.",
};

const PaymentLayout = ({ children }: { children: React.ReactNode }) => {
    return <>{children}</>;
};

export default PaymentLayout;
