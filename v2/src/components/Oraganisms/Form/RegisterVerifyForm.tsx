"use client";

import { RxCross2 } from "react-icons/rx";
import { useRouter } from "next/navigation";
import { PiCircleDashedBold } from "react-icons/pi";
import toast from "react-hot-toast";

import useControlBodyScroll from "@/hooks/useControlBodyScroll";

import { useVerifyOTPMutation } from "@/redux/services/auth/authApiService";
import { validEmailCheckRegex } from "@/utils/isEmailValidOrPhone";
import { storeUserInfo } from "@/store/user/users";

interface RegisterVerifyFormProps {
    verifiedByData: string | null;
    setVerifiedByData: React.Dispatch<React.SetStateAction<string>>;
    openVerifyModal: boolean;
    setOpenVerifyModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const RegisterVerifyForm: React.FC<RegisterVerifyFormProps> = ({
    verifiedByData,
    setVerifiedByData,
    openVerifyModal,
    setOpenVerifyModal,
}) => {
    const [verifyOTP, { isLoading }] = useVerifyOTPMutation();
    const router = useRouter();

    useControlBodyScroll(openVerifyModal);

    const handleCloseModal = () => {
        setOpenVerifyModal(false);
        setVerifiedByData("");
    };

    const handleVerify = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const otp = (e.target as HTMLFormElement).otp.value;
        const isEmail = validEmailCheckRegex(verifiedByData || "");

        let verifyData;

        if (isEmail) {
            verifyData = {
                email: verifiedByData,
                otp,
                provider: "email",
            };
        } else {
            let formattedPhone;
            if (!verifiedByData!.startsWith("+")) {
                formattedPhone = "+" + verifiedByData;
            } else {
                formattedPhone = verifiedByData!;
            }
            verifyData = {
                phone: formattedPhone,
                otp,
                provider: "phone",
            };
        }

        verifyOTP(verifyData).then((res) => {
            // check if the request was successful
            if ("data" in res && res.data && res.data?.success) {
                toast.success(res?.data?.message);
                setOpenVerifyModal(false);
                setVerifiedByData("");
                router.push("/account");
                const token = res?.data?.data?.accessToken;
                const user = res?.data?.data?.result;
                const userInfo = { token, user };
                storeUserInfo(
                    JSON.stringify(userInfo)
                );
            } else {
                toast.error("Verify Register OTP Failed!");
            }
        });
    };

    return (
        <div className={`fixed inset-0 flex items-center justify-center z-50`}>
            <div className="modal-overlay absolute inset-0 bg-black opacity-50"></div>
            <div className="modal-container bg-white w-full md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto relative">
                <div className="modal-content pt-10 pb-4 text-left px-6">
                    <form onSubmit={handleVerify}>
                        <div>
                            <label htmlFor="email" className="text-[13px]">
                                OTP
                            </label>{" "}
                            <br />
                            <input
                                type="text"
                                id="otp"
                                name="otp"
                                placeholder="Add 6 digits OTP"
                                className="input focus:outline-gray-400 w-full"
                                required
                            />
                        </div>{" "}
                        <div className="mt-[25px] flex justify-end">
                            <button
                                disabled={isLoading}
                                type="submit"
                                className={`offer_btn w-[100px] disabled:cursor-wait`}
                            >
                                {isLoading ? (
                                    <PiCircleDashedBold className="mx-auto animate-spin text-2xl" />
                                ) : (
                                    "Verify"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
                <div className="modal-close absolute top-0 right-0 cursor-pointer p-2">
                    <button
                        onClick={handleCloseModal}
                        className="bg-red-50 text-red-500 p-[2px] hover:text-white hover:bg-red-500 transition-all rounded-full"
                    >
                        <RxCross2 className=" w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RegisterVerifyForm;
