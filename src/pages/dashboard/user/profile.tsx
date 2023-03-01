/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import FileUpload from "@/components/FileUpload/FileUpload";
import UserDashboard from "@/layouts/DashboardLayout/UserDashboard";
import { useStoreContext } from "@/lib/contexts/StoreContextProvider";
import { currentUser } from "@/api/auth";

const Profile = () => {
    const [showModal, setShowModal] = useState(false);
    const [loadingForUpdateProfile, setLoadingForUpdateProfile] =
        useState(false);
    const [loadingForUpdateProfileImg, setLoadingForUpdateProfileImg] =
        useState(false);
    const [values, setValues] = useState({
        username: "",
        fullName: "",
        image: {
            public_id: "",
            url: "",
        },
        email: "",
        about: "",
    });
    const { state } = useStoreContext();
    const { user } = state;

    useEffect(() => {
        currentUser(user!.token)
            .then((res) => {
                const data = res.data;
                setValues({
                    ...values,
                    username: data.username,
                    fullName: data.fullName,
                    image: {
                        url: data.image?.url,
                        public_id: data.image?.public_id,
                    },
                    email: data.email,
                    about: data?.about,
                });
            })
            .catch((error) => {
                console.log(error.message);
            });
    }, []);

    return (
        <UserDashboard>
            <h2>My Profile</h2>
            <div className="grid grid-cols-8">
                <div className="col-span-2">
                    <FileUpload
                        user={user}
                        values={values}
                        setValues={setValues}
                        setLoading={setLoadingForUpdateProfileImg}
                        loading={loadingForUpdateProfileImg}
                    />
                </div>
                <div className="col-span-6 m-auto p-4">
                   
                    <div className="relative">
                            <span
                                className={classes.editIcon}
                                onClick={handleShowModal}
                            >
                                <BiEdit />
                            </span>
                        </div>
              
                    <div>
                        <ul>
                            <li>
                                <p className="text-white mb-0">Full name:</p>
                                <span className="text-white mt-2 inline-block">
                                    {values?.fullName}
                                </span>
                            </li>
                            <li className="mt-2">
                                <p className="text-white mb-0">
                                    Email address:
                                </p>
                                <span className="text-white mt-2 inline-block">
                                    {values?.email}
                                </span>
                            </li>
                            <li className="mt-2">
                                <p className="text-white mb-0">About</p>
                                <span className="text-white mt-2 inline-block">
                                    {values?.about}
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </UserDashboard>
    );
};

export default Profile;
