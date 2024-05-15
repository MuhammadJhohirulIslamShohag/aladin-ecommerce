import { baseApi } from "../../api/baseApi";

const productApiService = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getProducts: build.query({
            query: ({ queryParams = null }) => ({
                url: `products${queryParams ? `?${queryParams}` : ""}`,
            }),
        }),
        getProduct: build.query({
            query: (slug) => ({
                url: `products/${slug}`,
            }),
            providesTags: ["Products"],
        }),
        getProductsBySubCategoryId: build.query({
            query: (id) => ({
                url: `products/sub-categories/${id}`,
            }),
        }),
        getProductsByCategoryId: build.query({
            query: (id) => ({
                url: `products/categories/${id}`,
            }),
        }),
        addReviewToProduct: build.mutation({
            query: ({ reviewData, productId }) => ({
                url: `products/${productId}/create-review`,
                method: "POST",
                body: reviewData,
            }),
            invalidatesTags: ["Reviews"],
        }),
        addQuestionToProduct: build.mutation({
            query: ({ questionData, productId }) => ({
                url: `products/${productId}/create-question`,
                method: "POST",
                body: questionData,
            }),
            invalidatesTags: ["Questions"],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetProductsQuery,
    useGetProductQuery,
    useGetProductsByCategoryIdQuery,
    useGetProductsBySubCategoryIdQuery,
    useAddReviewToProductMutation,
} = productApiService;
