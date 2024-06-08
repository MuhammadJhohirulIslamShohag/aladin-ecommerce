import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Cart",
    description:
        "Welcome to your shopping cart on Aladin-E-Commerce Online Shopping Platform. Review and manage items added to your cart before proceeding to checkout.",
};

const CartLayout = ({ children }: { children: React.ReactNode }) => {
    return <>{children}</>;
};

export default CartLayout;
