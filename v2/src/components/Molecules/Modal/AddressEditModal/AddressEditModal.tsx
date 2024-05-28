"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";

import CustomModal from "@/components/Atoms/Modal/CustomModal";
import ShippingAddressForm from "@/components/Oraganisms/Form/ShippingAddressForm";

import { IAddressFormValue } from "@/types/auth.type";
import { getUserInfo } from "@/store/user/users";
import { IShippingAddress } from "@/types/user.type";

type AddressEditModalProp = {
    title: string;
    closeModal: () => void;
    loading: boolean;
    handleAddressEditSubmit: (data: IAddressFormValue) => Promise<void>;
};

const AddressEditModal: React.FC<AddressEditModalProp> = ({
    handleAddressEditSubmit,
    closeModal,
    title,
    loading,
}) => {
    const user = getUserInfo();
    const address = user?.user?.shippingAddress;

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<IShippingAddress>({
        defaultValues: {
            firstName: "",
            lastName: "",
            address1: "",
            address2: "",
            country: "",
            city: "",
            state: "",
            postCode: "",
            phoneNumber: "",
        },
    });

    useEffect(() => {
        if (address) {
            reset({
                firstName: address?.firstName,
                lastName: address?.lastName,
                address1: address?.address1,
                address2: address?.address2,
                country: address?.country,
                city: address?.city,
                state: address?.state,
                postCode: address?.postCode,
                phoneNumber: address?.phoneNumber,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reset]);

    return (
        <>
            <CustomModal onClose={() => closeModal()}>
                <div className="relative w-full h-full max-w-2xl mt-20">
                    <div className="relative bg-white rounded-lg drop-shadow-2xl">
                        <div className="flex items-start justify-between p-4 border-b rounded-t ">
                            <h3 className="md:text-xl text-lg font-semibold text-gray-900">
                                {title}
                            </h3>
                            <button
                                type="button"
                                onClick={() => closeModal()}
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

                        <div className="px-6 space-y-6 md:h-[400px] overflow-y-scroll ">
                            <ShippingAddressForm
                                loading={loading}
                                submitShippingAddress={handleAddressEditSubmit}
                                handleSubmit={handleSubmit}
                                errors={errors}
                                register={register}
                            />
                        </div>
                    </div>
                </div>
            </CustomModal>
        </>
    );
};

export default AddressEditModal;
