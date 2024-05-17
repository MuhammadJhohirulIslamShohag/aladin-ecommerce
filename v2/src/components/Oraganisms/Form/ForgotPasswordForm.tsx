"use client"
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import { useRouter } from "next/navigation";
import { PiCircleDashedBold } from "react-icons/pi";
import { AiFillEye } from "react-icons/ai";
import { FaRegEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";

import useControlBodyScroll from "@/hooks/useControlBodyScroll";
import ControllerInputGroup from "../../Molecules/Form/ControllerInputGroup";

import {
    useForgotPasswordMutation,
    useResetPasswordMutation,
} from "@/redux/services/auth/authApiService";
import {
    ResendOTPFormValues,
    ResetPasswordFormValues,
} from "@/types/auth.type";
import {
    isEmailValidOrPhone,
    validEmailCheckRegex,
} from "@/utils/isEmailValidOrPhone";

interface ForgotPasswordFormProps {
    openForgotPasswordModal: boolean;
    setOpenForgotPasswordModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
    openForgotPasswordModal,
    setOpenForgotPasswordModal,
}) => {
    const [isSentOTP, setIsSentOTP] = useState(false);
    const [forgotByData, setForgotByData] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [forgotPassword, { isLoading: forgotPasswordLoading }] =
        useForgotPasswordMutation();
    const [resetPassword, { isLoading: resetPasswordLoading }] =
        useResetPasswordMutation();

    const router = useRouter();

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<ResetPasswordFormValues>();

    const {
        handleSubmit: handleResendOtpSubmit,
        control: resendOtpControl,
        formState: { errors: resendOtpErrors },
    } = useForm<ResendOTPFormValues>();

    useControlBodyScroll(openForgotPasswordModal);

    const handleCloseModal = () => {
        setOpenForgotPasswordModal(false);
        setForgotByData(null);
    };

    //   handle send otp
    const handleSendOTP = (data: ResendOTPFormValues) => {
        if (isEmailValidOrPhone(data.phoneOrEmail)) {
            let resendOTPData;

            const isEmail = validEmailCheckRegex(data.phoneOrEmail);
            if (isEmail) {
                resendOTPData = {
                    email: data.phoneOrEmail,
                    provider: "email",
                };
            } else {
                let formattedPhone;
                if (!data.phoneOrEmail.startsWith("+")) {
                    formattedPhone = "+" + data.phoneOrEmail;
                } else {
                    formattedPhone = data.phoneOrEmail;
                }

                resendOTPData = {
                    phone: formattedPhone,
                    provider: "phone",
                };
            }
            forgotPassword(resendOTPData).then((res) => {
                // check if the request was successful
                if ("data" in res && res.data && res.data?.success) {
                    toast.success(res?.data?.message);
                    setIsSentOTP(true);
                    setForgotByData(data.phoneOrEmail);
                } else {
                    toast.error("Resend OTP Failed!");
                }
            });
        } else {
            toast.error("Invalid email or phone number!");
        }
    };

    //   handle reset password
    const handleResetPassword = (data: ResetPasswordFormValues) => {
        if (data.password !== data.confirmPassword) {
            return toast.error("confirm password not match");
        }
        let resetPasswordData;

        const isEmail = validEmailCheckRegex(forgotByData || "");

        if (isEmail) {
            resetPasswordData = {
                password: data.password,
                otp: data.otp,
                email: forgotByData,
            };
        } else {
            let formattedPhone;
            if (!forgotByData?.startsWith("+")) {
                formattedPhone = "+" + forgotByData;
            } else {
                formattedPhone = forgotByData;
            }
            resetPasswordData = {
                password: data.password,
                otp: data.otp,
                phone: formattedPhone,
            };
        }

        resetPassword(resetPasswordData).then((res) => {
            // check if the request was successful
            if ("data" in res && res.data && res.data?.success) {
                toast.success(res?.data?.message);
                setIsSentOTP(false);
                setOpenForgotPasswordModal(false);
                router.push("/login");
                console.log(res?.data);
            } else {
                toast.error("Reset Password Failed!");
            }
        });
    };

    return (
        <div
            className={`fixed inset-0 flex items-center justify-center z-50 px-5`}
        >
            <div className="modal-overlay absolute inset-0 bg-black opacity-50 "></div>
            <div className="modal-container bg-white md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto relative max-w-[450px] w-full">
                <div className="modal-content pt-10 pb-4 text-left px-6">
                    {isSentOTP ? (
                        // handle reset password
                        <form onSubmit={handleSubmit(handleResetPassword)}>
                            <div>
                                <label htmlFor="otp" className="text-[13px]">
                                    OTP
                                </label>{" "}
                                <br />
                                <input
                                    type="text"
                                    id="otp"
                                    name="otp"
                                    placeholder="Type 6 digits OTP"
                                    className="input focus:outline-gray-400 w-full"
                                    required
                                />
                            </div>{" "}
                            <ControllerInputGroup
                                control={control}
                                rules={{
                                    required: "OTP is required!",
                                }}
                                labelName={"OTP"}
                                inputType="text"
                                inputName={"otp"}
                                placeholder="Enter OTP"
                                errors={errors.otp}
                                classNameGroup="mb-4"
                            />
                            <ControllerInputGroup
                                control={control}
                                rules={{
                                    required: "Password is required!",
                                    validate: {
                                        minLength: (value) =>
                                            value.length >= 6 ||
                                            "Password should be at least 6 characters long.",
                                        lowercaseLetters: (value) =>
                                            (value.match(/[a-z]/g) || [])
                                                .length >= 3 ||
                                            "Password should contain at least 3 lowercase letters.",
                                        uppercaseLetter: (value) =>
                                            (value.match(/[A-Z]/g) || [])
                                                .length >= 1 ||
                                            "Password should contain at least 1 uppercase letter.",
                                        numericDigit: (value) =>
                                            (value.match(/[0-9]/g) || [])
                                                .length >= 1 ||
                                            "Password should contain at least 1 numeric digit.",
                                        symbol: (value) =>
                                            (value.match(/[^a-zA-Z0-9]/g) || [])
                                                .length >= 1 ||
                                            "Password should contain at least 1 symbol.",
                                    },
                                }}
                                labelName={"Password"}
                                inputType={showPassword ? "text" : "password"}
                                inputName={"password"}
                                placeholder="Enter Password"
                                errors={errors.password}
                                classNameGroup="relative"
                            >
                                {" "}
                                <button
                                    type="button"
                                    className="absolute right-3 top-3"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >
                                    {showPassword ? (
                                        <AiFillEye
                                            className={`w-6 h-6 text-primaryBlack`}
                                        />
                                    ) : (
                                        <FaRegEyeSlash
                                            className={`w-6 h-6 text-primaryBlack`}
                                        />
                                    )}
                                </button>
                            </ControllerInputGroup>
                            <ControllerInputGroup
                                control={control}
                                rules={{
                                    required: "Confirm Password is required!",
                                    validate: {
                                        minLength: (value) =>
                                            value.length >= 6 ||
                                            "Password should be at least 6 characters long.",
                                        lowercaseLetters: (value) =>
                                            (value.match(/[a-z]/g) || [])
                                                .length >= 3 ||
                                            "Password should contain at least 3 lowercase letters.",
                                        uppercaseLetter: (value) =>
                                            (value.match(/[A-Z]/g) || [])
                                                .length >= 1 ||
                                            "Password should contain at least 1 uppercase letter.",
                                        numericDigit: (value) =>
                                            (value.match(/[0-9]/g) || [])
                                                .length >= 1 ||
                                            "Password should contain at least 1 numeric digit.",
                                        symbol: (value) =>
                                            (value.match(/[^a-zA-Z0-9]/g) || [])
                                                .length >= 1 ||
                                            "Password should contain at least 1 symbol.",
                                    },
                                }}
                                labelName={"Password"}
                                inputType={
                                    showConfirmPassword ? "text" : "password"
                                }
                                inputName={"confirmPassword"}
                                placeholder="Enter Confirm Password"
                                errors={errors.confirmPassword}
                                classNameGroup="relative"
                            >
                                <button
                                    type="button"
                                    className="absolute right-3 top-3"
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword
                                        )
                                    }
                                >
                                    {showConfirmPassword ? (
                                        <AiFillEye
                                            className={`w-6 h-6 text-primaryBlack`}
                                        />
                                    ) : (
                                        <FaRegEyeSlash
                                            className={`w-6 h-6 text-primaryBlack`}
                                        />
                                    )}
                                </button>
                            </ControllerInputGroup>
                            <div className="mt-[25px] flex justify-end">
                                <button
                                    disabled={resetPasswordLoading}
                                    type="submit"
                                    className={`offer_btn w-[150px] disabled:cursor-wait`}
                                >
                                    {resetPasswordLoading ? (
                                        <PiCircleDashedBold className="mx-auto animate-spin text-2xl" />
                                    ) : (
                                        "Submit"
                                    )}
                                </button>
                            </div>
                        </form>
                    ) : (
                        // handle send otp
                        <form onSubmit={handleResendOtpSubmit(handleSendOTP)}>
                            <ControllerInputGroup
                                control={resendOtpControl}
                                rules={{
                                    required: "Phone/Email is required!",
                                    validate: {
                                        validEmail: (value) =>
                                            isEmailValidOrPhone(value) ||
                                            "Invalid email address/phone",
                                    },
                                }}
                                labelName={"Phone / E-Mail"}
                                inputType="text"
                                inputName={"phoneOrEmail"}
                                placeholder="Phone / E-Mail"
                                errors={resendOtpErrors.phoneOrEmail}
                                classNameGroup="mb-4"
                            />

                            <div className="mt-[25px] flex justify-end">
                                <button
                                    disabled={forgotPasswordLoading}
                                    type="submit"
                                    className={` border-2 px-5 py-2 border-primary text-white bg-primary hover:opacity-80 font-semibold hover:text-white  rounded-md transition duration-200 w-[150px] disabled:cursor-wait`}
                                >
                                    {forgotPasswordLoading ? (
                                        <PiCircleDashedBold className="mx-auto animate-spin text-2xl" />
                                    ) : (
                                        "Send OTP"
                                    )}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
                <div className="modal-close absolute top-0 right-0 cursor-pointer p-2">
                    <button
                        onClick={handleCloseModal}
                        className="bg-red-50 text-primary p-[2px] hover:text-white hover:bg-primary transition-all rounded-full"
                    >
                        <RxCross2 className=" w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordForm;
