import { baseApi } from "../../api/baseApi";

const wishListApiService = baseApi.injectEndpoints({
    endpoints: (build) => ({
        addWishlist: build.mutation({
            query: (id) => ({
                url: "users/wishlist",
                method: "POST",
                body: { productId: id },
            }),
        }),
        removeWishList: build.mutation({
            query: (id) => ({
                url: `users/wishlist/${id}`,
                method: "DELETE",
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useAddWishlistMutation, useRemoveWishListMutation } =
    wishListApiService;
