import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Shopping",
    description:
        "Welcome to the Shopping page of Aladin-E-Commerce Online Shopping Platform. Browse through our wide selection of products and enjoy a seamless shopping experience.",
};

const ShopLayout = ({ children }: { children: React.ReactNode }) => {
    return <>{children}</>;
};

export default ShopLayout;
