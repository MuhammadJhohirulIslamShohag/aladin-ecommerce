import { baseApi } from "../../api/baseApi";
import { ICategory } from "../../../types/category.type";

const categoryApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createCategory: build.mutation({
            query: (payload: ICategory) => ({
                url: "categories",
                method: "POST",
                body: payload,
            }),
        }),
        updateCategory: build.mutation({
            query: (payload: ICategory) => ({
                url: "categories",
                method: "PATCH",
                body: payload,
            }),
        }),
        removedCategory: build.mutation({
            query: (payload: string) => ({
                url: `categories/${payload}`,
                method: "DELETE",
            }),
        }),
        getCategories: build.query({
            query: () => ({
                url: "categories",
                method: "GET",
            }),
        }),
    }),
    overrideExisting: false,
});

export const {
    useCreateCategoryMutation,
    useGetCategoriesQuery,
    useRemovedCategoryMutation,
    useUpdateCategoryMutation,
} = categoryApi;
