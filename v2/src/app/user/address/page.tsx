"use client";

import { useState } from "react";
import { BiEdit } from "react-icons/bi";
import toast from "react-hot-toast";

import AddressEditModal from "@/components/Molecules/Modal/AddressEditModal/AddressEditModal";

import { getUserInfo, storeUserInfo } from "@/store/user/users";
import { IAddressFormValue } from "@/types/auth.type";
import { useUpdateUserMutation } from "@/redux/services/user/userApiService";
import { storeShippingAddress } from "@/store/user/shippingAddress";
import { StoreActionType } from "@/contexts/storeReducer/storeReducer.type";
import { useStoreContext } from "@/contexts/StoreContextProvider";

const Address = () => {
    const [showModal, setShowModal] = useState<boolean>(false);

    const { dispatch } = useStoreContext();
    const user = getUserInfo();
    const address = user?.user?.shippingAddress;

    const [updateUser, { isLoading }] = useUpdateUserMutation();

    // show model for update profile
    const handleShowModal = () => {
        setShowModal((prev) => !prev);
    };

    // save address to the database
    const handleAddressEditSubmit = async (data: IAddressFormValue) => {
        if (user && user.token) {
            const result = await updateUser({
                data: {
                    shippingAddress: { ...data },
                },
                id: user?.user?._id,
            });

            const updatedUser = {
                ...user?.user,
                shippingAddress: { ...data },
            };
            
            // check if the request was successful
            if ("data" in result && result.data && result.data?.success) {
                storeUserInfo(
                    JSON.stringify({
                        user: updatedUser,
                        token: user?.token  
                    })
                );
                storeShippingAddress(JSON.stringify(data));
                dispatch({
                    type: StoreActionType.ADD_SHIPPING_ADDRESS,
                    payload: data,
                });
                toast.success("Save Address!");
                handleShowModal()
            } else {
                toast.error("Failed To Save Address!");
            }
        }
    };
    return (
        <>
            <div className="mt-4">
                <h2 className="text-black text-xl font-semibold mb-0 text-left">
                    My Address
                </h2>
                <div className="grid lg:grid-cols-8 grid-cols-1 ">
                    <div className="col-span-6 p-4 m-0">
                        <div className="relative flex justify-end items-center">
                            <span
                                className="text-green-500 text-md hover:text-black transition-all cursor-pointer"
                                id="my-profile-update-modal"
                                onClick={handleShowModal}
                            >
                                <BiEdit />
                            </span>
                        </div>

                        <div>
                            <ul>
                                <li className="flex gap-2">
                                    <p className="text-black text-md font-semibold mb-0">
                                        First Name:
                                    </p>
                                    <p className="text-black inline-block">
                                        {address?.firstName}
                                    </p>
                                </li>
                                <li className="mt-2 flex gap-1">
                                    <p className="text-black text-md font-semibold mb-0">
                                        Last Name:
                                    </p>
                                    <p className="text-black inline-block">
                                        {address?.lastName}
                                    </p>
                                </li>
                                <li className="mt-2 flex gap-1">
                                    <p className="text-black mb-0 text-md font-semibold">
                                        Address 1:
                                    </p>
                                    <p className="text-black inline-block">
                                        {address?.address1}
                                    </p>
                                </li>
                                <li className="mt-2 flex gap-1">
                                    <p className="text-black mb-0 text-md font-semibold">
                                        Address 2:
                                    </p>
                                    <p className="text-black inline-block">
                                        {address?.address2}
                                    </p>
                                </li>
                                <li className="mt-2 flex gap-1">
                                    <p className="text-black mb-0 text-md font-semibold">
                                        City:
                                    </p>
                                    <p className="text-black inline-block">
                                        {address?.city}
                                    </p>
                                </li>
                                <li className="mt-2 flex gap-1">
                                    <p className="text-black mb-0 text-md font-semibold">
                                        Country:
                                    </p>
                                    <p className="text-black inline-block">
                                        {address?.country}
                                    </p>
                                </li>
                                <li className="mt-2 flex gap-1">
                                    <p className="text-black mb-0 text-md font-semibold">
                                        Post Code:
                                    </p>
                                    <p className="text-black inline-block">
                                        {address?.postCode}
                                    </p>
                                </li>
                                <li className="mt-2 flex gap-1">
                                    <p className="text-black mb-0 text-md font-semibold">
                                        State:
                                    </p>
                                    <p className="text-black inline-block">
                                        {address?.state}
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {showModal && (
                <AddressEditModal
                    loading={isLoading}
                    closeModal={handleShowModal}
                    title="Address Information Update"
                    handleAddressEditSubmit={handleAddressEditSubmit}
                />
            )}
        </>
    );
};

export default Address;
