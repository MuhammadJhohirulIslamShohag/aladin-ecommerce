import axios from "axios";

export const uploadingImageFile = (
    token: string,
    uploadImageFile: string | Blob | File | ProgressEvent<FileReader>
) => {
    return axios.post(
        `${process.env.NEXT_PUBLIC_server_api}/cloudinary/upload-images`,
        { uploadImageFile },
        {
            headers: {
                token,
            },
        }
    );
};
export const deletingImageFile = (token: string, public_id: string) => {
    return axios.post(
        `${process.env.NEXT_PUBLIC_server_api}/cloudinary/remove-images`,
        { public_id },
        {
            headers: {
                token,
            },
        }
    );
};
