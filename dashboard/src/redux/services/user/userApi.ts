import { IUser } from "../../../types/user.type";
import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createUser: build.mutation({
            query: (payload: IUser) => ({
                url: "auth/signup",
                method: "POST",
                body: payload,
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            }),
        }),
        loginUser: build.mutation({
            query: (payload: Pick<IUser, "email" | "password">) => ({
                url: "auth/login",
                method: "POST",
                body: payload,
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useCreateUserMutation, useLoginUserMutation } = userApi;
