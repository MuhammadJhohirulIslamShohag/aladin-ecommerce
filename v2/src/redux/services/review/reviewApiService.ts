import { baseApi } from "../../api/baseApi";

const reviewApiService = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getReviewByProductId: builder.query({
            query: (id) => ({
                url: `reviews?product.productId=${id}`,
            }),
            providesTags: ["Reviews"],
        }),
    }),
});

export const { useGetReviewByProductIdQuery } = reviewApiService;
