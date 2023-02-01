/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { GoogleAuthProvider } from "firebase/auth";
import { useStoreContext } from "@/lib/contexts/StoreContextProvider";
import { useRouter } from "next/router";
import Link from "next/link";
import { StoreActionType } from "@/lib/states/storeReducer/storeReducer.type";
import { createOrUpdateUser } from "@/api/auth";

type FormValues = {
    email: string;
};

const Register = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const { state, dispatch, registerAndLoginWithProvider, sendForSignInLinkToEmail } = useStoreContext();
    const { user } = state;
    const googleProvider = new GoogleAuthProvider();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormValues>();

    useEffect(() => {
        if (user) {
            router.push("/login");
        }
    }, [user]);

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        const { email } = data;
        const actionCodeSettings = {
            url: process.env.REACT_APP_REGISTER_REDIRECT_URL!,
            handleCodeInApp: true,
        };
        setLoading(true);
        sendForSignInLinkToEmail(email, actionCodeSettings)
            .then(() => {
                toast.success(
                    `Email is sent to the ${email}.Click the link to complete your registration`
                );
                // save the user email for local storage
                window.localStorage.setItem("emailForSignIn", email);
                // set loading false
                setLoading(false);
                //clear state
                reset();
            })
            .catch((error) => {
                toast.error(
                    `Something wrong! for registration like ${error.message}`
                );
                setLoading(false);
            });
    };

    const handleSignUpWithProvider = (event:React.MouseEvent<HTMLButtonElement, MouseEvent>, providerName:string) => {
        event.preventDefault();
        if (providerName === "google") {
            popupForSignInProvider(googleProvider);
        }
    };

    const popupForSignInProvider =  async (provider:GoogleAuthProvider) => {
        registerAndLoginWithProvider(provider)
            .then(async (result) => {
                const user = result.user;
                const currentUser = {
                    fullName: user?.displayName,
                    email: user?.email,
                    image: {
                        url: user?.photoURL,
                        public_id: `${Date.now()}`,
                    },
                };
                const idTokenResult = await user.getIdTokenResult();
                createOrUpdateUser(idTokenResult.token, currentUser)
                    .then((res) => {
                        dispatch({
                            type: StoreActionType.LOGGED_IN_USER,
                            payload: {
                                fullName: res.data.fullName,
                                email: res.data.fullName.email,
                                token: idTokenResult.token,
                                image: res.data.image.url,
                            },
                        });
                        router.push("/");
                    })
                    .catch((error) => {
                        console.log(error);
                    });

               
            })
            .catch((error) => {
                toast.error(error?.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const registerForm = () => (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="email">email</label>
            <input
                id="email"
                {...register("email", {
                    required: "required",
                    pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Entered value does not match email format",
                    },
                })}
                type="email"
                placeholder="Enter Your Email"
                className="input input-bordered input-success w-full text-primary"
            />
            {errors.email && <span role="alert">{errors.email.message}</span>}
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
        <div className="container my-14 sm:my-8">
            <div className="w-[560px] sm:w-[280px] m-auto p-8 sm:p-4 bg-secondary rounded-lg">
                <h2 className="text-center font-medium text-primary text-2xl">
                    Login Now!
                </h2>
                <div className="space-y-2 mt-4">
                    <button
                        onClick={(e) => handleSignUpWithProvider(e, "google")}
                        className="btn btn-success bg-success text-primary hover:bg-transparent hover:text-primary border-2 btn-block"
                    >
                        <FaGoogle className="text-lg mr-1" />
                        Connection With Google
                    </button>
                </div>
                <h2 className="text-center font-medium text-primary text-xl mt-3">
                    Or
                </h2>
                {registerForm()}
                <hr className="my-4"></hr>
                <p className="text-primary">
                    If You Do Not Have Account?{" "}
                    <Link className="text-success" href="/register">
                        Register Now
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
