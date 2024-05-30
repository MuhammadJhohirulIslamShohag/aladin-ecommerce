import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { config } from "../../config/envConfig";

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: config.baseURL || 'http://localhost:9000/api/v1' }),
    endpoints: () => ({}),
    tagTypes: [
        "Users",
        "Category",
        "Brand",
        "Size",
        "Color",
        "SubCategory",
        "Product",
        "Coupon"
    ],
});
