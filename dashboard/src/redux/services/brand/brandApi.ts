import { baseApi } from "../../api/baseApi";
import { IBrand } from "../../../types/brand.types";

const brandApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getBrands: build.query({
            query: (queryParams: string) => ({
                url: `brands?${queryParams}`,
                method: "GET",
            }),
        }),
        createBrand: build.mutation({
            query: (payload: IBrand) => ({
                url: "brands",
                method: "POST",
                body: payload,
            }),
        }),
        updateBrand: build.mutation({
            query: (payload: IBrand) => ({
                url: "brands",
                method: "PATCH",
                body: payload,
            }),
        }),
        removedBrand: build.mutation({
            query: (payload: string) => ({
                url: `brands/${payload}`,
                method: "DELETE",
            }),
        }),
    }),
    overrideExisting: false,
});

export const {
    useCreateBrandMutation,
    useGetBrandsQuery,
    useRemovedBrandMutation,
    useUpdateBrandMutation,
} = brandApi;
