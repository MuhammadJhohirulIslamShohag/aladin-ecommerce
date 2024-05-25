import { baseApi } from "../../api/baseApi";

const reviewApiService = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getReviewByProductId: builder.query({
            query: (id) => ({
                url: `reviews?product.productId=${id}`,
            }),
            providesTags: ["Reviews"],
        }),
        addReview: builder.mutation({
            query: (payload) => ({
                url: `/reviews`,
                method: "POST",
                body: payload,
            }),
            invalidatesTags: ["Reviews"],
        }),
        updateReview: builder.mutation({
            query: ({ payload, id }) => ({
                url: `reviews/${id}`,
                method: "PATCH",
                body: payload,
            }),
            invalidatesTags: ["Reviews"],
        }),
    }),
});

export const {
    useGetReviewByProductIdQuery,
    useAddReviewMutation,
    useUpdateReviewMutation,
} = reviewApiService;
