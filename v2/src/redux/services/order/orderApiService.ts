import { baseApi } from "../../api/baseApi";

const orderApiService = baseApi.injectEndpoints({
    endpoints: (build) => ({
        addOrder: build.mutation({
            query: (payload) => ({
                url: "orders",
                method: "POST",
                body: payload,
                headers: { "Content-Type": "application/json" },
            }),
        }),
        cashOrderDelivery: build.mutation({
            query: (payload) => ({
                url: "orders/order-cash-on-delivery",
                method: "POST",
                body: payload,
                headers: { "Content-Type": "application/json" },
            }),
        }),
        getTotalPriceAfterDiscount: build.mutation({
            query: (payload) => ({
                url: "orders/total-discount-price",
                method: "PATCH",
                body: payload,
                headers: { "Content-Type": "application/json" },
            }),
        }),
        getOrders: build.query({
            query: ({ queryParams = null }) => ({
                url: `orders${queryParams ? `?${queryParams}` : ""}`,
            }),
        }),
        getSingleOrder: build.query({
            query: (id) => ({
                method: "GET",
                url: `orders/${id}`,
            }),
        }),
    }),
    overrideExisting: false,
});

export const {
    useAddOrderMutation,
    useGetOrdersQuery,
    useGetSingleOrderQuery,
    useCashOrderDeliveryMutation,
    useGetTotalPriceAfterDiscountMutation,
} = orderApiService;
