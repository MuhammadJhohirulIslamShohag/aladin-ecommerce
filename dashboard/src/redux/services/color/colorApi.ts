import { baseApi } from "../../api/baseApi";
import { IColor } from "../../../types/color.types";

const colorApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getColors: build.query({
            query: (queryParams: string) => ({
                url: `colors?${queryParams}`,
                method: "GET",
            }),
        }),
        createColor: build.mutation({
            query: (payload: IColor) => ({
                url: "colors",
                method: "POST",
                body: payload,
            }),
        }),
        updateColor: build.mutation({
            query: (payload: IColor) => ({
                url: "colors",
                method: "PATCH",
                body: payload,
            }),
        }),
        removedColor: build.mutation({
            query: (payload: string) => ({
                url: `colors/${payload}`,
                method: "DELETE",
            }),
        }),
    }),
    overrideExisting: false,
});

export const {
    useCreateColorMutation,
    useGetColorsQuery,
    useRemovedColorMutation,
    useUpdateColorMutation,
} = colorApi;
