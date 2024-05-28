"use client";

import React, { useState, useRef, ChangeEvent } from "react";
import { ImSpinner10 } from "react-icons/im";
import { getUserInfo, storeUserInfo } from "@/store/user/users";
import toast from "react-hot-toast";

import { useUploadProfileImageMutation } from "@/redux/services/user/userApiService";

const ProfilePictureUpload: React.FC = () => {
    const [hovered, setHovered] = useState(false);
    const user = getUserInfo();

    const [image, setImage] = useState<string | ArrayBuffer | null>(
        user?.user?.profileImage as string
    );
    const [profileUploadLoading, setProfileUploadLoading] = useState(false);

    const componentRef = useRef<HTMLDivElement>(null);

    const [uploadProfileImage] = useUploadProfileImageMutation();

    const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        setProfileUploadLoading(true);

        if (file) {
            const formData = new FormData();
            formData.append("profileImage", file);
            console.log(file, "file");

            const result = await uploadProfileImage(formData);
            // check if the request was successful
            if ("data" in result && result.data && result.data?.success) {
                const userData = result?.data?.data;
                const updatedUser = {
                    ...user?.user,
                    profileImage: userData?.profileImage,
                };
                storeUserInfo(
                    JSON.stringify({
                        user: updatedUser,
                        token: user?.token,
                    })
                );
                const reader = new FileReader();
                reader.onload = () => {
                    setImage(reader.result);
                };
                reader.readAsDataURL(file);
                setProfileUploadLoading(false);
                setHovered(false);
                toast.success("Profile Update Successfully");
            } else {
                toast.error("Profile Image Update Failed!");
                setProfileUploadLoading(false);
                setHovered(false);
            }
        }
    };

    return (
        <div
            className="relative overflow-hidden rounded-full cursor-pointer"
            ref={componentRef}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {profileUploadLoading ? (
                <div className="w-28 h-28 object-cover rounded-full border-2 border-primary p-1 cursor-wait flex items-center justify-center">
                    <span>
                        <ImSpinner10 className="text-primary text-7xl animate-spin" />
                    </span>
                </div>
            ) : (
                <div className="w-28 h-28 object-cover rounded-full border-2 border-primary p-1">
                    <picture>
                        <img
                            src={image as string}
                            alt="Profile"
                            className="w-full h-full object-cover rounded-full"
                        />
                    </picture>

                    {hovered && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white w-full h-full">
                            <input
                                type="file"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                onChange={handleImageChange}
                            />
                            <span className="text-sm">Upload Profile</span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ProfilePictureUpload;
