import { baseApi } from "../../api/baseApi";
import { IBrand } from "../../../types/brand.types";

const brandApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
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
        getBrands: build.query({
            query: () => ({
                url: "brands",
                method: "GET",
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
