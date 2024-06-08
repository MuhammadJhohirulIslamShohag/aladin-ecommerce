import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Wish-Lists",
    description:
        "Welcome to the Wish-Lists page of Aladin-E-Commerce Online Shopping Platform. Create and manage your personalized wish lists. Explore our wide selection of products and add your favorites for future purchases.",
};

const WishListLayout = ({ children }: { children: React.ReactNode }) => {
    return <>{children}</>;
};

export default WishListLayout;
