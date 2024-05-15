import { baseApi } from "../../api/baseApi";

const orderApiService = baseApi.injectEndpoints({
    endpoints: (build) => ({
        addOrder: build.mutation({
            query: (payload) => ({
                url: "orders/order-cash-on-delivery",
                method: "POST",
                body: payload,
                headers: { "Content-Type": "application/json" },
            }),
        }),
        getUserOrders: build.query({
            query: ({ id, token, limit }) => ({
                method: "GET",
                url: `orders?customer.customerId=${id}&limit=${limit}`,
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
    useGetUserOrdersQuery,
    useGetSingleOrderQuery,
} = orderApiService;
