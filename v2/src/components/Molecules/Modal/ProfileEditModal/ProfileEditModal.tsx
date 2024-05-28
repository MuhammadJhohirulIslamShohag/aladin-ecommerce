"use client";

import CustomModal from "@/components/Atoms/Modal/CustomModal";
import RegisterInputGroup from "../../Form/RegisterInputGroup";
import FormTextAreaGroup from "../../Form/FormTextAreaGroup";
import Label from "@/components/Atoms/Input/Label";

import { useForm } from "react-hook-form";
import { IProfileFormValue } from "@/types/auth.type";
import { getUserInfo } from "@/store/user/users";
import { useEffect } from "react";

type ProfileEditModalProp = {
    title: string;
    isLoading: boolean;
    closeModal: () => void;
    handleProfileEditSubmit: (data: IProfileFormValue) => Promise<void>;
};

const ProfileEditModal: React.FC<ProfileEditModalProp> = ({
    handleProfileEditSubmit,
    closeModal,
    title,
    isLoading = false,
}) => {
    const userInfo = getUserInfo();
    const user = userInfo?.user;

    const {
        handleSubmit,
        register,
        reset,
        formState: { errors, isSubmitted },
    } = useForm<IProfileFormValue>({
        defaultValues: {
            name: "",
            about: "",
        },
    });

    useEffect(() => {
        if (user) {
            reset({
                name: user?.name,
                about: user?.about,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reset]);

    return (
        <>
            <CustomModal onClose={() => closeModal()}>
                <div className="relative w-full h-full max-w-2xl md:h-auto">
                    <div className="relative bg-white rounded-lg drop-shadow-2xl">
                        <div className="flex items-start justify-between p-4 border-b rounded-t ">
                            <h3 className="text-xl sm:text-lg font-semibold text-gray-900">
                                {title}
                            </h3>
                            <button
                                type="button"
                                onClick={closeModal}
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                            >
                                <svg
                                    aria-hidden="true"
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            <form
                                onSubmit={handleSubmit(handleProfileEditSubmit)}
                            >
                                <div>
                                    <RegisterInputGroup
                                        register={register}
                                        inputName={"name"}
                                        labelName={"Full Name"}
                                        errorMessage="Please Enter Your Full Name"
                                        errors={errors.name}
                                        inputType={"text"}
                                        placeholder={
                                            "Please Enter Your Full Name"
                                        }
                                    />
                                </div>
                                <div className="my-2">
                                    <Label name={"Email"} />
                                    <div className="text-sm rounded-lg  ring-0 block w-full pl-3 p-3 placeholder:text-[13px] placeholder-gray-600  border focus:outline-offset-0 focus:outline-0 bg-gray-300 text-primary">
                                        {user?.email}
                                    </div>
                                </div>
                                <div>
                                    <FormTextAreaGroup
                                        register={register}
                                        inputName={"about"}
                                        labelName={"About Us"}
                                        errorMessage="Please Enter About Us"
                                        errors={errors.about}
                                        placeholder={"Please Enter About Us"}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="border-2 px-4 py-2 border-primary text-white bg-primary hover:opacity-80 font-semibold hover:text-white  rounded-md transition duration-200 disabled:cursor-wait"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Loading" : "Submit"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </CustomModal>
        </>
    );
};

export default ProfileEditModal;
