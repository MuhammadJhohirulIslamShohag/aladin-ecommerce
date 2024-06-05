import { config } from "@/config/envConfig";
import { getUserInfo } from "@/store/user/users";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://54.204.167.67/api/v1", 
        prepareHeaders: (headers) => {
            const user = getUserInfo();
            if (user && user?.token?.accessToken) {
                headers.set("authorization", `Bearer ${user?.token?.accessToken}`);
            }
            return headers;
        },
    }),
    endpoints: () => ({}),
    tagTypes: ["Users", "Questions", "Reviews", "Products"],
});
