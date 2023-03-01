import React from "react";
import Resizer from "react-image-file-resizer";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { useStoreContext } from "@/lib/contexts/StoreContextProvider";
import { deletingImageFile, uploadingImageFile } from "@/api/cloudinary";

const FileUpload = ({
    user,
    values,
    setValues,
    setLoading,
    loading,
}: any) => {
    const { userProfileUpdate, setLoading: setLoadingForFirebase } =
        useStoreContext();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        setLoading(true);
        let fileInput = false;
        if (files?.item(0)!) {
            fileInput = true;
        }
        if (fileInput) {
            Resizer.imageFileResizer(
                files?.item(0)!,
                300,
                300,
                "JPEG",
                100,
                0,
                (uri) => {
                    uploadingImageFile(user.token, uri)
                        .then((res) => {
                                setValues({
                                    ...values,
                                    image: {
                                        url: res.data?.url,
                                        public_id: res.data?.public_id,
                                    },
                                });
                                const newProfileObject = {
                                    ...values,
                                    image: {
                                        url: res.data?.url,
                                        public_id: res.data?.public_id,
                                    },
                                };

                                // profileUpdate({
                                //     variables: {
                                //         input: newProfileObject,
                                //     },
                                // });
                                updateTheProfileToFirebase(
                                    values.fullName,
                                    res?.data?.url
                                );
                            setLoading(false);
                        })
                        .catch((error) => {
                            setLoading(false);
                            console.log(error);
                        });
                },
                "base64"
            );
        }
    };
    const handleImageRemove = (public_id: string) => {
        if (user) {
            deletingImageFile(user.token, public_id)
                .then((res) => {
                    setValues({
                        ...values,
                        img: {
                            url: "",
                            public_id: "",
                        },
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

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
                setLoadingForFirebase(false);
            })
            .catch((error) => {
                toast.error(error);
            })
            .finally(() => {
                setLoadingForFirebase(false);
            });
    };
    return (
        <>
            <div className="mb-3 relative">
                {values.image (
                    <div className="overflow-hidden h-48 relative mb-2">
                        <Image
                            className="h-full w-full rounded-sm"
                            src={values?.image.url}
                            alt={values?.username}
                        />
                    </div>
                )}
            </div>
            <div className="mb-3">
                <label className="text-white py-2 px-9 bg-gradient-to-br from-green-400 to-voilet-500 px-3.6 text-xs rounded-1.8 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none hover:from-green-600 transition-all">
                    <input
                        hidden
                        accept="image/*"
                        type="file"
                        name="image"
                        onChange={handleFileChange}
                    />

                    {loading
                        ? "Uploading "
                        :"Profile Upload"
                    }
                </label>
            </div>
        </>
    );
};

export default FileUpload;
