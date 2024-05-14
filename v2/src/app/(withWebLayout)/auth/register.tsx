"use client";

import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
// import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

import FormGroup from "@/components/Form/FormGroup";
import HeadSeo from "@/lib/seo/HeadSeo/HeadSeo";

import { useStoreContext } from "@/contexts/StoreContextProvider";
import { getUserInfo } from "@/store/user/users";

type FormValues = {
    email: string;
};

const Register = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const user = getUserInfo();

    const { dispatch } = useStoreContext();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormValues>();

    useEffect(() => {
        if (user) {
            router.push("/");
        }
    }, [user, router]);

    const submitHandler: SubmitHandler<FormValues> = async (data) => {
        setLoading(true);
        // sendForSignInLinkToEmail(email, actionCodeSettings)
        //     .then(() => {
        //         toast.success(
        //             `Email is sent to the ${email}.Click the link to complete your registration`
        //         );
        //         // save the user email for local storage
        //         window.localStorage.setItem("emailForSignIn", email);
        //         // set loading false
        //         setLoading(false);
        //         //clear state
        //         reset();
        //         console.log(email, "down");
        //     })
        //     .catch((error) => {
        //         toast.error(
        //             `Something wrong! for registration like ${error.message}`
        //         );
        //         setLoading(false);
        //     });
    };

    const registerForm = () => (
        <form onSubmit={handleSubmit(submitHandler)}>
            <FormGroup
                register={register}
                inputName={"email"}
                labelName={"Email"}
                isRequirePattern={true}
                requirePattern={{
                    required: "Email is required",
                    pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Entered value does not match email format",
                    },
                }}
                errorField={errors.email}
                inputType={"email"}
                placeholder={"Please Enter Your Email"}
                required="Email is required"
            />
            <button
                type="submit"
                className="btn block hover:bg-transparent hover:text-primary text-white btn-primary disabled:opacity-75 disabled:border-2 disabled:border-primary disabled:text-primary mt-2"
                disabled={loading}
            >
                {loading ? "Loading..." : "Register"}
            </button>
        </form>
    );
    return (
        <>
            <HeadSeo
                title="Register"
                content="Aladin Industries Ltd. Providing reliable products since 2022"
            />
            <div className="container my-14 sm:my-8">
                <div className="w-[560px] sm:w-[280px] m-auto p-8 sm:p-4 bg-secondary rounded-lg">
                    <h2 className="text-center font-medium text-primary text-2xl">
                        Register Now!
                    </h2>

                    {registerForm()}
                    <hr className="my-4"></hr>
                    <p className="text-primary">
                        If You Have Account?{" "}
                        <label
                            className="mr-2 text-success cursor-pointer"
                            onClick={() => router.push("/auth/login")}
                        >
                            Login Now
                        </label>
                        Or
                        <label
                            className="ml-2 text-success cursor-pointer"
                            onClick={() => router.push("/")}
                        >
                            Back Home
                        </label>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Register;
