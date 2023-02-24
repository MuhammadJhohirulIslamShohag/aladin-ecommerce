import Resizer from "react-image-file-resizer";
import React, { Fragment } from "react";
import { useStoreContext } from "@/lib/contexts/StoreContextProvider";
import { deletingImageFile, uploadingImageFile } from "@/api/cloudinary";

const ImageFileUploadForm = ({ values, setValues, setLoading }) => {
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
    const handleImageRemove = (public_id:string) => {
        if (user) {
            setLoading(true);
            deletingImageFile(user.token, public_id)
                .then((res) => {
                    const { images } = values;
                    let filteredImages = images.filter((item) => {
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
            {values.images &&
                values.images.map((image) => (
                    <span className="avatar-item mr-2" key={image.public_id}>
                        <Badge
                            count="X"
                            onClick={() => handleImageRemove(image.public_id)}
                            style={{ cursor: "pointer" }}
                            key={image.public_id}
                        >
                            <Avatar src={image.url} shape="square" size={100} />
                        </Badge>
                    </span>
                ))}
            <div className="row">
                <label
                    className="btn btn-outline-primary"
                    style={{ width: "20%", marginTop: "5px" }}
                >
                    Choose File
                    <input
                        type="file"
                        multiple
                        hidden
                        accept="images/*"
                        onChange={handleFileChange}
                    />
                </label>
            </div>
        </Fragment>
    );
};

export default ImageFileUploadForm;
