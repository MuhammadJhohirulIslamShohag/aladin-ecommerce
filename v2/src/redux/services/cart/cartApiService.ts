import { baseApi } from "../../api/baseApi";

const cartApiService = baseApi.injectEndpoints({
    endpoints: (build) => ({
        addCart: build.mutation({
            query: (payload) => ({
                url: "carts",
                method: "POST",
                body: payload,
            }),
        }),
        getCarts: build.query({
            query: () => ({
                url: "carts",
            }),
        }),
        userCarts: build.query({
            query: (payload) => ({
                url: `carts/${payload}`,
            }),
        }),
        deleteCart: build.mutation({
            query: (payload) => ({
                url: `carts/${payload}`,
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            }),
        }),
    }),
    overrideExisting: false,
});

export const {
    useAddCartMutation,
    useGetCartsQuery,
    useDeleteCartMutation,
    useUserCartsQuery,
} = cartApiService;
