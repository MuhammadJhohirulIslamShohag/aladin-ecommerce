import { baseApi } from "../../api/baseApi";

const subCategoryApiService = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getSubCategories: build.query({
            query: ({ queryParams = null }) => ({
                url: `sub-categories${queryParams ? `?${queryParams}` : ""}`,
            }),
        }),
        getSubCategory: build.query({
            query: (id) => ({
                url: `sub-categories/${id}`,
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useGetSubCategoriesQuery, useGetSubCategoryQuery } =
    subCategoryApiService;
