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
        updateUserAddress: build.mutation({
            query: ({ data, token }) => ({
                url: `users/update-shipping-address`,
                method: "PATCH",
                body: data,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
            invalidatesTags: ["Users"],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetSingleUserQuery,
    useDeleteUserAddressMutation,
    useUpdateUserAddressMutation,
} = userApiService;
