"use client";

import { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import AddressEditModal from "@/components/Molecules/Modal/AddressEditModal/AddressEditModal";
import AddressInfos from "@/components/Oraganisms/AddressInfos";
import useCheckUser from "@/hooks/useCheckUser";

import { getUserInfo, removeUserInfo, storeUserInfo } from "@/store/user/users";
import { IAddressFormValue } from "@/types/auth.type";
import { useUpdateUserMutation } from "@/redux/services/user/userApiService";
import { storeShippingAddress } from "@/store/user/shippingAddress";
import { StoreActionType } from "@/contexts/storeReducer/storeReducer.type";
import { useStoreContext } from "@/contexts/StoreContextProvider";
import { CustomFetchBaseQueryError } from "@/types/response";

const Address = () => {
    useCheckUser();

    const [showModal, setShowModal] = useState<boolean>(false);

    const { dispatch } = useStoreContext();
    const router = useRouter();
    const user = getUserInfo();
    const address = user?.user?.shippingAddress;

    const [updateUser, { isLoading }] = useUpdateUserMutation();

    // save address to the database
    const handleAddressEditSubmit = async (data: IAddressFormValue) => {
        if (user && user?.token) {
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
                        token: user?.token,
                    })
                );
                storeShippingAddress(JSON.stringify(data));
                dispatch({
                    type: StoreActionType.ADD_SHIPPING_ADDRESS,
                    payload: data,
                });
                setShowModal((prev) => !prev)
                toast.success("Save Address!");
            } else {
                if ("error" in result && result.error) {
                    const customError =
                        result.error as CustomFetchBaseQueryError;
                    if (customError.data?.message.includes("jwt expired")) {
                        removeUserInfo();
                        router.push(`/auth/login?redirect=/user/address`);
                    }
                }
                toast.error("Failed To Save Address!");
            }
        } else {
            router.push(`/auth/login?redirect=/user/address`);
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
                                onClick={() => setShowModal((prev) => !prev)}
                            >
                                <BiEdit />
                            </span>
                        </div>

                        <div>
                            <AddressInfos address={address} />
                        </div>
                    </div>
                </div>
            </div>

            {showModal && (
                <AddressEditModal
                    loading={isLoading}
                    showModal={showModal}
                    setShowModal={setShowModal}
                    title="Address Information Update"
                    handleAddressEditSubmit={handleAddressEditSubmit}
                />
            )}
        </>
    );
};

export default Address;
