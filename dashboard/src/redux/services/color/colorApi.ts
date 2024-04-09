import { baseApi } from "../../api/baseApi";
import { IColor } from "../../../types/color.types";

const colorApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
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
        getColors: build.query({
            query: () => ({
                url: "colors",
                method: "GET",
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
