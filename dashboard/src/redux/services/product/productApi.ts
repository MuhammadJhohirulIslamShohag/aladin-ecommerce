import { baseApi } from "../../api/baseApi";
import { IProduct } from "../../../types/product.type";

const productApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getProducts: build.query({
            query: (queryParams) => ({
                url: `products?${queryParams}`,
                method: "GET",
            }),
        }),
        createProduct: build.mutation({
            query: (payload: IProduct) => ({
                url: "products",
                method: "POST",
                body: payload,
            }),
        }),
        updateProduct: build.mutation({
            query: (payload: IProduct) => ({
                url: "products",
                method: "PATCH",
                body: payload,
            }),
        }),
        removedProduct: build.mutation({
            query: (payload: string) => ({
                url: `products/${payload}`,
                method: "DELETE",
            }),
        }),
    }),
    overrideExisting: false,
});

export const {
    useCreateProductMutation,
    useGetProductsQuery,
    useRemovedProductMutation,
    useUpdateProductMutation,
} = productApi;
