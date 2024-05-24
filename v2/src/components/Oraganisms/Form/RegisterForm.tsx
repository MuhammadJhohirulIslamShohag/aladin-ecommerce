"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { PiCircleDashedBold } from "react-icons/pi";
import { AiFillEye } from "react-icons/ai";
import { FaRegEyeSlash } from "react-icons/fa";

import ControllerInputGroup from "../../Molecules/Form/ControllerInputGroup";

import { validEmailCheckRegex } from "@/utils/isEmailValidOrPhone";
import { RegisterFormValues } from "@/types/auth.type";

interface RegisterFormProps {
    handleRegister: SubmitHandler<RegisterFormValues>;
    isLoading?: boolean;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
    handleRegister,
    isLoading = false,
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<RegisterFormValues>();

    return (
        <form onSubmit={handleSubmit(handleRegister)}>
            <ControllerInputGroup
                control={control}
                rules={{ required: "Name is required!" }}
                labelName={"Name"}
                inputType="text"
                inputName={"name"}
                placeholder="Enter Name"
                errors={errors.name}
                classNameGroup="mb-4"
            />

            <ControllerInputGroup
                control={control}
                rules={{
                    required: "Email is required!",
                    validate: {
                        validEmail: (value) =>
                            validEmailCheckRegex(value) ||
                            "Invalid Email Address",
                    },
                }}
                labelName={"E-Mail"}
                inputType="email"
                inputName={"email"}
                placeholder="E-Mail"
                errors={errors.email}
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
                            (value.match(/[a-z]/g) || []).length >= 3 ||
                            "Password should contain at least 3 lowercase letters.",
                        uppercaseLetter: (value) =>
                            (value.match(/[A-Z]/g) || []).length >= 1 ||
                            "Password should contain at least 1 uppercase letter.",
                        numericDigit: (value) =>
                            (value.match(/[0-9]/g) || []).length >= 1 ||
                            "Password should contain at least 1 numeric digit.",
                        symbol: (value) =>
                            (value.match(/[^a-zA-Z0-9]/g) || []).length >= 1 ||
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
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? (
                        <AiFillEye className={`w-6 h-6 text-primaryBlack`} />
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
                            (value.match(/[a-z]/g) || []).length >= 3 ||
                            "Password should contain at least 3 lowercase letters.",
                        uppercaseLetter: (value) =>
                            (value.match(/[A-Z]/g) || []).length >= 1 ||
                            "Password should contain at least 1 uppercase letter.",
                        numericDigit: (value) =>
                            (value.match(/[0-9]/g) || []).length >= 1 ||
                            "Password should contain at least 1 numeric digit.",
                        symbol: (value) =>
                            (value.match(/[^a-zA-Z0-9]/g) || []).length >= 1 ||
                            "Password should contain at least 1 symbol.",
                    },
                }}
                labelName={"Password"}
                inputType={showConfirmPassword ? "text" : "password"}
                inputName={"confirmPassword"}
                placeholder="Enter Confirm Password"
                errors={errors.confirmPassword}
                classNameGroup="relative"
            >
                <button
                    type="button"
                    className="absolute right-3 top-3"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                    {showConfirmPassword ? (
                        <AiFillEye className={`w-6 h-6 text-primaryBlack`} />
                    ) : (
                        <FaRegEyeSlash
                            className={`w-6 h-6 text-primaryBlack`}
                        />
                    )}
                </button>
            </ControllerInputGroup>

            <div className="mt-6">
                <button
                    disabled={isLoading}
                    type="submit"
                    className={`border-2 px-5 py-2 border-primary text-white bg-primary hover:opacity-80 font-semibold hover:text-white  rounded-md transition duration-200 w-full max-w-[450px] disabled:cursor-wait`}
                >
                    {isLoading ? (
                        <PiCircleDashedBold className="mx-auto animate-spin text-2xl" />
                    ) : (
                        "Submit"
                    )}
                </button>
            </div>
        </form>
    );
};

export default RegisterForm;
