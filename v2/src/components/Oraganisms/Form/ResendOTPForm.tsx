"use client"

import { useState } from "react";
import { useForm } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import { useRouter } from "next/navigation";
import { PiCircleDashedBold } from "react-icons/pi";
import toast from "react-hot-toast";

import ControllerInputGroup from "@/components/Molecules/Form/ControllerInputGroup";
import useControlBodyScroll from "@/hooks/useControlBodyScroll";
import OtpSendForm from "./OtpSendForm";

import {
    useResendOTPMutation,
    useVerifyOTPMutation,
} from "@/redux/services/auth/authApiService";
import { OtpSendFormValue, ResendOTPFormValues } from "@/types/auth.type";
import {
    isEmailValidOrPhone,
    validEmailCheckRegex,
} from "@/utils/isEmailValidOrPhone";
import { storeUserInfo } from "@/store/user/users";

interface ResendOTPFormProps {
    openResendOTPModal: boolean;
    setOpenResendOTPModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ResendOTPForm: React.FC<ResendOTPFormProps> = ({
    openResendOTPModal,
    setOpenResendOTPModal,
}) => {
    const [isSentOTP, setIsSentOTP] = useState(false);
    const [resetOTPValue, setResetOTPValue] = useState<string | null>(null);

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<ResendOTPFormValues>();

    const [resendOTP, { isLoading: resendOTPLoading }] = useResendOTPMutation();
    const [verifyOTP, { isLoading: verifyOTPLoading }] = useVerifyOTPMutation();

    useControlBodyScroll(openResendOTPModal);

    const handleCloseModal = () => {
        setOpenResendOTPModal(false);
    };

    //   handle send otp
    const handleResendOTP = (data: ResendOTPFormValues) => {
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

            resendOTP(resendOTPData).then((res) => {
                // check if the request was successful
                if ("data" in res && res.data && res.data?.success) {
                    toast.success(res?.data?.message);
                    setIsSentOTP(true);
                    setResetOTPValue(data.phoneOrEmail);
                } else {
                    toast.error("Resend OTP Failed!");
                }
            });
        } else {
            toast.error("Resend OTP Failed!");
        }
    };

    const handleOtpSend = (data: OtpSendFormValue) => {
        const isEmail = validEmailCheckRegex(resetOTPValue || "");
        let verifyData;

        if (isEmail) {
            verifyData = {
                email: resetOTPValue,
                otp: data.otp,
                provider: "email",
            };
        } else {
            let formattedPhone;
            if (!resetOTPValue!.startsWith("+")) {
                formattedPhone = "+" + resetOTPValue;
            } else {
                formattedPhone = resetOTPValue!;
            }
            verifyData = {
                phone: formattedPhone,
                otp: data.otp,
                provider: "phone",
            };
        }

        verifyOTP(verifyData).then((res) => {
            if ("data" in res && res.data && res.data?.success) {
                toast.success(res?.data?.message);
                setOpenResendOTPModal(false);
                setResetOTPValue(null);
                const token = res?.data?.data?.accessToken;
                const user = res?.data?.data?.result;
                const userInfo = { token, user };
                storeUserInfo(
                    JSON.stringify(userInfo)
                );
            } else {
                toast.error("Send OTP Failed!");
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
                        <OtpSendForm
                            handleOtpSend={handleOtpSend}
                            loading={verifyOTPLoading}
                        />
                    ) : (
                        // handle send otp
                        <form onSubmit={handleSubmit(handleResendOTP)}>
                            <ControllerInputGroup
                                control={control}
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
                                errors={errors.phoneOrEmail}
                                classNameGroup="mb-4"
                            />

                            <div className="mt-[25px] flex justify-end">
                                <button
                                    disabled={resendOTPLoading}
                                    type="submit"
                                    className={` border-2 px-5 py-2 border-primary text-white bg-primary hover:opacity-80 font-semibold hover:text-white  rounded-md transition duration-200 w-[150px] disabled:cursor-wait`}
                                >
                                    {resendOTPLoading ? (
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
                        className="bg-red-50 text-primary 0 p-[2px] hover:text-white hover:bg-primary transition-all rounded-full"
                    >
                        <RxCross2 className=" w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResendOTPForm;
