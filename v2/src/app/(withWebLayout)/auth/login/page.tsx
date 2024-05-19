"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

import LeftAuth from "@/components/Molecules/Auth/LeftAuth";
import LoginForm from "@/components/Oraganisms/Form/LoginForm";
import ForgotPasswordForm from "@/components/Oraganisms/Form/ForgotPasswordForm";
import ResendOTPForm from "@/components/Oraganisms/Form/ResendOTPForm";
import AuthFormFooter from "@/components/Molecules/Auth/AuthFormFooter";

import { useLoginMutation } from "@/redux/services/auth/authApiService";
import { getUserInfo, storeUserInfo } from "@/store/user/users";
import { LoginFormValues } from "@/types/auth.type";

const Login = () => {
    const [login, { isLoading }] = useLoginMutation();
    const [openForgotPasswordModal, setOpenForgotPasswordModal] =
        useState(false);
    const [openResendOTPModal, setOpenResendOTPModal] = useState(false);

    const user = getUserInfo();

    const router = useRouter();

    const searchParams = useSearchParams();
    const search = searchParams.get("search");

    useEffect(() => {
        if (user) {
            router.push("/");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    const handleLogin = async (data: LoginFormValues) => {
        let loginObject = {};
        if (data.phoneOrEmail.startsWith("+")) {
            loginObject = {
                phone: data.phoneOrEmail,
                password: data.password,
            };
        } else {
            loginObject = {
                email: data.phoneOrEmail,
                password: data.password,
            };
        }

        const result = await login(loginObject);

        // check if the request was successful
        if ("data" in result && result.data && result.data?.success) {
            router.push("/account");
            storeUserInfo(
                JSON.stringify({
                    user: data.userInfo,
                    token: data.accessToken,
                })
            );
            if (typeof search === "string") {
                router.push(`/${search}`);
            } else {
                router.push("/");
            }
        } else {
            toast.error("Login Failed!");
        }
    };

    return (
        <div className="bg-white">
            <div className="container !w-[69%]">
                <div className="grid lg:grid-cols-2 grid-cols-1 place-items-center">
                    <LeftAuth />
                    <div className="mx-auto w-full max-w-[450px] my-8 py-6 px-7 bg-white/80 shadow-lg rounded-md">
                       
                        <LoginForm
                            handleLogin={handleLogin}
                            setOpenForgotPasswordModal={
                                setOpenForgotPasswordModal
                            }
                            isLoading={isLoading}
                        />
                        <AuthFormFooter
                            href={"/auth/register"}
                            content={[
                                "Don't have an account?",
                                " Create Your Account",
                            ]}
                        />
                    </div>
                </div>
            </div>

            {openForgotPasswordModal && (
                <ForgotPasswordForm
                    openForgotPasswordModal={openForgotPasswordModal}
                    setOpenForgotPasswordModal={setOpenForgotPasswordModal}
                />
            )}
            {openResendOTPModal && (
                <ResendOTPForm
                    openResendOTPModal={openResendOTPModal}
                    setOpenResendOTPModal={setOpenResendOTPModal}
                />
            )}
        </div>
    );
};

export default Login;
