import { baseApi } from "../../api/baseApi";

const paymentApiService = baseApi.injectEndpoints({
    endpoints: (build) => ({
        stripePayment: build.mutation({
            query: (payload) => ({
                url: "stripes/create-payment-intent",
                method: "POST",
                body: payload,
                headers: { "Content-Type": "application/json" },
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useStripePaymentMutation } = paymentApiService;
