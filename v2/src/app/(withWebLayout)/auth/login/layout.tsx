import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login",
    description:
        "Welcome to the login page of Aladin-E-Commerce Online Shopping Platform. Sign in to access your account and enjoy a seamless shopping experience.",
};

const LoginLayout = ({ children }: { children: React.ReactNode }) => {
    return <>{children}</>;
};

export default LoginLayout;
