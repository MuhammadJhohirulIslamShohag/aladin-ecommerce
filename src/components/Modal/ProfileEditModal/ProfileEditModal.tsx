import React, { useState } from "react";
import { createOrUpdateUser } from "@/api/auth";
import FormGroup from "@/components/Form/FormGroup";
import { useStoreContext } from "@/lib/contexts/StoreContextProvider";
import { StoreActionType } from "@/lib/states/storeReducer/storeReducer.type";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type ProfileEditModalPropType = {
    title: string;
    closeModal: () => void;
    values: any;
    loadingCurrentUser: any;
};
type FormProfileValues = {
    fullName: string;
    email: string;
};

const ProfileEditModal = (props: ProfileEditModalPropType) => {
    const[loading, setLoading] = useState(false);
    const { closeModal, values, title, loadingCurrentUser } = props;
    const { state, dispatch, userProfileUpdate } = useStoreContext();
    const { user } = state;
    const {
        handleSubmit,
        register,
        reset,
        formState: { errors, isDirty, isLoading },
    } = useForm<FormProfileValues>({
        mode: "onChange",
    });

    const handleEditSubmit: SubmitHandler<FormProfileValues> = (data) => {
        const userObject = {
            fullName: data.fullName,
            email: data.email,
        };
        createOrUpdateUser(user!.token, userObject)
            .then((res) => {
                // Clear email from storage.
                window.localStorage.removeItem("emailForSignIn");
                toast.success("Registered Successfully!");
                reset();
                dispatch({
                    type: StoreActionType.LOGGED_IN_USER,
                    payload: {
                        fullName: res.data.fullName,
                        email: res.data.email,
                        token: user!.token,
                        image: res.data.image.url,
                        _id: res.data._id,
                    },
                });
            })
            .catch((error) => {
                console.log(error);
            });
        loadingCurrentUser();
        updateTheProfileToFirebase(values.fullName, values.image?.url);
    };

    // update the profile
    const updateTheProfileToFirebase = (
        fullName: string,
        photoImage: string
    ) => {
        const profile = {
            displayName: fullName,
            photoURL: photoImage,
        };
        userProfileUpdate(profile)
            .then((result) => {
                setLoading(false);
            })
            .catch((error) => {
                toast.error(error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <>
            <input
                type="checkbox"
                id="my-profile-update-modal"
                className="modal-toggle"
            />
            <div className="modal">
                <div className="modal-box relative">
                    <label
                        onClick={closeModal}
                        htmlFor="my-modal"
                        className="btn btn-sm btn-success hover:btn-primary text-white btn-circle absolute right-2 top-2"
                    >
                        ✕
                    </label>
                    <h3 className="text-lg font-bold text-success text-center">
                        {title}
                    </h3>
                    <form onSubmit={handleSubmit(handleEditSubmit)}>
                        <FormGroup
                            register={register}
                            inputName={"fullName"}
                            labelName={"FullName"}
                            errorField={errors.fullName}
                            inputType={"text"}
                            placeholder={"Enter Your FullName"}
                            required="Please Enter Your FullName"
                        />
                        <FormGroup
                            register={register}
                            inputName={"email"}
                            labelName={"Email"}
                            errorField={errors.email}
                            inputType={"text"}
                            placeholder={"Enter Your Email"}
                            required="Please Enter Your Email"
                        />
                        <button
                            type="submit"
                            className="btn block hover:bg-transparent hover:text-primary text-white btn-primary disabled:opacity-75 disabled:border-2 disabled:border-primary disabled:text-primary mt-2"
                            disabled={isLoading}
                        >
                            {isLoading ? "Loading" : "Register"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ProfileEditModal;
