import axios from "axios";

export const uploadingImageFile = (token: string, uploadImageFile: any) => {
    return axios.post(
        `${process.env.NEXT_PUBLIC_server_api}/upload-images`,
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
        `${process.env.NEXT_PUBLIC_server_api}/remove-images`,
        { public_id },
        {
            headers: {
                token,
            },
        }
    );
};
