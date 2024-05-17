"use client"

import React from "react";
import RegisterInputGroup from "@/components/Molecules/Form/RegisterInputGroup";
import { OtpSendFormValue } from "@/types/auth.type";
import { useForm, SubmitHandler } from "react-hook-form";
import { PiCircleDashedBold } from "react-icons/pi";

interface OtpSendFormProps {
    handleOtpSend: SubmitHandler<OtpSendFormValue>;
    loading?: boolean;
}

const OtpSendForm: React.FC<OtpSendFormProps> = ({
    handleOtpSend,
    loading = false,
}) => {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<OtpSendFormValue>();

    return (
        <form onSubmit={handleSubmit(handleOtpSend)}>
            <div>
                <RegisterInputGroup
                    register={register}
                    inputName={"otp"}
                    labelName={"OTP"}
                    errors={errors.otp}
                    inputType={"text"}
                    placeholder={"Enter OTP"}
                    errorMessage={"OTP Is Required!"}
                    className={"drop-shadow-md"}
                />
            </div>
            <div className="mt-[25px] flex justify-end">
                <button
                    disabled={loading}
                    type="submit"
                    className={`offer_btn w-[100px] disabled:cursor-wait`}
                >
                    {loading ? (
                        <PiCircleDashedBold className="mx-auto animate-spin text-2xl" />
                    ) : (
                        "Verify"
                    )}
                </button>
            </div>
        </form>
    );
};

export default OtpSendForm;
