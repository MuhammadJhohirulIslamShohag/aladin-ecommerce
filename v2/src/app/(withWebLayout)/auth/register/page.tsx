"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import LeftAuth from "@/components/Molecules/Auth/LeftAuth";
import RegisterVerifyModalForm from "@/components/Oraganisms/Form/RegisterVerifyForm";
import AuthFormFooter from "@/components/Molecules/Auth/AuthFormFooter";
import RegisterForm from "@/components/Oraganisms/Form/RegisterForm";

import { useCreateUserMutation } from "@/redux/services/auth/authApiService";
import { RegisterFormValues } from "@/types/auth.type";

const Register = () => {
    const [verifiedByData, setVerifiedByData] = useState("");
    const [openVerifyModal, setOpenVerifyModal] = useState(false);

    // create user redux
    const [createUser, { isLoading }] = useCreateUserMutation();

    const handleRegister = (data: RegisterFormValues) => {
        //check confirm password matched or not
        if (data?.password !== data?.confirmPassword) {
            return toast.error("confirm password not match");
        }

        // create user object
        let createUserData;

        if (data?.phoneOrEmail.startsWith("+")) {
            setVerifiedByData(data?.phoneOrEmail);
            createUserData = {
                phone: data.phoneOrEmail,
                name: data?.name,
                password: data?.password,
                location: "Dhaka1",
                role: "user",
                provider: "phone",
            };
        } else if (data?.phoneOrEmail.startsWith("01")) {
            setVerifiedByData(data?.phoneOrEmail);
            createUserData = {
                ...data,
                name: data?.name,
                password: data?.password,
                location: "Dhaka1",
                role: "user",
                provider: "phone",
            };
        } else {
            setVerifiedByData(data?.phoneOrEmail);
            createUserData = {
                name: data?.name,
                email: data?.phoneOrEmail,
                password: data?.password,
                location: "Dhaka1",
                role: "user",
                provider: "email",
            };
        }

        createUser(createUserData).then((res) => {
            // check if the request was successful
            if ("data" in res && res.data && res.data?.success) {
                toast.success(res?.data?.message, {
                    duration: 5000,
                });
                setOpenVerifyModal(true);
            } else {
                toast.error("Register Failed!");
            }
        });
    };

    return (
        <>
            <div className="my_container">
                <div className="grid lg:grid-cols-2 grid-cols-1 place-items-center">
                    <LeftAuth />
                    <div className="mx-auto w-full max-w-[450px] my-8 md:pb-8  px-6 lg:px-0">
                        <h3 className="text-xl mb-8">Register Account</h3>

                        <RegisterForm
                            handleRegister={handleRegister}
                            isLoading={isLoading}
                        />

                        <AuthFormFooter
                            href={"/login"}
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
