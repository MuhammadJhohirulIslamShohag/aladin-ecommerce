/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BiEdit } from "react-icons/bi";
import FileUpload from "@/components/FileUpload/FileUpload";
import UserDashboard from "@/layouts/DashboardLayout/UserDashboard";
import { useStoreContext } from "@/lib/contexts/StoreContextProvider";
import { createOrUpdateUser, currentUser } from "@/api/auth";
import toast from "react-hot-toast";
import FormGroup from "@/components/Form/FormGroup";
import ProfileEditModal from "@/components/Modal/ProfileEditModal/ProfileEditModal";
import { StoreActionType } from "@/lib/states/storeReducer/storeReducer.type";

type FormValues = {
    newPassword: string;
};

const Profile = () => {
    const [newPassword, setNewPassword] = useState<string>("");
    const [loading, setLoading] = useState(false);
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
    const { state, dispatch, updateThePassword, userProfileUpdate } =
        useStoreContext();
    const { user } = state;
    const {
        handleSubmit,
        register,
        reset,
        formState: { errors, isDirty, isLoading },
    } = useForm<FormValues>({
        mode: "onChange",
    });

    useEffect(() => {
        loadingCurrentUser();
    }, []);

    const loadingCurrentUser = () => {
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
    };

    // show model for update profile
    const handleShowModal = () => {
        setShowModal((prev) => !prev);
    };

    // update password
    const handlePasswordSubmit: SubmitHandler<FormValues> = (data) => {
        const { newPassword } = data;
        setLoading(true);
        updateThePassword(newPassword!)!
            .then(() => {
                toast.success("Password Is Updated!");
                reset();
            })
            .catch((error) => {
                toast.error(
                    `Something wrong! for password updating like ${error.message}`
                );
                setLoading(false);
            });
    };

    const updatePasswordForm = () => (
        <form onSubmit={handleSubmit(handlePasswordSubmit)}>
            <FormGroup
                register={register}
                inputName={"newPassword"}
                labelName={"New Password"}
                isRequirePattern={true}
                requirePattern={{
                    required: "Password is required",
                    minLength: {
                        value: 6,
                        message: "Password should be 6 characters or longer",
                    },
                }}
                errorField={errors.newPassword}
                inputType={"password"}
                placeholder={"Please Enter Your New Password"}
                required="Password is required"
            />
            <br />
            <button
                type="submit"
                className="btn btn-outline-primary"
                disabled={isLoading || isDirty}
            >
                {isLoading ? "Loading..." : "Submit"}
            </button>
        </form>
    );

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
                            className="bg-green-500"
                            id="my-profile-update-modal"
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
            <div className="">
                <h2>Update Password</h2>
                <div>
                    {isLoading ? <h2>Loading</h2> : <h4>Update Password</h4>}
                    {updatePasswordForm()}
                </div>
            </div>
            <ProfileEditModal
                closeModal={handleShowModal}
                values={values}
                loadingCurrentUser={loadingCurrentUser}
                title="Profile Information Update"
            />
        </UserDashboard>
    );
};

export default Profile;
