import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Register",
    description:
        "Welcome to the register page of Aladin-E-Commerce Online Shopping Platform. Sign in to access your account and enjoy a seamless shopping experience.",
};

const RegisterLayout = ({ children }: { children: React.ReactNode }) => {
    return <>{children}</>;
};

export default RegisterLayout;
