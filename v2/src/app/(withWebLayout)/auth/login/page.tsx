"use client";

import React, { Suspense } from "react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

import LeftAuth from "@/components/Molecules/Auth/LeftAuth";
import AuthFormFooter from "@/components/Molecules/Auth/AuthFormFooter";
import LoginForm from "@/components/Oraganisms/Form/Auth/LoginForm";
import OTPSendForgotPassForm from "@/components/Oraganisms/Form/Auth/ForgotPasswordForm/OTPSendForgotPassForm";

import { useLoginMutation } from "@/redux/services/auth/authApiService";
import { getUserInfo, storeUserInfo } from "@/store/user/users";
import { LoginFormValues } from "@/types/auth.type";

const Login = () => {
    const [openForgotPasswordModal, setOpenForgotPasswordModal] =
    useState(false);
    
    const user = getUserInfo();
    const router = useRouter();

    const [login, { isLoading }] = useLoginMutation();

    const searchParams = useSearchParams();
    const search = searchParams.get("redirect");

    useEffect(() => {
        if (user?.user) {
            router.push(search || "/");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    const handleLogin = async (data: LoginFormValues) => {
        const result = await login({ ...data });

        // check if the request was successful
        if ("data" in result && result.data && result.data?.success) {
            const data = result.data?.data;
            storeUserInfo(
                JSON.stringify({
                    user: data.user,
                    token: data.token,
                })
            );
            if (search) {
                router.push(`${search}`);
            } else {
                router.push("/");
            }
        } else {
            toast.error("Login Failed!");
        }
    };

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className="pt-5 pb-16">
                <div className="container md:!w-[69%]">
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
            </div>

            {openForgotPasswordModal && (
                <OTPSendForgotPassForm
                    isModalOpen={openForgotPasswordModal}
                    setIsModalOpen={setOpenForgotPasswordModal}
                />
            )}
        </Suspense>
    );
};

export default Login;
