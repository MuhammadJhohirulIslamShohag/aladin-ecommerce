import { baseApi } from "../../api/baseApi";

const colorApiService = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getColors: build.query({
            query: ({ queryParams = null }) => ({
                url: `colors${queryParams ? `?${queryParams}` : ""}`,
            }),
        }),
        getColor: build.query({
            query: (id) => ({
                url: `colors/${id}`,
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useGetColorsQuery, useGetColorQuery } = colorApiService;
