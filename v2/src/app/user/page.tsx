"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";
import { BiEdit } from "react-icons/bi";

import ProfileEditModal from "@/components/Molecules/Modal/ProfileEditModal/ProfileEditModal";
import useCheckUser from "@/hooks/useCheckUser";
import UpdatePasswordForm from "@/components/Oraganisms/Form/UpdatePasswordForm";

import { getUserInfo, storeUserInfo } from "@/store/user/users";
import { useUpdateUserMutation } from "@/redux/services/user/userApiService";
import { IProfileFormValue } from "@/types/auth.type";


const UserAccountPage = () => {
    useCheckUser();
    const [showModal, setShowModal] = useState<boolean>(false);

    const user = getUserInfo();
    const userInfo = user?.user

    // redux api call
    const [updateUser] = useUpdateUserMutation();

    // show model for update profile
    const handleShowModal = () => {
        setShowModal((prev) => !prev);
    };

    const handleProfileEditSubmit = async (data: IProfileFormValue) => {
        const result = await updateUser({
            ...data,
        });

        const updatedUser = {
            ...user?.user,
            ...data,
        };

        // check if the request was successful
        if ("data" in result && result.data && result.data?.success) {
            storeUserInfo(JSON.stringify({
                user: updatedUser,
                token: user?.token  
            }))
            toast.success("Profile Update Successfully!");
        } else {
            toast.error("Profile Update Failed!");
        }
    };

    return (
        <>
            <div className="mt-4">
                <h2 className="text-black text-xl font-semibold mb-4">
                    My Profile
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
                                <li>
                                    <p className="text-black text-md font-semibold mb-0">
                                        Name:
                                    </p>
                                    <span className="text-black mt-1 inline-block">
                                        {userInfo?.name}
                                    </span>
                                </li>
                                <li className="mt-2">
                                    <p className="text-black mb-0 text-md font-semibold">
                                        Email address:
                                    </p>
                                    <span className="text-black mt-1 inline-block break-all">
                                        {userInfo?.email}
                                    </span>
                                </li>
                                <li className="mt-2">
                                    <p className="text-black mb-0 text-md font-semibold">
                                        About
                                    </p>
                                    <span className="text-black mt-1 inline-block">
                                        {user?.about}
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="mt-5">
                    <div className="">
                        <h4 className="text-black text-xl font-semibold text-center mt-4 mb-3">
                            Update Password
                        </h4>

                        <UpdatePasswordForm />
                    </div>
                </div>
            </div>

            {showModal && (
                <ProfileEditModal
                    closeModal={handleShowModal}
                    handleProfileEditSubmit={handleProfileEditSubmit}
                    title="Profile Information Update"
                />
            )}
        </>
    );
};

export default dynamic(() => Promise.resolve(UserAccountPage), { ssr: false });
