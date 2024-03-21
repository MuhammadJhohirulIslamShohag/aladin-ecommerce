import axios from "axios";
import { ICurrentUser } from "types/user.type";

export const createOrUpdateUser = async (
    token: string,
    userData: ICurrentUser
) => {
    return await axios.post(
        `${process.env.NEXT_PUBLIC_server_api}/auth/create-or-update-user`,
        { ...userData },
        {
            headers: {
                token,
            },
        }
    );
};

export const currentUser = async (token: string) => {
    return await axios.post(
        `${process.env.NEXT_PUBLIC_server_api}/auth/current-user`,
        {},
        {
            headers: {
                token,
            },
        }
    );
};
export const adminUser = async (token: string) => {
    return await axios.post(
        `${process.env.NEXT_PUBLIC_server_api}/auth/admin-user`,
        {},
        {
            headers: {
                token,
            },
        }
    );
};
