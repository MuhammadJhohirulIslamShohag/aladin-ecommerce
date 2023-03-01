import Resizer from "react-image-file-resizer";
import React, { Fragment } from "react";
import { AiOutlineClose } from "react-icons/ai";
import ModalImage from "@avidian/react-modal-image";
import { useStoreContext } from "@/lib/contexts/StoreContextProvider";
import { deletingImageFile, uploadingImageFile } from "@/api/cloudinary";

type ImageFileUploadFormPropType = {
    values: any;
    setValues: any;
    setLoading: any;
    errorField:any;
    register: any;
};
const ImageFileUploadForm = ({
    values,
    setValues,
    setLoading,
    register,
    errorField
}: ImageFileUploadFormPropType) => {
    const { state } = useStoreContext();
    const { user } = state;

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        let allImageUploadedFiles = values.images;
        if (files) {
            setLoading(true);
            for (let i = 0; i < files.length; i++) {
                Resizer.imageFileResizer(
                    files[i],
                    300,
                    300,
                    "JPEG",
                    100,
                    0,
                    (uri) => {
                        setLoading(true);
                        uploadingImageFile(user!.token, uri)
                            .then((res) => {
                                allImageUploadedFiles.push(res.data);
                                setValues({
                                    ...values,
                                    images: allImageUploadedFiles,
                                });
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
        }
    };
    const handleImageRemove = (public_id: string) => {
        if (user) {
            setLoading(true);
            deletingImageFile(user.token, public_id)
                .then((res) => {
                    const { images } = values;
                    let filteredImages = images.filter((item: any) => {
                        return item.public_id !== public_id;
                    });
                    setValues({ ...values, images: filteredImages });
                    setLoading(false);
                })
                .catch((error) => {
                    setLoading(false);
                    console.log(error);
                });
        }
    };
    return (
        <Fragment>
            <div className="my-5">
                <div className="my-5">
                    {values.images &&
                        values.images.map((image: any) => (
                            <span key={image.public_id}>
                                <button
                                    type="button"
                                    key={image.public_id}
                                    className="relative inline-flex items-center rounded-lg mb-2 transition-all mr-2"
                                >
                                    <ModalImage
                                        small={image.url}
                                        large={image.url}
                                        alt={"Product Image"}
                                        hideDownload={false}
                                        className="h-32 w-36"
                                    />

                                    <div
                                        onClick={() =>
                                            handleImageRemove(image.public_id)
                                        }
                                        className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 "
                                    >
                                        <AiOutlineClose />
                                    </div>
                                </button>
                            </span>
                        ))}
                </div>
                <div>
                <input
                    type="file"
                    multiple
                    accept="images/*"
                    {...register("productImg", {
                        required: "Product Image Is Required!",
                        onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                            handleFileChange(e),
                    })}
                    files={values.images}
                    className="file-input file-input-bordered file-input-success w-full max-w-xs"
                />
                {errorField && (
                    <p className="text-red-600">{errorField?.message}</p>
                )}
                </div>
            </div>
        </Fragment>
    );
};

export default ImageFileUploadForm;
