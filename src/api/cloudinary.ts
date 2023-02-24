import axios from "axios";

export const uploadingImageFile = (token: string, uploadImageFile: any) => {
    return axios.post(
        `${process.env.REACT_APP_API_URL}/upload-images`,
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
        `${process.env.REACT_APP_API_URL}/remove-images`,
        { public_id },
        {
            headers: {
                token,
            },
        }
    );
};
