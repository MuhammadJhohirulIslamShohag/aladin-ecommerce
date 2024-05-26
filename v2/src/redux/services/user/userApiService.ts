import { baseApi } from "../../api/baseApi";

const userApiService = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getSingleUser: build.query({
            query: ({ id }) => ({
                url: `users/${id}`,
            }),
            providesTags: ["Users"],
        }),
        deleteUserAddress: build.mutation({
            query: ({ id, token }) => ({
                url: `users/delete-shipping-address/${id}`,
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
            invalidatesTags: ["Users"],
        }),
        updateUser: build.mutation({
            query: ({ data, id }) => ({
                url: `users/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Users"],
        }),
        uploadProfileImage: build.mutation({
            query: (payload) => ({
                url: `users/upload-profile-image`,
                method: "PATCH",
                body: payload,
            }),
            invalidatesTags: ["Users"],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetSingleUserQuery,
    useDeleteUserAddressMutation,
    useUpdateUserMutation,
    useUploadProfileImageMutation,
} = userApiService;
