import { baseApi } from "../../api/baseApi";

const brandApiService = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getBrands: build.query({
            query: ({ queryParams = null }) => ({
                url: `brands${queryParams ? `?${queryParams}` : ""}`,
            }),
        }),
        getBrand: build.query({
            query: (id) => ({
                url: `brands/${id}`,
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useGetBrandsQuery, useGetBrandQuery } = brandApiService;
