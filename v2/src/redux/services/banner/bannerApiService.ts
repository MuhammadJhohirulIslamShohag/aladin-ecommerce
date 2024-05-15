import { baseApi } from "../../api/baseApi";

const bannerApiService = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAllBanners: build.query({
            query: () => ({
                url: "banners",
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useGetAllBannersQuery } = bannerApiService;
