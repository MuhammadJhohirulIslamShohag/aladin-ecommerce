"use client"

import { useState } from "react";
import { BiEdit } from "react-icons/bi";

import ProfileEditModal from "@/components/Modal/ProfileEditModal/ProfileEditModal";
import HeadSeo from "@/lib/seo/HeadSeo/HeadSeo";

import { getUserInfo } from "@/store/user/users";

const Address = () => {
    const user = getUserInfo();
    const [showModal, setShowModal] = useState<boolean>(false);

    // show model for update profile
    const handleShowModal = () => {
        setShowModal((prev) => !prev);
    };
    return (
        <>
            <HeadSeo
                title={"Address"}
                content="Aladin Industries Ltd. Providing reliable products since 2022"
            />
            <div>
                <h2 className="text-black text-md font-semibold mb-0 text-center">
                    My Address
                </h2>
                <div className="relative flex justify-end items-center">
                    <span
                        className="text-green-500 text-md hover:text-black transition-all cursor-pointer"
                        id="my-profile-update-modal"
                        onClick={handleShowModal}
                    >
                        <BiEdit />
                    </span>
                    {showModal && (
                        <ProfileEditModal
                            closeModal={handleShowModal}
                            values={user}
                            title="Address Information Update"
                            isAddressProfile
                        />
                    )}
                </div>
                <div>
                    <ul>
                        <li className="flex gap-1">
                            <p className="text-black text-md font-semibold mb-0">
                                User Name:
                            </p>
                            <p className="text-black inline-block">
                                {user?.username}
                            </p>
                        </li>
                        <li className="mt-2 flex gap-1">
                            <p className="text-black mb-0 text-md font-semibold">
                                Address:
                            </p>
                            <p className="text-black inline-block">
                                {user?.address}
                            </p>
                        </li>
                        <li className="mt-2 flex gap-1">
                            <p className="text-black mb-0 text-md font-semibold">
                                City:
                            </p>
                            <p className="text-black inline-block">
                                {user?.city}
                            </p>
                        </li>
                        <li className="mt-2 flex gap-1">
                            <p className="text-black mb-0 text-md font-semibold">
                                Country:
                            </p>
                            <p className="text-black inline-block">
                                {user?.country}
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Address;
