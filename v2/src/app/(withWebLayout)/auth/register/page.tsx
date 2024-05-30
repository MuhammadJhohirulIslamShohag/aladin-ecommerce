"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import LeftAuth from "@/components/Molecules/Auth/LeftAuth";
import AuthFormFooter from "@/components/Molecules/Auth/AuthFormFooter";
import RegisterForm from "@/components/Oraganisms/Form/Auth/RegisterForm";
import OTPSendForm from "@/components/Oraganisms/Form/Auth/OTPSendForm";

import { storeUserInfo } from "@/store/user/users";
import { useRegisterMutation } from "@/redux/services/auth/authApiService";
import { OTPSendFormValues, RegisterFormValues } from "@/types/auth.type";
import { useSendOtpMutation } from "@/redux/services/otp/otpApiService";
import { CustomFetchBaseQueryError } from "@/types/response";

const Register = () => {
    const [openOTPModal, setOpenOTPModal] = useState(false);
    const [sendOTPData, setSendOTPData] = useState<RegisterFormValues | null>(
        null
    );

    const router = useRouter();

    // create user redux
    const [register, { isLoading }] = useRegisterMutation();
    const [sendOtp, { isLoading: sendOtpLoading }] = useSendOtpMutation();

    const handleRegister = async (data: RegisterFormValues) => {
        const result = await sendOtp({ ...data });

        // check if the request was successful
        if ("data" in result && result.data && result.data?.success) {
            if (
                !result?.data?.data.includes(
                    "Failed to Send OTP, Please Contact Their Support Section"
                )
            ) {
                toast.success(result?.data?.data, { duration: 6000 });
                setSendOTPData((prev) => ({ ...prev, ...data }));
                setOpenOTPModal((prev) => !prev);
            } else {
                toast.error(result?.data?.data);
            }
        } else {
            if ("error" in result && result.error) {
                const customError = result.error as CustomFetchBaseQueryError;
                if (customError.data?.message) {
                    toast.error(customError.data?.message);
                }
            } else {
                toast.error("Invalid Credentials!. Try Again!");
            }
        }
    };

    const handleOtpSend = async (data: OTPSendFormValues) => {
        const result = await register({
            email: sendOTPData?.email,
            name: sendOTPData?.name,
            password: sendOTPData?.password,
            otp: Number(data?.otp),
        });

        // check if the request was successful
        if ("data" in result && result.data && result.data?.success) {
            const data = result.data?.data;
            storeUserInfo(
                JSON.stringify({
                    user: data.user,
                    token: data.token,
                })
            );
            router.push("/");
        } else {
            toast.error("Register Failed!");
        }
    };

    return (
        <>
            <div className="container md:!w-[69%]">
                <div className="grid lg:grid-cols-2 grid-cols-1 place-items-center">
                    <LeftAuth />
                    <div className="mx-auto w-full max-w-[450px] my-8 py-6 px-7 bg-white/80 shadow-lg rounded-md">
                        <RegisterForm
                            handleRegister={handleRegister}
                            isLoading={sendOtpLoading}
                        />
                        <AuthFormFooter
                            href={"/auth/login"}
                            content={[
                                "Already have an account?",
                                "Login Your Account",
                            ]}
                        />
                    </div>
                </div>
            </div>
            {openOTPModal && (
                <OTPSendForm
                    isModalOpen={openOTPModal}
                    setIsModalOpen={setOpenOTPModal}
                    handleOtpSend={handleOtpSend}
                    isLoading={isLoading}
                    otpBtnName={"Confirm Register"}
                />
            )}
        </>
    );
};

export default Register;
