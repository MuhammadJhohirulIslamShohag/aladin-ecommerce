import axios from "axios";
import { ICurrentUser } from "types/user.type";

export const createOrUpdateUser = async (authToken:string, userData:ICurrentUser) => {
    return await axios.post(
        `${process.env.REACT_APP_API_URL}/create-or-update-user`,
        {...userData},
        {
            headers: {
                authToken,
            },
        }
    );
};

export const currentUser = async (authToken:string) => {
    return await axios.post(
        `${process.env.REACT_APP_API_URL}/current-user`,
        {},
        {
            headers: {
                authToken,
            },
        }
    );
};
export const adminUser = async (authToken:string) => {
    return await axios.post(
        `${process.env.REACT_APP_API_URL}/admin-user`,
        {},
        {
            headers: {
                authToken,
            },
        }
    );
};