import { baseApi } from "../../api/baseApi";

const categoryApiService = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getCategories: build.query({
            query: ({ queryParams = null }) => ({
                url: `categories${queryParams ? `?${queryParams}` : ""}`,
            }),
        }),
        getCategory: build.query({
            query: (id) => ({
                url: `categories/${id}`,
            }),
        }),
        getCategoriesMenu: build.query({
            query: () => ({
                url: `categories/get-categories-menu`,
            }),
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetCategoriesQuery,
    useGetCategoryQuery,
    useGetCategoriesMenuQuery,
} = categoryApiService;
