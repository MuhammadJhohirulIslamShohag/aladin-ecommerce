import { baseApi } from "../../api/baseApi";
import { ISize } from "../../../types/size.types";

const sizeApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createSize: build.mutation({
            query: (payload: ISize) => ({
                url: "sizes",
                method: "POST",
                body: payload,
            }),
        }),
        updateSize: build.mutation({
            query: (payload: ISize) => ({
                url: "sizes",
                method: "PATCH",
                body: payload,
            }),
        }),
        removedSize: build.mutation({
            query: (payload: string) => ({
                url: `sizes/${payload}`,
                method: "DELETE",
            }),
        }),
        getSizes: build.query({
            query: () => ({
                url: "sizes",
                method: "GET",
            }),
        }),
    }),
    overrideExisting: false,
});

export const {
    useCreateSizeMutation,
    useGetSizesQuery,
    useRemovedSizeMutation,
    useUpdateSizeMutation,
} = sizeApi;
