import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import { useStoreContext } from "@/lib/contexts/StoreContextProvider";
import React, { useState, useEffect } from "react";
import { currentUser } from "@/api/auth";
import { BiEdit } from "react-icons/bi";
import ProfileEditModal from "@/components/Modal/ProfileEditModal/ProfileEditModal";
import { IProfile } from "../../user/profile.types";
import { UserType } from "@/lib/states/storeReducer/storeReducer.type";

const AdminAddress = () => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [values, setValues] = useState<IProfile>({
        username: "",
        fullName: "",
        address: "",
        city: "",
        postalCode: "",
        country: "",
    });
    const { state } = useStoreContext();
    const { user } = state;

    useEffect(() => {
        if (user) {
            loadingCurrentUser(user);
        }
    }, [user]);

    const loadingCurrentUser = (user: UserType) => {
        if (user && user!.token) {
            currentUser(user.token)
                .then((res) => {
                    const data = res.data;
                    setValues({
                        ...values,
                        username: data.username,
                        address: data.address.address,
                        city: data.address.city,
                        postalCode: data.address.postalCode,
                        country: data.address.country,
                    });
                })
                .catch((error) => {
                    console.log(error.message);
                });
        }
    };
    // show model for update profile
    const handleShowModal = () => {
        setShowModal((prev) => !prev);
    };
    return (
        <DashboardLayout>
            <div className="grid grid-cols-10 py-10 pl-10">
                <div className="col-span-6">
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
                                values={values}
                                loadingCurrentUser={loadingCurrentUser}
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
                                    {values?.username}
                                </p>
                            </li>
                            <li className="mt-2 flex gap-1">
                                <p className="text-black mb-0 text-md font-semibold">
                                    Address:
                                </p>
                                <p className="text-black inline-block">
                                    {values?.address}
                                </p>
                            </li>
                            <li className="mt-2 flex gap-1">
                                <p className="text-black mb-0 text-md font-semibold">
                                    City:
                                </p>
                                <p className="text-black inline-block">
                                    {values?.city}
                                </p>
                            </li>
                            <li className="mt-2 flex gap-1">
                                <p className="text-black mb-0 text-md font-semibold">
                                    Country:
                                </p>
                                <p className="text-black inline-block">
                                    {values?.country}
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default AdminAddress;
