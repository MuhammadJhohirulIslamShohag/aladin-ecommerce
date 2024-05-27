"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import LeftAuth from "@/components/Molecules/Auth/LeftAuth";
import RegisterVerifyModalForm from "@/components/Oraganisms/Form/RegisterVerifyForm";
import AuthFormFooter from "@/components/Molecules/Auth/AuthFormFooter";
import RegisterForm from "@/components/Oraganisms/Form/RegisterForm";

import { storeUserInfo } from "@/store/user/users";
import { useRegisterMutation } from "@/redux/services/auth/authApiService";
import { RegisterFormValues } from "@/types/auth.type";

const Register = () => {
    const [verifiedByData, setVerifiedByData] = useState("");
    const [openVerifyModal, setOpenVerifyModal] = useState(false);

    // create user redux
    const [register, { isLoading }] = useRegisterMutation();

    const handleRegister = async (data: RegisterFormValues) => {
        //check confirm password matched or not
        if (data?.password !== data?.confirmPassword) {
            return toast.error("confirm password not match");
        }

        const result = await register({ ...data });

        // check if the request was successful
        if ("data" in result && result.data && result.data?.success) {
            const data = result.data?.data;
            storeUserInfo(
                JSON.stringify({
                    user: data.user,
                    token: data.token,
                })
            );
            toast.success(result?.data?.message, {
                duration: 5000,
            });
            setOpenVerifyModal(true);
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
                            isLoading={isLoading}
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
            {openVerifyModal && (
                <RegisterVerifyModalForm
                    verifiedByData={verifiedByData}
                    setVerifiedByData={setVerifiedByData}
                    openVerifyModal={openVerifyModal}
                    setOpenVerifyModal={setOpenVerifyModal}
                />
            )}
        </>
    );
};

export default Register;
