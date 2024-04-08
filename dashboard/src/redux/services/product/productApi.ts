import { IProduct } from "../../../types/product.type";
import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createProduct: build.mutation({
            query: (payload: IProduct) => ({
                url: "products",
                method: "POST",
                body: payload,
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            }),
        }),
        removedProduct: build.mutation({
            query: (payload: string) => ({
                url: `products/${payload}`,
                method: "DELETE",
            }),
        }),
        getProducts: build.query({
            query: () => ({
                url: "products",
                method: "GET",
            }),
        }),
    }),
    overrideExisting: false,
});

export const {
    useCreateProductMutation,
    useGetProductsQuery,
    useRemovedProductMutation,
} = productApi;
